package com.artikunazo.dashboardKanban.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@Table(name = "status")
public class Status {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_status")
  private int idStatus;

  private String status;

  @OneToMany(mappedBy = "status",  cascade = CascadeType.ALL)
  private List<Task> task;

}
