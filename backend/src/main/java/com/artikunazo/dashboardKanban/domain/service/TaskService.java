package com.artikunazo.dashboardKanban.domain.service;

import com.artikunazo.dashboardKanban.domain.TaskDomain;
import com.artikunazo.dashboardKanban.domain.repository.TaskDomainRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class TaskService {
  @Autowired
  private TaskDomainRepository taskDomainRepository;

  public List<TaskDomain> getTasksByBoardId(int boardId) {
    return taskDomainRepository.getTasksByBoardId(boardId);
  }

  public Optional<TaskDomain> getTaskById(int idTask) {
    return taskDomainRepository.getTaskById(idTask);
  }

  public TaskDomain saveTask(TaskDomain taskDomain) {
    return taskDomainRepository.saveTask(taskDomain);
  }

  public boolean deleteTask(int idTask) {
    return getTaskById(idTask).map(taskDomain -> {
      taskDomainRepository.deleteTask(idTask);
      return true;
    }).orElse(false);
  }
}
