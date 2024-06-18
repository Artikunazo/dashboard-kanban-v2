package com.artikunazo.dashboardKanban.domain.service;

import com.artikunazo.dashboardKanban.domain.SubtaskDomain;
import com.artikunazo.dashboardKanban.domain.repository.SubtaskDomainRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class SubtaskService {
  @Autowired
  private SubtaskDomainRepository subtaskDomainRepository;

  public List<SubtaskDomain> getAllByTaskId(int taskId) {
    return subtaskDomainRepository.getAllByTaskId(taskId);
  }

  public Integer getCountSubtasksByIdTask(int idTask) {
    return subtaskDomainRepository.getCountSubtasksByIdTask(idTask);
  }

  public Optional<SubtaskDomain> getSubtaskById(int idSubtask) {
    return subtaskDomainRepository.getSubtaskById(idSubtask);
  }

  public SubtaskDomain saveSubtask(SubtaskDomain subtaskDomain) {
    return subtaskDomainRepository.saveSubtask(subtaskDomain);
  }

  public boolean deleteSubtask(int idSubtask) {
    return getSubtaskById(idSubtask).map(subtaskDomain -> {
      subtaskDomainRepository.deleteSubtask(idSubtask);
      return true;
    }).orElse(false);
  }
}
