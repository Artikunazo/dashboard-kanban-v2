package com.artikunazo.dashboardKanban.persistence.crud;

import com.artikunazo.dashboardKanban.persistence.entity.Task;
import org.springframework.data.repository.CrudRepository;

public interface StatusCrudRepository extends CrudRepository<Task, Integer> {
}
