import {BoardEffects} from './board_effects';
import {StatusEffects} from './status_effects';
import {SubtaskEffects} from './subtask_effects';
import {TasksEffects} from './tasks_effects';
import {ThemeEffects} from './theme_effects';

export const effects: any[] = [
	BoardEffects,
	TasksEffects,
	ThemeEffects,
	StatusEffects,
	SubtaskEffects,
];

export * from './board_effects';
export * from './status_effects';
export * from './subtask_effects';
export * from './tasks_effects';
export * from './theme_effects';
