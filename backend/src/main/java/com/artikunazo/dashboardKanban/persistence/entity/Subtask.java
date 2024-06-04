package com.artikunazo.dashboardKanban.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "subtasks")
public class Subtask {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_subtask")
  private Integer idSubtask;

  private String title;
  private Boolean isDone;

  @ManyToOne
  @MapsId("idTask")
  @JoinColumn(name = "id_task", insertable = false, updatable = false)
  private Task task;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Boolean getDone() {
    return isDone;
  }

  public void setDone(Boolean done) {
    isDone = done;
  }

  public Integer getIdSubtask() {
    return idSubtask;
  }

  public void setIdSubtask(Integer idSubtask) {
    this.idSubtask = idSubtask;
  }

  public Task getId_task() {
    return task;
  }

  public void setId_task(Task task) {
    this.task = task;
  }
}
