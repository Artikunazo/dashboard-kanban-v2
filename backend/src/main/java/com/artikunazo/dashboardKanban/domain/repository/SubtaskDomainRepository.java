package com.artikunazo.dashboardKanban.domain.repository;

import com.artikunazo.dashboardKanban.domain.SubtaskDomain;

import java.util.List;

public interface SubtaskDomainRepository {
  List<SubtaskDomain> getAllByTaskId(int taskId);
  SubtaskDomain saveSubtask(SubtaskDomain subtaskDomain);
  void deleteSubtask(int subtaskId);
}
