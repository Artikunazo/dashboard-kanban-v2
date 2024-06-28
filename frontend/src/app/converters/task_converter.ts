import {ApiTask, Task} from '../models/tasks_models';

export function ApiTaskToTask(apiTask: ApiTask): Task {
	return {
		...apiTask,
		id: apiTask.taskId,
		title: apiTask.taskTitle,
		description: apiTask.taskDescription,
	};
}
