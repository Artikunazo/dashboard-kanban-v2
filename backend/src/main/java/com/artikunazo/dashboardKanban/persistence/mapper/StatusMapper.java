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
      @Mapping(source = "idStatus", target = "statusId"),
      @Mapping(source = "status", target = "statusName")
  })
  StatusDomain toStatusDomain(Status status);
  List<StatusDomain> toStatusesDomain(List<Status> statuses);

  @InheritInverseConfiguration
  @Mapping(target = "task", ignore = true)
  Status toStatus(StatusDomain status);
}
