package com.artikunazo.dashboardKanban.domain.service;

import com.artikunazo.dashboardKanban.domain.SubtaskDomain;
import com.artikunazo.dashboardKanban.domain.repository.SubtaskDomainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
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

  public Integer getIsDoneSubTaskByTask(int idTask){
    return subtaskDomainRepository.getIsDoneSubTaskByTask(idTask);
  }

  public boolean updateSubtask(SubtaskDomain subtaskDomain) {
    System.out.println(subtaskDomain.getSubtaskId() + " " + subtaskDomain.getDone());
    return getSubtaskById(subtaskDomain.getSubtaskId()).map(subtaskDomain1 -> {
      subtaskDomainRepository.updateSubtask(subtaskDomain);
      return true;
    }).orElse(false);

  }
}
