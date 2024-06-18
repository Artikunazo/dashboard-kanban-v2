package com.artikunazo.dashboardKanban.persistence;

import com.artikunazo.dashboardKanban.domain.BoardDomain;
import com.artikunazo.dashboardKanban.domain.repository.BoardDomainRepository;
import com.artikunazo.dashboardKanban.persistence.crud.BoardCrudRepository;
import com.artikunazo.dashboardKanban.persistence.entity.Board;
import com.artikunazo.dashboardKanban.persistence.mapper.BoardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BoardRepository implements BoardDomainRepository {
  @Autowired
  private BoardCrudRepository boardCrudRepository;

  @Autowired
  private BoardMapper boardMapper;

  @Override
  public List<BoardDomain> getAll() {
    List<Board> boards = (List<Board>) boardCrudRepository.findAll();
    return boardMapper.toBoards(boards);
  }

  @Override
  public Optional<BoardDomain> getBoardById(int idBoard) {
    return boardCrudRepository.findById(idBoard).map(
        board -> boardMapper.toBoard(board)
    );
  }

  @Override
  public BoardDomain saveBoard(BoardDomain boardDomain){
    Board board = boardMapper.toBoardDomain(boardDomain);
    return boardMapper.toBoard(boardCrudRepository.save(board));
  }

  @Override
  public void deleteBoard(int idBoard){
    boardCrudRepository.deleteById(idBoard);
  }

}
