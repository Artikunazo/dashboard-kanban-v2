package com.artikunazo.dashboardKanban.persistence;

import com.artikunazo.dashboardKanban.persistence.crud.StatusCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

//@ToDo: Implement status domain repository
@Repository
public class StatusRepository  {

  @Autowired
  private StatusCrudRepository statusCrudRepository;
}
