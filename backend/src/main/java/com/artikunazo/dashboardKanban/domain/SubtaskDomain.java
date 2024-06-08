package com.artikunazo.dashboardKanban.domain;

import com.artikunazo.dashboardKanban.persistence.entity.Task;

public class SubtaskDomain {
  private int subtaskId;
  private String title;
  private boolean isDone;
  private Task task;

  public int getSubtaskId() {
    return subtaskId;
  }

  public void setSubtaskId(int subtaskId) {
    this.subtaskId = subtaskId;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public boolean isDone() {
    return isDone;
  }

  public void setDone(boolean done) {
    isDone = done;
  }

  public Task getTask() {
    return task;
  }

  public void setTask(Task task) {
    this.task = task;
  }
}
