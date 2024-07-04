package com.artikunazo.dashboardKanban.persistence.crud;

import com.artikunazo.dashboardKanban.domain.BoardDomain;
import com.artikunazo.dashboardKanban.persistence.entity.Board;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface BoardCrudRepository extends CrudRepository<Board, Integer> {
  @Transactional
  @Modifying
  @Query("UPDATE Board b SET b.title = :title WHERE b.idBoard = :idBoard")
  int setBoardTitle(@Param("idBoard") int idBoard, @Param("title") String title);
}
