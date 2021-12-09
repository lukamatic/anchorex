package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Role;
import com.teameleven.anchorex.repository.RoleRepository;
import com.teameleven.anchorex.service.RoleService;

import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role findOneByName(String name) {
        return roleRepository.findByName(name);
    }

}
