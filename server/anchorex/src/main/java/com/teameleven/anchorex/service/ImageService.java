package com.teameleven.anchorex.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;

public interface ImageService {
    String uploadImage(MultipartFile file);

    Collection<String> uploadImages(MultipartFile[] file);
}
