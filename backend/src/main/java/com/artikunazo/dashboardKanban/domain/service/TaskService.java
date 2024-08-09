package com.artikunazo.dashboardKanban.domain.service;

import com.artikunazo.dashboardKanban.domain.TaskDomain;
import com.artikunazo.dashboardKanban.domain.repository.TaskDomainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Ever get subtask with different methods**

@Service
public class TaskService {
  @Autowired
  private TaskDomainRepository taskDomainRepository;

  @Autowired
  private SubtaskService subtaskService;

  @Autowired
  private StatusService statusService;

  public List<TaskDomain> getTasksByBoardId(int boardId) {
    List<TaskDomain> tasks = taskDomainRepository.getTasksByBoardId(boardId);

    tasks.forEach(taskDomain -> {
      int taskId = taskDomain.getTaskId();
      taskDomain.setTotalIsDoneSubtasks(subtaskService.getIsDoneSubTaskByTask(taskId));
      taskDomain.setStatusName(statusService.getStatusNameOfTask(taskId));
      taskDomain.setTotalSubtasks(subtaskService.getCountSubtasksByIdTask(taskId));
    });

    return tasks;
  }

  public Optional<TaskDomain> getTaskById(int idTask) {
    Optional<TaskDomain> task = taskDomainRepository.getTaskById(idTask);

    task.ifPresent(taskDomain -> {
      int taskId = taskDomain.getTaskId();
      taskDomain.setStatusName(statusService.getStatusNameOfTask(taskId));
    });

    return task;
  }

  public TaskDomain saveTask(TaskDomain taskDomain) {
    return taskDomainRepository.saveTask(taskDomain);
  }

  public boolean deleteTask(int idTask) {
    // @ToDo: Delete subtasks related with task to delete
    // Apply with base on status in other column: isDeleted: true | false
    return getTaskById(idTask).map(taskDomain -> {
      taskDomainRepository.deleteTask(idTask);
      return true;
    }).orElse(false);
  }

  public boolean updateTask(TaskDomain taskDomain) {
    return getTaskById(taskDomain.getTaskId()).map(taskDomain1 -> {
      taskDomainRepository.updateTask(taskDomain);
      return true;
    }).orElse(false);
  }

  public boolean updateTaskStatus(TaskDomain taskDomain) {
    int idStatus = statusService.getStatusIdByStatusName(taskDomain.getStatusName());
    return getTaskById(taskDomain.getTaskId()).map(taskDomain1 -> {
      taskDomainRepository.updateTaskStatus(idStatus, taskDomain1.getTaskId());
      return true;
    }).orElse(false);
  }
}
