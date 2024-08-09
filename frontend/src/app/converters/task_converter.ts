import {ApiTask, Task} from '../models/tasks_models';

export function ApiTaskToTask(apiTask: ApiTask): Task {
	return {
		id: apiTask.taskId,
		title: apiTask.taskTitle,
		description: apiTask.taskDescription,
		statusId: apiTask.statusId,
		boardId: apiTask.boardId,
		countDoneSubtasks: apiTask.totalIsDoneSubtasks,
		status: apiTask.statusName,
		totalSubtasks: apiTask.totalSubtasks,
	};
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
		taskId: +task.id,
		totalIsDoneSubtasks: task.countDoneSubtasks ?? 0,
		totalSubtasks: +task.totalSubtasks,
		statusName: task.status,
	};
}

export function taskWithNewStatusToApiTask(taskToUpdate: {
	task: Task;
	status: string;
}): ApiTask {
	return {
		taskTitle: taskToUpdate.task.title,
		taskDescription: taskToUpdate.task.description,
		statusId: taskToUpdate.task.statusId,
		boardId: taskToUpdate.task.boardId,
		taskId: +taskToUpdate.task.id,
		totalIsDoneSubtasks: taskToUpdate.task.countDoneSubtasks ?? 0,
		statusName: taskToUpdate.status,
		totalSubtasks: taskToUpdate.task.totalSubtasks,
	};
}
