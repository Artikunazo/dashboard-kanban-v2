import {BoardEffects} from './board_effects';
import {StatusEffects} from './status_effects';
import {TasksEffects} from './tasks_effects';
import {ThemeEffects} from './theme_effects';

export const effects: any[] = [
	BoardEffects,
	TasksEffects,
	ThemeEffects,
	StatusEffects,
];

export * from './board_effects';
export * from './status_effects';
export * from './tasks_effects';
export * from './theme_effects';
