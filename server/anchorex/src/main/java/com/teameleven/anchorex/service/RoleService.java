package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Role;

public interface RoleService {

    Role findOneByName(String name);
}
