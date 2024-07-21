import {ApiSubtask, Subtask} from '../models/subtask_models';
import {
	ApiTask,
	ApiTaskOverwivew,
	Task,
	TaskOverview,
} from '../models/tasks_models';
import {apiSubtaskToSubtask, subtasktoApiSubtask} from './subtask_converters';

export function ApiTaskToTask(apiTask: ApiTask): Task {
	const subtasks: Subtask[] = apiTask.subtasks.map((subtask: ApiSubtask) =>
		apiSubtaskToSubtask(subtask),
	);

	return {
		id: apiTask.taskId,
		title: apiTask.taskTitle,
		description: apiTask.taskDescription,
		statusId: apiTask.statusId,
		boardId: apiTask.boardId,
		subtasks,
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
	};
}

export function taskOverviewToApiTaskOverview(taskOverview: {
	task: TaskOverview;
	status: string;
}): ApiTaskOverwivew {
	return {
		idTask: +taskOverview.task.id,
		taskName: taskOverview.task.title,
		totalSubtasks: taskOverview.task.countSubtasks,
		statusName: taskOverview.status,
		totalIsDoneSubtasks: taskOverview.task.countDoneSubtasks,
	};
}
