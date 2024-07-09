package com.artikunazo.dashboardKanban.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@Table(name = "tasks")
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
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

  @OneToMany(mappedBy = "task", cascade = { CascadeType.DETACH })
  private List<Subtask> subtasks;

}
