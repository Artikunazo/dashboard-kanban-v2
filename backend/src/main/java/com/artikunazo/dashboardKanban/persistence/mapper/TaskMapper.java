package com.artikunazo.dashboardKanban.persistence.mapper;

import com.artikunazo.dashboardKanban.domain.TaskDomain;
import com.artikunazo.dashboardKanban.persistence.entity.Task;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring")
public interface TaskMapper {

  @Mappings({
      @Mapping(source = "taskId", target = "idTask"),
      @Mapping(source = "title", target = "title"),
      @Mapping(source = "description", target = "description"),
      @Mapping(source = "statusId", target = "idStatus"),
      @Mapping(source = "board", target = "board"),
      @Mapping(source = "subtasks", target = "subtasks"),
  })
  TaskDomain toTaskDomain(Task task);
  List<TaskDomain> toTasksDomian(List<Task> tasks);

  @InheritInverseConfiguration
  Task toTask(TaskDomain taskDomain);
}
