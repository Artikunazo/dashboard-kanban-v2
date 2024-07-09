package com.artikunazo.dashboardKanban.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@Table(name = "status")
public class Status {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "id_status")
  private Integer idStatus;

  private String status;

  @OneToOne(mappedBy = "status",  cascade = CascadeType.DETACH)
  private Task task;

}
