package com.artikunazo.dashboardKanban.persistence;

import com.artikunazo.dashboardKanban.persistence.crud.TaskCrudRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

//@ToDo: Implement status domain repository
@Repository
public class TaskRepository {
  @Autowired
  private TaskCrudRespository taskCrudRespository;
}
