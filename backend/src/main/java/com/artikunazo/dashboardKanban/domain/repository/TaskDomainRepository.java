package com.artikunazo.dashboardKanban.domain.repository;

import com.artikunazo.dashboardKanban.domain.TaskDomain;

import java.util.List;

public interface TaskDomainRepository {
  List<TaskDomain> getTasksByBoardId(int boardId);
  TaskDomain saveTask(TaskDomain taskDomain);
  void deleteTask(int taskId);
}
