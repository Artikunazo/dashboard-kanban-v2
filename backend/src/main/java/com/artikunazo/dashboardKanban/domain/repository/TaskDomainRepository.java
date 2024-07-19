package com.artikunazo.dashboardKanban.domain.repository;

import com.artikunazo.dashboardKanban.domain.TaskDomain;

import java.util.List;
import java.util.Optional;

public interface TaskDomainRepository {
  List<TaskDomain> getTasksByBoardId(int boardId);
  TaskDomain saveTask(TaskDomain taskDomain);
  void deleteTask(int taskId);
  Optional<TaskDomain> getTaskById(int idTask);
  Integer updateTask(TaskDomain taskDomain);
}
