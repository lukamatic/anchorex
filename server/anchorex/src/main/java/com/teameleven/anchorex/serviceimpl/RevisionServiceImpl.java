package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Revision;
import com.teameleven.anchorex.enums.RevisionStatus;
import com.teameleven.anchorex.repository.RevisionRepository;
import com.teameleven.anchorex.service.RevisionService;
import com.teameleven.anchorex.service.UserService;
import com.wildbit.java.postmark.Postmark;
import com.wildbit.java.postmark.client.ApiClient;
import com.wildbit.java.postmark.client.data.model.message.MessageResponse;
import com.wildbit.java.postmark.client.data.model.templates.TemplatedMessage;
import com.wildbit.java.postmark.client.exception.PostmarkException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;

@Service
public class RevisionServiceImpl implements RevisionService {
    private final RevisionRepository revisionRepository;
    private final UserService userService;

    public RevisionServiceImpl(RevisionRepository revisionRepository, UserService userService) {
        this.revisionRepository = revisionRepository;
        this.userService = userService;
    }

    @Override
    public Collection<Revision> findAll() {
        return this.revisionRepository.findAll();
    }

    @Override
    @Transactional
    public void approve(Long id) {
        try {
            var revision = this.revisionRepository.findById(id).orElse(null);

            if (revision == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such revision");
            }

            revision.setStatus(RevisionStatus.APPROVED);
            this.revisionRepository.save(revision);

            var owner = this.userService.findOneById(revision.getReservationEntity().getOwnerId());

            ApiClient client = Postmark.getApiClient("2c3c225b-f823-4924-b983-4b1a82ad17ea");
            TemplatedMessage message = new TemplatedMessage("obradovic.petar@uns.ac.rs", owner.getEmail());
            message.setTemplateId(28172733);
            // set model as HashMap
            HashMap model = new HashMap<String, Object>();
            model.put("revisionId", revision.getId());
            model.put("reservationEntity", revision.getReservationEntity().getName());
            model.put("comment", revision.getComment());
            model.put("rating", revision.getRating());

            message.setTemplateModel(model);

            try {
                MessageResponse response = client.deliverMessage(message);
            } catch (PostmarkException e) {
                throw new RuntimeException(e);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } catch (OptimisticLockingFailureException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Access locked.");
        }
    }

    @Override
    @Transactional
    public void reject(Long id) {
        try {
            var revision = this.revisionRepository.findById(id).orElse(null);

            if (revision == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such revision");
            }

            revision.setStatus(RevisionStatus.REJECTED);
            this.revisionRepository.save(revision);
        } catch (OptimisticLockingFailureException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Access locked.");
        }
    }
}
