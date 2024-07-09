package com.artikunazo.dashboardKanban.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class TaskOverview {
  private int idTask;
  private String taskName;
  private int totalSubtasks;
  private String statusName;
  private int totalIsDoneSubtasks;

  public TaskOverview(int idTask, String taskName, int totalSubtasks, String statusName, int totalIsDoneSubtasks){
    this.idTask = idTask;
    this.taskName = taskName;
    this.totalSubtasks = totalSubtasks;
    this.statusName = statusName;
    this.totalIsDoneSubtasks = totalIsDoneSubtasks;
  }

}
