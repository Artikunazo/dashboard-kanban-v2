package com.artikunazo.dashboardKanban.persistence.mapper;

import com.artikunazo.dashboardKanban.domain.StatusDomain;
import com.artikunazo.dashboardKanban.persistence.entity.Status;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StatusMapper {
  @Mappings({
      @Mapping(target = "statusId", source = "idStatus"),
      @Mapping(source = "status", target = "statusName")
  })
  StatusDomain toStatus(Status status);
  List<StatusDomain> toStatusesDomain(List<Status> statuses);

  @InheritInverseConfiguration
  @Mapping(target = "task", ignore = true)
  Status toStatusDomain(StatusDomain status);
}
