package com.artikunazo.dashboardKanban.persistence.crud;

import com.artikunazo.dashboardKanban.persistence.entity.Board;
import org.springframework.data.repository.CrudRepository;

public interface BoardCrudRepository extends CrudRepository<Board, Integer> {
}
