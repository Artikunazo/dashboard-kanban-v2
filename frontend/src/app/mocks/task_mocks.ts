import {Task} from '../models/tasks_models';

export const taskFake: Task = {
	id: 1,
	title: 'Task test',
	description: 'Task descxriptiuon fake',
	statusId: 1,
	boardId: 1,
	countDoneSubtasks: 1,
	status: 'ToDo',
	totalSubtasks: 1,
};
