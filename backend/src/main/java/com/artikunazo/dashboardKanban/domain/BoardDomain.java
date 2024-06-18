package com.artikunazo.dashboardKanban.domain;

public class BoardDomain {
  private int boardId;
  private String title;

  public int getBoardId() {
    return boardId;
  }

  public void setBoardId(int boardId) {
    this.boardId = boardId;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }
}
