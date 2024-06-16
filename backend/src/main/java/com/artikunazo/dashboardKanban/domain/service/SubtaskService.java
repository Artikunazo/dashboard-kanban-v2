package com.artikunazo.dashboardKanban.domain.service;

import com.artikunazo.dashboardKanban.domain.SubtaskDomain;
import com.artikunazo.dashboardKanban.domain.repository.SubtaskDomainRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class SubtaskService {
  @Autowired
  private SubtaskDomainRepository subtaskDomainRepository;

  public List<SubtaskDomain> getAllByTaskId(int taskId) {
    return subtaskDomainRepository.getAllByTaskId(taskId);
  }

  public SubtaskDomain saveSubtask(SubtaskDomain subtaskDomain) {
    return subtaskDomainRepository.saveSubtask(subtaskDomain);
  }

  public void deleteSubtask(int subtaskId) {
    subtaskDomainRepository.deleteSubtask(subtaskId);
  }
}
