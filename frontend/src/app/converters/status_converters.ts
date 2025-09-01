import {ApiStatus, Status} from '../models/status_models';

export function ApiStatusToStatus(apiStatus: ApiStatus): Status {
	return {
		name: apiStatus.statusName,
		id: parseInt(apiStatus.statusId),
	};
}

export function ApiStatusesToStatuses(apiStatus: ApiStatus[]): Status[] {
	return apiStatus.map((apiStatus) => ApiStatusToStatus(apiStatus));
}
