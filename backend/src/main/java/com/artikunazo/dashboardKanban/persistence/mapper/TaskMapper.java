package com.artikunazo.dashboardKanban.persistence.mapper;

import com.artikunazo.dashboardKanban.domain.TaskDomain;
import com.artikunazo.dashboardKanban.persistence.entity.Task;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

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
  TaskDomain toTask(Task task);

  @InheritInverseConfiguration
  Task toTaskDomain(TaskDomain taskDomain);
}
