package com.artikunazo.dashboardKanban.persistence.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "tasks")
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_task")
  private Integer idTask;

  private String title;
  private String description;

  @Column(name = "id_board")
  private Integer idBoard;

  @Column(name = "id_status")
  private Integer idStatus;

  @OneToOne
  @JoinColumn(name = "id_status", insertable = false, updatable = false)
  private Status status;

  @ManyToOne
  @JoinColumn(name = "id_board", insertable = false, updatable = false)
  private Board board;

  @OneToMany(mappedBy = "task", cascade = { CascadeType.ALL })
  private List<Subtask> subtasks;

  public Integer getIdTask() {
    return idTask;
  }

  public void setIdTask(Integer idTask) {
    this.idTask = idTask;
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

  public List<Subtask> getSubtasks() {
    return subtasks;
  }

  public void setSubtasks(List<Subtask> subtasks) {
    this.subtasks = subtasks;
  }

  public Board getBoard() {
    return board;
  }

  public void setBoard(Board board) {
    this.board = board;
  }

  public Integer getIdBoard() {
    return idBoard;
  }

  public void setIdBoard(Integer idBoard) {
    this.idBoard = idBoard;
  }

  public Integer getIdStatus() {
    return idStatus;
  }

  public void setIdStatus(Integer idStatus) {
    this.idStatus = idStatus;
  }

  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }
}
