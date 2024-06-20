package com.artikunazo.dashboardKanban.persistence.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "status")
public class Status {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_status")
  private Integer idStatus;

  private String status;

  @OneToOne(mappedBy = "status",  cascade = { CascadeType.ALL })
  private Task task;

  public Integer getIdStatus() {
    return idStatus;
  }

  public void setIdStatus(Integer idStatus) {
    this.idStatus = idStatus;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public Task getTask() {
    return task;
  }

  public void setTask(Task task) {
    this.task = task;
  }
}
