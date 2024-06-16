package com.artikunazo.dashboardKanban.domain.service;

import com.artikunazo.dashboardKanban.domain.StatusDomain;
import com.artikunazo.dashboardKanban.domain.repository.StatusDomainRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class StatusService {
  @Autowired
  private StatusDomainRepository statusDomainRepository;

  public List<StatusDomain> getAll() {
    return statusDomainRepository.getAll();
  }
}
