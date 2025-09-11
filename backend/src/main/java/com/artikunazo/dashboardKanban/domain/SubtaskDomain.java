package com.artikunazo.dashboardKanban.domain;

import lombok.Data;

@Data
public class SubtaskDomain {
  private int subtaskId;
  private String titleSubtask;
  private int done;
  private int taskId;
}
