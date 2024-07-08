package com.artikunazo.dashboardKanban.persistence.crud;

import com.artikunazo.dashboardKanban.persistence.entity.Subtask;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubtaskCrudRepository extends CrudRepository<Subtask, Integer> {
  List<Subtask> findByIdTask(int taskId);
  Integer countByIdTask(int taskId);

  @Query("SELECT COUNT(s.isDone) as totalDone FROM Subtask s WHERE s.isDone = 1 AND s.idTask = :idTask")
  Integer getIsDoneSubTaskByTask(@Param("idTask") int idTask);
}
