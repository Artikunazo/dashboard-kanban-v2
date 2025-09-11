package com.artikunazo.dashboardKanban.domain.repository;

import com.artikunazo.dashboardKanban.domain.StatusDomain;

import java.util.List;

public interface StatusDomainRepository {
  List<StatusDomain> getAll();
  String getStatusNameByTask(int idTask);
  int getStatusIdByStatusName(String statusName);
}
