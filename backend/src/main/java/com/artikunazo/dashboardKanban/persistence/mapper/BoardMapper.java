package com.artikunazo.dashboardKanban.persistence.mapper;

import com.artikunazo.dashboardKanban.domain.BoardDomain;
import com.artikunazo.dashboardKanban.persistence.entity.Board;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BoardMapper {
  @Mappings({
      @Mapping(source = "title", target = "title"),
      @Mapping(source = "tasks", target = "tasks"),
      @Mapping(source = "idBoard", target = "boardId")
  })
  BoardDomain toBoard(Board board);
  List<BoardDomain> toBoards(List<Board> boards);

  @InheritInverseConfiguration
  @Mapping(target = "idBoard", ignore = true)
  Board toBoardDomain(BoardDomain boardDomain);

}
