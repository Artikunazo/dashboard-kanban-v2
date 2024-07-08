package com.artikunazo.dashboardKanban.persistence;

import com.artikunazo.dashboardKanban.domain.SubtaskDomain;
import com.artikunazo.dashboardKanban.domain.repository.SubtaskDomainRepository;
import com.artikunazo.dashboardKanban.persistence.crud.SubtaskCrudRepository;
import com.artikunazo.dashboardKanban.persistence.entity.Subtask;
import com.artikunazo.dashboardKanban.persistence.mapper.SubtaskMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class SubtaskRepository implements SubtaskDomainRepository {
  @Autowired
  private SubtaskCrudRepository subtaskCrudRepository;

  @Autowired
  private SubtaskMapper subtaskMapper;

  @Override
  public List<SubtaskDomain> getAllByTaskId(int taskId){
    return subtaskMapper.toSubtasksDomain(
        subtaskCrudRepository.findByIdTask(taskId)
    );
  }

  @Override
  public Optional<SubtaskDomain> getSubtaskById(int idSubtask) {
    return subtaskCrudRepository.findById(idSubtask).map(
        subtask -> subtaskMapper.toSubtaskDomain(subtask)
    );
  }

  @Override
  public SubtaskDomain saveSubtask(SubtaskDomain subtaskDomain) {
    Subtask subtask = subtaskMapper.toSubtask(subtaskDomain);
    return subtaskMapper.toSubtaskDomain(subtaskCrudRepository.save(subtask));
  }

  @Override
  public void deleteSubtask(int subtaskId) {
    subtaskCrudRepository.deleteById(subtaskId);
  }

  @Override
  public Integer getCountSubtasksByIdTask(int idTask) {
    return subtaskCrudRepository.countByIdTask(idTask);
  }

  @Override
  public Integer getIsDoneSubTaskByTask(int idTask) {
    return subtaskCrudRepository.getIsDoneSubTaskByTask(idTask);
  }

}
