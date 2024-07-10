-- MySQL Script generated by MySQL Workbench
-- Sat Jun 15 00:32:40 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Dashboard_kanban
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Dashboard_kanban
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dashboard_kanban` ;
USE `dashboard_kanban` ;

-- -----------------------------------------------------
-- Table `Dashboard_kanban`.`boards`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dashboard_kanban`.`boards` ;

CREATE TABLE IF NOT EXISTS `dashboard_kanban`.`boards` (
  `id_board` INT NOT NULL AUTO_INCREMENT,
  `title` TEXT NOT NULL,
  PRIMARY KEY (`id_board`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Dashboard_kanban`.`status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dashboard_kanban`.`status` ;

CREATE TABLE IF NOT EXISTS `dashboard_kanban`.`status` (
  `id_status` INT NOT NULL AUTO_INCREMENT,
  `status` TEXT NOT NULL,
  PRIMARY KEY (`id_status`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Dashboard_kanban`.`tasks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dashboard_kanban`.`tasks` ;

CREATE TABLE IF NOT EXISTS `dashboard_kanban`.`tasks` (
  `id_task` INT NOT NULL AUTO_INCREMENT,
  `title` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `id_status` INT NOT NULL,
  `id_board` INT NOT NULL,
  PRIMARY KEY (`id_task`),
  INDEX `fk_tasks_status1_idx` (`id_status` ASC) VISIBLE,
  INDEX `id_board_idx` (`id_board` ASC) VISIBLE,
  CONSTRAINT `id_status`
    FOREIGN KEY (`id_status`)
    REFERENCES `dashboard_kanban`.`status` (`id_status`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_board`
    FOREIGN KEY (`id_board`)
    REFERENCES `dashboard_kanban`.`boards` (`id_board`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Dashboard_kanban`.`subtasks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dashboard_kanban`.`subtasks` ;

CREATE TABLE IF NOT EXISTS `dashboard_kanban`.`subtasks` (
  `id_subtask` INT NOT NULL AUTO_INCREMENT,
  `title` TEXT NOT NULL,
  `is_done` TINYINT NOT NULL DEFAULT 0,
  `id_task` INT NOT NULL,
  PRIMARY KEY (`id_subtask`),
  INDEX `id_task_idx` (`id_task` ASC) VISIBLE,
  CONSTRAINT `id_task`
    FOREIGN KEY (`id_task`)
    REFERENCES `Dashboard_kanban`.`tasks` (`id_task`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
