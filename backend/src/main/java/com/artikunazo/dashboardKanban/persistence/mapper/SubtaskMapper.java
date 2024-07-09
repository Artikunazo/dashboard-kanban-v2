package com.artikunazo.dashboardKanban.persistence.mapper;

import java.util.List;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.artikunazo.dashboardKanban.domain.SubtaskDomain;
import com.artikunazo.dashboardKanban.persistence.entity.Subtask;

@Mapper(componentModel = "spring")
public interface SubtaskMapper {
  @Mappings({
      @Mapping(source = "idSubtask", target = "subtaskId"),
      @Mapping(source = "title", target = "titleSubtask"),
      @Mapping(source = "isDone", target = "done"),
      @Mapping(source = "idTask", target = "taskId")
  })
  SubtaskDomain toSubtaskDomain(Subtask subtask);
  List<SubtaskDomain> toSubtasksDomain(List<Subtask> subtasks);

  @InheritInverseConfiguration
  @Mapping(target = "task", ignore = true)
  Subtask toSubtask(SubtaskDomain subtaskDomain);
}
