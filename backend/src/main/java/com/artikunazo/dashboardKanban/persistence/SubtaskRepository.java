package com.artikunazo.dashboardKanban.persistence;

import com.artikunazo.dashboardKanban.domain.SubtaskDomain;
import com.artikunazo.dashboardKanban.persistence.crud.SubtaskCrudRepository;
import com.artikunazo.dashboardKanban.persistence.entity.Subtask;
import com.artikunazo.dashboardKanban.persistence.mapper.SubtaskMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

//@ToDo: Implement status domain repository
@Repository
public class SubtaskRepository {
  @Autowired
  private SubtaskCrudRepository subtaskCrudRepository;

  @Autowired
  private SubtaskMapper subtaskMapper;

  public List<SubtaskDomain> getAllByTaskId(int taskId){
    return subtaskMapper.toSubtasksDomain(
        subtaskCrudRepository.findByTaskId(taskId)
    );
  }

  public SubtaskDomain saveSubtask(SubtaskDomain subtaskDomain) {
    Subtask subtask = subtaskMapper.toSubtask(subtaskDomain);
    return subtaskMapper.toSubtaskDomain(subtaskCrudRepository.save(subtask));
  }

  public void deleteSubtask(int subtaskId) {
    subtaskCrudRepository.deleteById(subtaskId);
  }
}
