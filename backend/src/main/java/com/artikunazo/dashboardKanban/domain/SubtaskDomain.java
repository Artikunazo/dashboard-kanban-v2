package com.artikunazo.dashboardKanban.domain;

import com.artikunazo.dashboardKanban.persistence.entity.Task;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class SubtaskDomain {
  private int subtaskId;
  private String titleSubtask;
  private int done;
  private int taskId;

}
