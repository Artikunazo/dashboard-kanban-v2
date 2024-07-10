package com.artikunazo.dashboardKanban.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "subtasks")
public class Subtask {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_subtask")
  private int idSubtask;

  private String title;

  @Column(name = "is_done")
  private int isDone;

  @Column(name = "id_task")
  private Integer idTask;

  @ManyToOne
  @JoinColumn(name = "id_task", insertable = false, updatable = false)
  private Task task;

}
