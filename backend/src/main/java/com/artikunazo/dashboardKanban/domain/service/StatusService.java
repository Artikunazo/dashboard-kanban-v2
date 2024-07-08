package com.artikunazo.dashboardKanban.domain.service;

import com.artikunazo.dashboardKanban.domain.StatusDomain;
import com.artikunazo.dashboardKanban.domain.repository.StatusDomainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusService {
  @Autowired
  private StatusDomainRepository statusDomainRepository;

  public List<StatusDomain> getAll() {
    return statusDomainRepository.getAll();
  }

  public String getStatusNameOfTask(int idTask) {
    return statusDomainRepository.getStatusNameByTask(idTask);
  }
}
