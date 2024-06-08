package com.artikunazo.dashboardKanban.domain;

import java.util.List;

public class TaskDomain {
  private int taskId;
  private String title;
  private String description;
  private int statusId;
  private BoardDomain board;
  private List<SubtaskDomain> subtasks;

  public int getTaskId() {
    return taskId;
  }

  public void setTaskId(int taskId) {
    this.taskId = taskId;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public int getStatusId() {
    return statusId;
  }

  public void setStatusId(int statusId) {
    this.statusId = statusId;
  }

  public BoardDomain getBoard() {
    return board;
  }

  public void setBoard(BoardDomain board) {
    this.board = board;
  }

  public List<SubtaskDomain> getSubtasks() {
    return subtasks;
  }

  public void setSubtasks(List<SubtaskDomain> subtasks) {
    this.subtasks = subtasks;
  }
}
