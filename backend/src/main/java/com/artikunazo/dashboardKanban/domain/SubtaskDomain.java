package com.artikunazo.dashboardKanban.domain;

import com.artikunazo.dashboardKanban.persistence.entity.Task;

public class SubtaskDomain {
  private int subtaskId;
  private String titleSubtask;
  private boolean done;
  private int taskId;

  public int getSubtaskId() {
    return subtaskId;
  }

  public void setSubtaskId(int subtaskId) {
    this.subtaskId = subtaskId;
  }

  public String getTitleSubtask() {
    return titleSubtask;
  }

  public void setTitleSubtask(String titleSubtask) {
    this.titleSubtask = titleSubtask;
  }

  public boolean isDone() {
    return done;
  }

  public void setDone(boolean done) {
    this.done = done;
  }

  public int getTaskId() {
    return taskId;
  }

  public void setTaskId(int taskId) {
    this.taskId = taskId;
  }
}
