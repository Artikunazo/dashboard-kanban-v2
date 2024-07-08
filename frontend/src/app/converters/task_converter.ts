import {
	ApiTask,
	ApiTaskOverwivew,
	Task,
	TaskOverview,
} from '../models/tasks_models';

export function ApiTaskToTask(apiTask: ApiTask): Task {
	return {
		id: apiTask.taskId,
		title: apiTask.taskTitle,
		description: apiTask.taskDescription,
		statusId: apiTask.statusId,
		boardId: apiTask.boardId,
		subtasks: apiTask.subtasks,
	};
}

export function ApiTaskOverviewToTaskOverview(
	apiTaskOverwivew: ApiTaskOverwivew,
): TaskOverview {
	return {
		id: apiTaskOverwivew.idTask,
		title: apiTaskOverwivew.taskName,
		countSubtasks: apiTaskOverwivew.totalSubtasks,
		status: apiTaskOverwivew.statusName,
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
	return {
		taskTitle: task.title,
		taskDescription: task.description,
		statusId: task.statusId,
		boardId: task.boardId,
		subtasks: task.subtasks,
	};
}
