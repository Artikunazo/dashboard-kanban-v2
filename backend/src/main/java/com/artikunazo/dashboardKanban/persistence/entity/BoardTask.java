package com.artikunazo.dashboardKanban.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "boards_tasks")
public class BoardTask {

  @EmbeddedId
  private BoardTaskPK idBoardsTasks;

  @ManyToOne
  @MapsId("idBoard")
  @JoinColumn(name = "id_board", insertable = false, updatable = false)
  private Board board;

  @ManyToOne
  @MapsId("idTask")
  @JoinColumn(name = "id_task", insertable = false, updatable = false)
  private Task task;

  public BoardTaskPK getId() {
    return idBoardsTasks;
  }

  public void setId(BoardTaskPK id) {
    this.idBoardsTasks = id;
  }

  public Board getBoard() {
    return board;
  }

  public void setBoard(Board board) {
    this.board = board;
  }

  public Task getTask() {
    return task;
  }

  public void setTask(Task task) {
    this.task = task;
  }
}
