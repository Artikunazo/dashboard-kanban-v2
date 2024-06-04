package com.artikunazo.dashboardKanban.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "status")
public class Status {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_status")
  private Integer idStatus;

  private String status;

  public Integer getId() {
    return idStatus;
  }

  public void setId(Integer id) {
    this.idStatus = id;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
}
