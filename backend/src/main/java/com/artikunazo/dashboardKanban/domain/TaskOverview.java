package com.artikunazo.dashboardKanban.domain;

public class TaskOverview {
  private int idTask;
  private String taskName;
  private int totalSubtasks;
  private String statusName;

  public TaskOverview(int idTask, String taskName, int totalSubtasks, String statusName){
    this.idTask = idTask;
    this.taskName = taskName;
    this.totalSubtasks = totalSubtasks;
    this.statusName = statusName;
  }

  public String getTaskName() {
    return taskName;
  }

  public void setTaskName(String taskName) {
    this.taskName = taskName;
  }

  public int getTotalSubtasks() {
    return totalSubtasks;
  }

  public void setTotalSubtasks(int totalSubtasks) {
    this.totalSubtasks = totalSubtasks;
  }

  public int getIdTask() {
    return idTask;
  }

  public void setIdTask(int idTask) {
    this.idTask = idTask;
  }

  public String getStatusName() {
    return statusName;
  }

  public void setStatusName(String statusName) {
    this.statusName = statusName;
  }
}
