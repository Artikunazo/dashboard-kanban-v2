package com.artikunazo.dashboardKanban.persistence.crud;

import com.artikunazo.dashboardKanban.persistence.entity.Subtask;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SubtaskCrudRepository extends CrudRepository<Subtask, Integer> {
  List<Subtask> findByIdTask(int taskId);
  Integer countByIdTask(int taskId);

  @Query("SELECT COUNT(s.isDone) FROM Subtask s WHERE s.isDone = 1 AND s.idTask = :idTask")
  Integer getIsDoneSubTaskByTask(@Param("idTask") int idTask);

  @Transactional
  @Modifying
  @Query("UPDATE Subtask s SET s.title = :title, s.isDone = :done WHERE s.idSubtask = :idSubtask")
  void updateSubtask(@Param("title") String title, @Param("done") int done, @Param("idSubtask") int subtaskId);
}
