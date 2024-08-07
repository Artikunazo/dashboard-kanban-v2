import {ApiSubtask, Subtask} from '../models/subtask_models';

export function subtaskToApiSubtask(subtask: Subtask): ApiSubtask {
	return {
		subtaskId: subtask.id ?? null,
		titleSubtask: subtask.title,
		done: subtask.isDone ? 1 : 0,
		taskId: subtask.taskId ?? null,
	};
}

export function apiSubtaskToSubtask(apiSubtask: ApiSubtask): Subtask {
	return {
		id: apiSubtask.subtaskId ?? null,
		title: apiSubtask.titleSubtask,
		isDone: apiSubtask.done === 1 ? true : false,
		taskId: apiSubtask.taskId,
	};
}

export function apiSubtasksToSubtasks(apiSubtasks: ApiSubtask[]): Subtask[] {
	return apiSubtasks.map((apiSubtask) => apiSubtaskToSubtask(apiSubtask));
}
