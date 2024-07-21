package com.artikunazo.dashboardKanban.persistence.crud;

import com.artikunazo.dashboardKanban.domain.TaskDomain;
import com.artikunazo.dashboardKanban.persistence.entity.Task;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TaskCrudRepository extends CrudRepository<Task, Integer> {
  List<Task> findByIdBoard(int boardId);

  @Transactional
  @Modifying
  @Query("UPDATE Task t SET t.title = :title, t.description = :description, t.idStatus = :idStatus WHERE t.idTask = :idTask")
  int updateTask(@Param("title") String title, @Param("description") String description, @Param("idStatus") int idStatus, @Param("idTask") int idTask);

  @Transactional
  @Modifying
  @Query("UPDATE Task t SET t.idStatus = :idStatus WHERE t.idTask = :idTask")
  int updateTaskStatus(@Param("idStatus") int idStatus, @Param("idTask") int idTask);
}
