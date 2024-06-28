export interface Subtask {
	id?: number;
	title: string;
	isDone: boolean;
	taskId: number | null;
}

export interface ApiSubtask {
	subtaskId: number;
	titleSubtask: string;
	done: boolean;
	taskId: number;
}
