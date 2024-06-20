package com.artikunazo.dashboardKanban.web.controller;

import com.artikunazo.dashboardKanban.domain.TaskDomain;
import com.artikunazo.dashboardKanban.domain.TaskOverview;
import com.artikunazo.dashboardKanban.domain.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/task")
public class TaskController {

  @Autowired
  private TaskService taskService;

  @GetMapping("/health-check")
  public ResponseEntity<String> getResponse() {
    return new ResponseEntity<String>("Ok!", HttpStatus.OK) ;
  }

  @GetMapping("/all/{idBoard}")
  public ResponseEntity<List<TaskOverview>> getTasksByBoardId(@PathVariable("idBoard") int idBoard) {
    return new ResponseEntity<>(taskService.getTasksByBoardId(idBoard), HttpStatus.OK);
  }

  @GetMapping("{idTask}")
  public ResponseEntity<Optional<TaskDomain>> getTaskById(@PathVariable("idTask") int idTask) {
    return new ResponseEntity<>(taskService.getTaskById(idTask), HttpStatus.OK);
  }

  @PostMapping("/save")
  public ResponseEntity<TaskDomain> saveTask(@RequestBody TaskDomain taskDomain){
    return new ResponseEntity<>(taskService.saveTask(taskDomain), HttpStatus.CREATED);
  }

  @DeleteMapping("/delete/{idTask}")
  public ResponseEntity<String> deleteTask(@PathVariable("idTask") int idTask) {
    if(!taskService.deleteTask(idTask)) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    } else {
      return new ResponseEntity<>(HttpStatus.OK);
    }
  }
}
