package com.artikunazo.dashboardKanban.persistence.mapper;

import com.artikunazo.dashboardKanban.domain.SubtaskDomain;
import com.artikunazo.dashboardKanban.persistence.entity.Subtask;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring")
public interface SubtaskMapper {
  @Mappings({
      @Mapping(source = "subtaskId", target = "idSubtask"),
      @Mapping(source = "title", target = "title"),
      @Mapping(source = "isDone", target = "isDone"),
      @Mapping(source = "task", target = "task"),
  })
  SubtaskDomain toSubtaskDomain(Subtask subtask);
  List<SubtaskDomain> toSubtasksDomain(List<Subtask> subtasks);

  @InheritInverseConfiguration
  Subtask toSubtask(SubtaskDomain subtaskDomain);
}
