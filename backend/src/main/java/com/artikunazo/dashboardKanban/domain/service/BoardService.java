package com.artikunazo.dashboardKanban.domain.service;

import com.artikunazo.dashboardKanban.domain.BoardDomain;
import com.artikunazo.dashboardKanban.domain.repository.BoardDomainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoardService {
  @Autowired
  private BoardDomainRepository boardDomainRepository;

  public List<BoardDomain> getAll() {
    return boardDomainRepository.getAll();
  }

  public Optional<BoardDomain> getBoardById(int idBoard) {
    return boardDomainRepository.getBoardById(idBoard);
  }

  public BoardDomain saveBoard(BoardDomain boardDomain) {
    return boardDomainRepository.saveBoard(boardDomain);
  }

  public boolean deleteBoard(int idBoard) {
    return getBoardById(idBoard).map(boardDomain -> {
      boardDomainRepository.deleteBoard(idBoard);
      return true;
    }).orElse(false);
  }

  public Integer updateBoard(BoardDomain boardDomain) {
    Integer result = boardDomainRepository.updateBoard(boardDomain);
    System.out.println("result" + result);
    return result;
  }
}
