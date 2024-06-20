import { Subtask } from "./subtask_models";

export interface Task {
  taskId: number;
  taskTitle: string;
  taskDescription: string;
  statusId: number;
  boardId: number;
  subtasks: Subtask[];
}

export interface ITask {
	title: string;
	description: string;
	subtasks: ISubtask[];
	status: string;
	id: string;
}

export interface ISubtask {
	title: string | undefined;
	status: string;
	index?: number;
}

export enum TaskStatus {
	ToDo = 'ToDo',
	Doing = 'Doing',
	Done = 'Done',
}
