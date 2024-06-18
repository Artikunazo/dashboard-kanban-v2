package com.artikunazo.dashboardKanban.persistence.crud;

import com.artikunazo.dashboardKanban.persistence.entity.Subtask;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SubtaskCrudRepository extends CrudRepository<Subtask, Integer> {
  List<Subtask> findByTaskId(int taskId);
  Integer countByTaskId(int taskId);
}
