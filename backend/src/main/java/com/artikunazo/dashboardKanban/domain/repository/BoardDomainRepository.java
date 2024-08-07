package com.artikunazo.dashboardKanban.domain.repository;

import com.artikunazo.dashboardKanban.domain.BoardDomain;
import com.artikunazo.dashboardKanban.persistence.entity.Board;

import java.util.List;
import java.util.Optional;

public interface BoardDomainRepository {
  List<BoardDomain> getAll();
  Optional<BoardDomain> getBoardById(int idBoard);
  BoardDomain saveBoard(BoardDomain boardDomain);
  Integer updateBoard(BoardDomain boardDomain);
  void deleteBoard(int idBoard);
}
