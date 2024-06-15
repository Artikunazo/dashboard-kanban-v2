package com.artikunazo.dashboardKanban.domain.repository;

import com.artikunazo.dashboardKanban.domain.StatusDomain;

import java.util.List;

public interface StatusDomainRepository {
  List<StatusDomain> getAll();
}
