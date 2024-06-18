package com.artikunazo.dashboardKanban.domain;

public class TaskOverview {
  private int idTask;
  private String taskName;
  private int totalSubtasks;

  public TaskOverview(int idTask, String taskName, int totalSubtasks){
    this.idTask = idTask;
    this.taskName = taskName;
    this.totalSubtasks = totalSubtasks;
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
}
