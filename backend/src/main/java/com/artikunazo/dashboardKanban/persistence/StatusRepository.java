package com.artikunazo.dashboardKanban.persistence;

import com.artikunazo.dashboardKanban.domain.StatusDomain;
import com.artikunazo.dashboardKanban.persistence.crud.StatusCrudRepository;
import com.artikunazo.dashboardKanban.persistence.entity.Status;
import com.artikunazo.dashboardKanban.persistence.mapper.StatusMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

//@ToDo: Implement status domain repository
@Repository
public class StatusRepository  {

  @Autowired
  private StatusCrudRepository statusCrudRepository;

  @Autowired
  private StatusMapper statusMapper;

  public List<StatusDomain> getAll() {
    List<Status> statuses = (List<Status>) statusCrudRepository.findAll();
    return statusMapper.toStatusesDomain(statuses);
  }
}
