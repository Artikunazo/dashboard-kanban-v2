package com.artikunazo.dashboardKanban.persistence;

import com.artikunazo.dashboardKanban.domain.BoardDomain;
import com.artikunazo.dashboardKanban.persistence.crud.BoardCrudRepository;
import com.artikunazo.dashboardKanban.persistence.entity.Board;
import com.artikunazo.dashboardKanban.persistence.mapper.BoardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

//@ToDo: Implement status domain repository
@Repository
public class BoardRepository {
  @Autowired
  private BoardCrudRepository boardCrudRepository;

  @Autowired
  private BoardMapper boardMapper;


  public List<BoardDomain> getAll() {
    List<Board> boards = (List<Board>) boardCrudRepository.findAll();
    return boardMapper.toBoards(boards);
  }

  public Optional<BoardDomain> getBoardById(int idBoard) {
    return boardCrudRepository.findById(idBoard).map(
        board -> boardMapper.toBoard(board)
    );
  }

  public BoardDomain saveBoard(BoardDomain boardDomain){
    Board board = boardMapper.toBoardDomain(boardDomain);
    return boardMapper.toBoard(boardCrudRepository.save(board));
  }

  public void deleteBoard(int idBoard){
    boardCrudRepository.deleteById(idBoard);
  }

}
