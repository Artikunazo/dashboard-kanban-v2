package com.artikunazo.dashboardKanban.domain;

import java.util.List;

public class TaskDomain {
  private int taskId;
  private String taskTitle;
  private String taskDescription;
  private int statusId;
  private int boardId;
  private List<SubtaskDomain> subtasks;

  public int getTaskId() {
    return taskId;
  }

  public void setTaskId(int taskId) {
    this.taskId = taskId;
  }

  public String getTaskTitle() {
    return taskTitle;
  }

  public void setTaskTitle(String taskTitle) {
    this.taskTitle = taskTitle;
  }

  public String getTaskDescription() {
    return taskDescription;
  }

  public void setTaskDescription(String taskDescription) {
    this.taskDescription = taskDescription;
  }

  public int getStatusId() {
    return statusId;
  }

  public void setStatusId(int statusId) {
    this.statusId = statusId;
  }

  public int getBoardId() {
    return boardId;
  }

  public void setBoardId(int boardId) {
    this.boardId = boardId;
  }

  public List<SubtaskDomain> getSubtasks() {
    return subtasks;
  }

  public void setSubtasks(List<SubtaskDomain> subtasks) {
    this.subtasks = subtasks;
  }
}
