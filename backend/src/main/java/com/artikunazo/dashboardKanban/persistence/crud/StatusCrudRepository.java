package com.artikunazo.dashboardKanban.persistence.crud;

import com.artikunazo.dashboardKanban.persistence.entity.Status;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface StatusCrudRepository extends CrudRepository<Status, Integer> {
  @Query("SELECT s.status FROM Status s LEFT JOIN Task t ON t.idStatus = s.idStatus WHERE t.idTask = :idTask")
  String getStatusNameByTask(@Param("idTask") int idTask);

  @Query("SELECT s.idStatus FROM Status s WHERE s.status = :statusName")
  int getStatusIdByStatusName(@Param("statusName") String statusName);
}
