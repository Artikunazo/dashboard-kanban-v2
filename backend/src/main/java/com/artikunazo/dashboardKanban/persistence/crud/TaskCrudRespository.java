package com.artikunazo.dashboardKanban.persistence.crud;

import com.artikunazo.dashboardKanban.persistence.entity.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskCrudRespository extends CrudRepository<Task, Integer> {
  List<Task> findByBoardId(int boardId);
}
