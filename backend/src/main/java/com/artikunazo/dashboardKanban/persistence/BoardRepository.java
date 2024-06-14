package com.artikunazo.dashboardKanban.persistence;

import com.artikunazo.dashboardKanban.persistence.crud.BoardCrudRepository;
import com.artikunazo.dashboardKanban.persistence.entity.Board;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

//@ToDo: Implement status domain repository
@Repository
public class BoardRepository {
  @Autowired
  private BoardCrudRepository boardCrudRepository;

}
