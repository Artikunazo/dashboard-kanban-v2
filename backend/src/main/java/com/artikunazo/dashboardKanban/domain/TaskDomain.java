package com.artikunazo.dashboardKanban.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Optional;

@Data
public class TaskDomain {
  private int taskId;
  private String taskTitle;
  private String taskDescription;
  private int statusId;
  private int boardId;
  private int totalIsDoneSubtasks;
  private String statusName;
  private int totalSubtasks;
}
