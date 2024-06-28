import {Subtask} from './subtask_models';

export interface Task {
	id?: number;
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
	subtasks: Subtask[];
}

export enum TaskStatus {
	ToDo = 'ToDo',
	Doing = 'Doing',
	Done = 'Done',
}
