package com.artikunazo.dashboardKanban.persistence.crud;

import com.artikunazo.dashboardKanban.persistence.entity.Status;
import org.springframework.data.repository.CrudRepository;

public interface StatusCrudRepository extends CrudRepository<Status, Integer> {
}
