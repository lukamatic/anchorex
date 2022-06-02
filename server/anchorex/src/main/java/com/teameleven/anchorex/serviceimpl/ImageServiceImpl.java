package com.teameleven.anchorex.serviceimpl;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.teameleven.anchorex.service.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Service
public class ImageServiceImpl implements ImageService {
    private final AmazonS3 amazonS3;
    private final String BUCKET_NAME = "anchorex";
    private final List<String> acceptableImageTypes = new ArrayList<>();

    public ImageServiceImpl(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
        populateAcceptableImageTypes();
    }

    @Override
    public String uploadImage(MultipartFile file) {
        validateImageType(file);
        return uploadFile(file);
    }

    @Override
    public Collection<String> uploadImages(MultipartFile[] files) {
        validateImageTypes(files);
        return uploadFiles(files);
    }

    private String uploadFile(MultipartFile file) {
        var filename = generateFilename(file.getOriginalFilename());
        var objectMetadata = generateObjectMetadata(file);

        try {
            amazonS3.putObject(BUCKET_NAME, filename, file.getInputStream(), objectMetadata);
        } catch (IOException e) { // file.getInputStream()
            throw new IllegalStateException("Failed to upload the file", e);
        } catch (AmazonServiceException e) { // amazonS3.putObject(...)
            throw new IllegalStateException("Failed to upload the file", e);
        }

        return amazonS3.getUrl(BUCKET_NAME, filename).toString();
    }

    private ArrayList<String> uploadFiles(MultipartFile[] files) {
        var urls = new ArrayList<String>();
        for (var file : files) {
            urls.add(uploadFile(file));
        }
        return urls;
    }

    private void validateImageType(MultipartFile file) {
        if (!acceptableImageTypes.contains(file.getContentType())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    String.format("File %s has invalid image type. Allowed types are %s.", file.getOriginalFilename(), acceptableImageTypes));
        }
    }

    private void validateImageTypes(MultipartFile[] files) {
        for (var file : files) {
            validateImageType(file);
        }
    }

    private void populateAcceptableImageTypes() {
        acceptableImageTypes.add("image/jpeg");
        acceptableImageTypes.add("image/png");
        acceptableImageTypes.add("image/tiff");
        acceptableImageTypes.add("image/gif");
    }

    private String generateFilename(String originalFilename) {
        String parts[] = originalFilename.split("\\.");
        String extension = parts[parts.length - 1];
        return String.format("%s.%s", UUID.randomUUID(), extension);
    }

    private ObjectMetadata generateObjectMetadata(MultipartFile file) {
        var objectMetadata = new ObjectMetadata();
        objectMetadata.addUserMetadata("Content-Type", file.getContentType());
        objectMetadata.addUserMetadata("Content-Length", String.valueOf(file.getSize()));
        return objectMetadata;
    }
}
