package com.artikunazo.dashboardKanban.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
public class TaskDomain {
  private int taskId;
  private String taskTitle;
  private String taskDescription;
  private int statusId;
  private int boardId;
  private List<SubtaskDomain> subtasks;

}
