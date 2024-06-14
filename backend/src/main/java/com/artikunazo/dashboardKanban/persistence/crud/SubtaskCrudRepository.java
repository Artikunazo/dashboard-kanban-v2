package com.artikunazo.dashboardKanban.persistence.crud;

import com.artikunazo.dashboardKanban.persistence.entity.Subtask;
import org.springframework.data.repository.CrudRepository;

public interface SubtaskCrudRepository extends CrudRepository<Subtask, Integer> {
}
