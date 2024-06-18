package com.artikunazo.dashboardKanban.domain;

public class StatusDomain {
  private int statusId;
  private String statusName;

  public int getStatusId() {
    return statusId;
  }

  public void setStatusId(int statusId) {
    this.statusId = statusId;
  }

  public String getStatus() {
    return statusName;
  }

  public void setStatus(String status) {
    this.statusName = status;
  }
}
