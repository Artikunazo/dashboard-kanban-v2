package com.artikunazo.dashboardKanban.persistence.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "boards")
public class Board {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_board")
  private Integer idBoard;

  private String title;

  @OneToMany(mappedBy = "task", cascade = { CascadeType.ALL })
  private List<Task> tasks;

  public Integer getIdBoard() {
    return idBoard;
  }

  public void setIdBoard(Integer idBoard) {
    this.idBoard = idBoard;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public List<Task> getTasks() {
    return tasks;
  }

  public void setTasks(List<Task> tasks) {
    this.tasks = tasks;
  }
}
