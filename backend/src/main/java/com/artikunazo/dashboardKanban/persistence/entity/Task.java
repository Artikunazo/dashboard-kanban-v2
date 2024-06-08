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

  @OneToOne
  @MapsId("status_id")
  @JoinColumn(name = "status_id", insertable = false, updatable = false)
  private Status idStatus;

  @OneToMany(mappedBy = "board", cascade = { CascadeType.ALL})
  private Board board;
pri
  @OneToMany(mappedBy = "subtask", cascade = { CascadeType.ALL })
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

  public Status getIdStatus() {
    return idStatus;
  }

  public void setIdStatus(Status idStatus) {
    this.idStatus = idStatus;
  }

  public Board getBoards() {
    return board;
  }

  public void setBoards(Board boards) {
    this.board = boards;
  }

  public List<Subtask> getSubtasks() {
    return subtasks;
  }

  public void setSubtasks(List<Subtask> subtasks) {
    this.subtasks = subtasks;
  }
}
