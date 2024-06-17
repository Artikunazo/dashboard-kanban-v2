package com.artikunazo.dashboardKanban.domain.repository;

import com.artikunazo.dashboardKanban.domain.SubtaskDomain;

import java.util.List;
import java.util.Optional;

public interface SubtaskDomainRepository {
  List<SubtaskDomain> getAllByTaskId(int taskId);
  SubtaskDomain saveSubtask(SubtaskDomain subtaskDomain);
  void deleteSubtask(int subtaskId);
  Optional<SubtaskDomain> getSubtaskById(int idSubtask);
}
