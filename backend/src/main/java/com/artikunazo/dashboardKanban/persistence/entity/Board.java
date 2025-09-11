package com.artikunazo.dashboardKanban.persistence.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.util.List;

@Data
@Entity
@Table(name = "boards")
@DynamicUpdate
public class Board {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_board")
  private Integer idBoard;

  private String title;

  @OneToMany(mappedBy = "board",cascade = { CascadeType.ALL })
  private List<Task> tasks;
}
