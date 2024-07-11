package com.artikunazo.dashboardKanban.domain.service;

import com.artikunazo.dashboardKanban.domain.SubtaskDomain;
import com.artikunazo.dashboardKanban.domain.TaskDomain;
import com.artikunazo.dashboardKanban.domain.TaskOverview;
import com.artikunazo.dashboardKanban.domain.repository.TaskDomainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

  public List<TaskOverview> getTasksByBoardId(int boardId) {
    ArrayList<TaskOverview> taskOverviewList = new ArrayList<>();
    List<TaskDomain> tasks = taskDomainRepository.getTasksByBoardId(boardId);

    tasks.forEach(taskDomain -> {
      taskOverviewList.add(
          new TaskOverview(
              taskDomain.getTaskId(),
              taskDomain.getTaskTitle(),
              subtaskService.getCountSubtasksByIdTask(
                  taskDomain.getTaskId()
              ),
              statusService.getStatusNameOfTask(taskDomain.getTaskId()),
              subtaskService.getIsDoneSubTaskByTask(taskDomain.getTaskId())
          )
      );
    });

    return taskOverviewList;
  }

  public Optional<TaskDomain> getTaskById(int idTask) {
    return taskDomainRepository.getTaskById(idTask);
  }

  public TaskDomain saveTask(TaskDomain taskDomain) {
    // @ToDo: Save task first
    // For get taskId stored
    // We get that taskId and We use it to store each subtask

    TaskDomain taskSaved = taskDomainRepository.saveTask(taskDomain);

    List<SubtaskDomain> subtasks = taskDomain.getSubtasks();
    for (SubtaskDomain subtask : subtasks) {
      subtask.setTaskId(taskSaved.getTaskId());
      subtaskService.saveSubtask(subtask);
    }

    return taskSaved;
  }

  public boolean deleteTask(int idTask) {
    return getTaskById(idTask).map(taskDomain -> {
      taskDomainRepository.deleteTask(idTask);
      return true;
    }).orElse(false);
  }
}
