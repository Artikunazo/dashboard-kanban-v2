package com.artikunazo.dashboardKanban.persistence;

import com.artikunazo.dashboardKanban.domain.TaskDomain;
import com.artikunazo.dashboardKanban.domain.repository.TaskDomainRepository;
import com.artikunazo.dashboardKanban.persistence.crud.TaskCrudRepository;
import com.artikunazo.dashboardKanban.persistence.entity.Task;
import com.artikunazo.dashboardKanban.persistence.mapper.TaskMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class TaskRepository implements TaskDomainRepository {
  @Autowired
  private TaskCrudRepository taskCrudRepository;

  @Autowired
  private TaskMapper taskMapper;

  @Override
  public List<TaskDomain> getTasksByBoardId(int boardId) {
    return taskMapper.toTasksDomain(
        taskCrudRepository.findByIdBoard(boardId)
    );
  }

  @Override
  public TaskDomain saveTask(TaskDomain taskDomain) {
    Task task = taskMapper.toTask(taskDomain);
    return taskMapper.toTaskDomain(taskCrudRepository.save(task));
  }

  @Override
  public void deleteTask(int taskId) {
    taskCrudRepository.deleteById(taskId);
  }

  @Override
  public Optional<TaskDomain> getTaskById(int idTask) {
    return taskCrudRepository.findById(idTask).map(
        task -> taskMapper.toTaskDomain(task)
    );
  }

  @Override
  public Integer updateTask(TaskDomain taskDomain) {
    return taskCrudRepository.updateTask(
        taskDomain.getTaskTitle(),
        taskDomain.getTaskDescription(),
        taskDomain.getStatusId(),
        taskDomain.getTaskId()
    );
  }


}
