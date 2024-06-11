package com.artikunazo.dashboardKanban.persistence.mapper;

import com.artikunazo.dashboardKanban.domain.StatusDomain;
import com.artikunazo.dashboardKanban.persistence.entity.Status;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface StatusMapper {
  @Mappings({
    @Mapping(source = "statusId", target = "idStatus"),
      @Mapping(source = "status", target = "status")
  })
  StatusDomain toStatus(Status status);

  @InheritInverseConfiguration
  Status toStatusDomain(StatusDomain status);
}
