package com.artikunazo.dashboardKanban.persistence.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class BoardTaskPK implements Serializable {
  @Column(name = "board_id")
  private Integer boardId;

  @Column(name = "task_id")
  private Integer taskId;

  public Integer getBoardId() {
    return boardId;
  }

  public void setBoardId(Integer boardId) {
    this.boardId = boardId;
  }

  public Integer getTaskId() {
    return taskId;
  }

  public void setTaskId(Integer taskId) {
    this.taskId = taskId;
  }
}
