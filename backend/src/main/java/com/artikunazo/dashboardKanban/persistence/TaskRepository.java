package com.artikunazo.dashboardKanban.persistence;

import com.artikunazo.dashboardKanban.domain.TaskDomain;
import com.artikunazo.dashboardKanban.domain.repository.TaskDomainRepository;
import com.artikunazo.dashboardKanban.persistence.crud.TaskCrudRespository;
import com.artikunazo.dashboardKanban.persistence.entity.Task;
import com.artikunazo.dashboardKanban.persistence.mapper.TaskMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TaskRepository implements TaskDomainRepository {
  @Autowired
  private TaskCrudRespository taskCrudRespository;

  @Autowired
  private TaskMapper taskMapper;

  public List<TaskDomain> getTasksByBoardId(int boardId) {
    return taskMapper.toTasksDomian(
        taskCrudRespository.findByBoardId(boardId)
    );
  }

  public TaskDomain saveTask(TaskDomain taskDomain) {
    Task task = taskMapper.toTask(taskDomain);
    return taskMapper.toTaskDomain(taskCrudRespository.save(task));
  }

  public void deleteTask(int taskId) {
    taskCrudRespository.deleteById(taskId);
  }
}
