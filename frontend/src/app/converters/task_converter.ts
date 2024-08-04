import { ApiSubtask, Subtask } from '../models/subtask_models';
import {
  ApiTask,
  ApiTaskOverwivew,
  Task,
  TaskOverview,
} from '../models/tasks_models';
import { apiSubtaskToSubtask, subtasktoApiSubtask } from './subtask_converters';

export function ApiTaskToTask(apiTask: ApiTask): Task {
	let subtasks: Subtask[] = [];

	if (apiTask.subtasks) {
		subtasks = apiTask.subtasks.map((subtask: ApiSubtask) =>
			apiSubtaskToSubtask(subtask),
		);
	}

	return {
		id: apiTask.taskId,
		title: apiTask.taskTitle,
		description: apiTask.taskDescription,
		statusId: apiTask.statusId,
		boardId: apiTask.boardId,
		subtasks,
		countDoneSubtasks: apiTask.totalIsDoneSubtasks,
		status: apiTask.statusName,
	};
}

export function ApiTaskOverviewToTaskOverview(
	apiTaskOverwivew: ApiTaskOverwivew,
): TaskOverview {
	return {
		id: apiTaskOverwivew.idTask.toString(),
		title: apiTaskOverwivew.taskName,
		countSubtasks: apiTaskOverwivew.totalSubtasks,
		status: apiTaskOverwivew.statusName,
		countDoneSubtasks: apiTaskOverwivew.totalIsDoneSubtasks,
	};
}

export function ApiTasksOverviewToTasksOverview(
	apiTasksOverview: ApiTaskOverwivew[],
): TaskOverview[] {
	return apiTasksOverview.map((apiTaskOverview) =>
		ApiTaskOverviewToTaskOverview(apiTaskOverview),
	);
}

export function apiTasksToTasks(apiTasks: ApiTask[]): Task[] {
	return apiTasks.map((apiTask) => ApiTaskToTask(apiTask));
}

export function taskToApiTask(task: Task): ApiTask {
	const subtasks: ApiSubtask[] = task.subtasks.map((subtask: Subtask) =>
		subtasktoApiSubtask(subtask),
	);

	return {
		taskTitle: task.title,
		taskDescription: task.description,
		statusId: task.statusId,
		boardId: task.boardId,
		taskId: +task.id,
		subtasks,
		totalIsDoneSubtasks: task.countDoneSubtasks ?? 0,
	};
}

export function taskOverviewToApiTaskOverview(taskOverview: {
	task: Task;
	status: string;
}): ApiTaskOverwivew {
	return {
		idTask: +taskOverview.task.id,
		taskName: taskOverview.task.title,
		statusName: taskOverview.status,
		totalIsDoneSubtasks: taskOverview.task.countDoneSubtasks ?? 0,
		totalSubtasks: taskOverview.task.subtasks.length,
	};
}

export function taskWithNewStatusToApiTask(taskToUpdate: {
	task: Task;
	status: string;
}): ApiTask {
	const subtasks: ApiSubtask[] = taskToUpdate.task.subtasks.map(
		(subtask: Subtask) => subtasktoApiSubtask(subtask),
	);

	return {
		taskTitle: taskToUpdate.task.title,
		taskDescription: taskToUpdate.task.description,
		statusId: taskToUpdate.task.statusId,
		boardId: taskToUpdate.task.boardId,
		taskId: +taskToUpdate.task.id,
		subtasks,
		totalIsDoneSubtasks: taskToUpdate.task.countDoneSubtasks ?? 0,
		statusName: taskToUpdate.status,
	};
}
