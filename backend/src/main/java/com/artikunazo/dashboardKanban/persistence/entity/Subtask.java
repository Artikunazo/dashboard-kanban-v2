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

  @Column(name = "is_done")
  private Boolean isDone;

  @Column(name = "id_task")
  private Integer idTask;

  @ManyToOne
  @JoinColumn(name = "id_task", insertable = false, updatable = false)
  private Task task;

  public Integer getIdSubtask() {
    return idSubtask;
  }

  public void setIdSubtask(Integer idSubtask) {
    this.idSubtask = idSubtask;
  }

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

  public Integer getIdTask() {
    return idTask;
  }

  public void setIdTask(Integer idTask) {
    this.idTask = idTask;
  }

  public Task getTask() {
    return task;
  }

  public void setTask(Task task) {
    this.task = task;
  }
}
