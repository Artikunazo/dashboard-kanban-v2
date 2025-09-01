export interface Task {
	id: string | number;
	title: string;
	description: string;
	statusId: number;
	boardId: number;
	countDoneSubtasks: number | null;
	status?: string;
	totalSubtasks: number;
}

export interface ApiTask {
	taskId: number;
	taskTitle: string;
	taskDescription: string;
	statusId: number;
	boardId: number;
	totalIsDoneSubtasks: number;
	statusName?: string;
	totalSubtasks: number;
}

export enum TaskStatus {
	ToDo = 'ToDo',
	Doing = 'Doing',
	Done = 'Done',
}
