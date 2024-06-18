package com.artikunazo.dashboardKanban.domain.service;

import com.artikunazo.dashboardKanban.domain.TaskDomain;
import com.artikunazo.dashboardKanban.domain.TaskOverview;
import com.artikunazo.dashboardKanban.domain.repository.TaskDomainRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class TaskService {
  @Autowired
  private TaskDomainRepository taskDomainRepository;

  @Autowired
  private SubtaskService subtaskService;

  public List<TaskOverview> getTasksByBoardId(int boardId) {
    ArrayList<TaskOverview> taskOverviewList = new ArrayList<>();

    List<TaskDomain> tasks = taskDomainRepository.getTasksByBoardId(boardId);

    tasks.forEach(taskDomain -> {
      taskOverviewList.add(
          new TaskOverview(
              taskDomain.getTaskId(),
              taskDomain.getTitle(),
              subtaskService.getCountSubtasksByIdTask(
                  taskDomain.getTaskId()
              )
          )
      );
    });

    return taskOverviewList;
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
