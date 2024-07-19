import {ApiSubtask, Subtask} from './subtask_models';

export interface Task {
	id: string | number;
	title: string;
	description: string;
	statusId: number;
	boardId: number;
	subtasks: Subtask[];
}

export interface ApiTask {
	taskId: number;
	taskTitle: string;
	taskDescription: string;
	statusId: number;
	boardId: number;
	subtasks: ApiSubtask[];
}

export enum TaskStatus {
	ToDo = 'ToDo',
	Doing = 'Doing',
	Done = 'Done',
}

export interface ApiTaskOverwivew {
	idTask: number;
	taskName: string;
	totalSubtasks: number;
	statusName: string;
	totalIsDoneSubtasks: number;
}

export interface TaskOverview {
	id: string | number;
	title: string;
	countSubtasks: number;
	status: string;
	countDoneSubtasks: number;
}
