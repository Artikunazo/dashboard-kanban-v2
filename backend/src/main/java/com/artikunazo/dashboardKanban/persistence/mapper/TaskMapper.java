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
      @Mapping(source = "idTask", target = "taskId"),
      @Mapping(source = "title", target = "taskTitle"),
      @Mapping(source = "description", target = "taskDescription"),
      @Mapping(source = "idBoard", target = "boardId"),
      @Mapping(source = "idStatus", target = "statusId")
  })
  TaskDomain toTaskDomain(Task task);
  List<TaskDomain> toTasksDomain(List<Task> tasks);

  @InheritInverseConfiguration
  @Mapping(target = "subtasks", ignore = true)
  Task toTask(TaskDomain taskDomain);
}
