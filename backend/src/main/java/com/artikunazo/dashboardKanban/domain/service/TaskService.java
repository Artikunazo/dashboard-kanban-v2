package com.artikunazo.dashboardKanban.domain.service;

import com.artikunazo.dashboardKanban.domain.TaskDomain;
import com.artikunazo.dashboardKanban.domain.repository.TaskDomainRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class TaskService {
  @Autowired
  private TaskDomainRepository taskDomainRepository;

  public List<TaskDomain> getTasksByBoardId(int boardId) {
    return taskDomainRepository.getTasksByBoardId(boardId);
  }

  public TaskDomain saveTask(TaskDomain taskDomain) {
    return taskDomainRepository.saveTask(taskDomain);
  }

  public void deleteTask(int taskId) {
    taskDomainRepository.deleteTask(taskId);
  }
}
