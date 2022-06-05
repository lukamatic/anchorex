package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.Revision;
import com.teameleven.anchorex.dto.RevisionDTO;

public class RevisionMapper {

    public static Revision RevisionDtoToRevision(RevisionDTO revisionDTO){
        Revision revision = new Revision();

        revision.setId(revisionDTO.getId());
        revision.setComment(revisionDTO.getComment());
        revision.setRating(revisionDTO.getRating());
        revision.setUserId(revisionDTO.getUserId());
        return  revision;
    }
}
