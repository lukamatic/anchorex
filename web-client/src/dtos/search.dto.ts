export default interface searchDto {
	searchText: string;
	checkIn: string;
	checkOut: string;
	sort: sortDto | null;
	filter: filterDto | null;
	pagination: {
		offset: number;
		limit: number;
	};
	type: string;
}

export interface filterDto {
	score: {
		min: number;
		max: number;
	};
	locations: string[];
	numberOfSingleRooms: [number, number];
	numberOfDoubleRooms: [number, number];
	numberOfFourRooms: [number, number];
	selectedEngineCount: [number, number];
	selectedMaxSpeed: [number, number];
	cancellationPercentage: [number, number];
}

export const emptyFilterDto = {
	score: {
		min: 0,
		max: 100,
	},
	locations: [],
	numberOfSingleRooms: [0, 100],
	numberOfDoubleRooms: [0, 100],
	numberOfFourRooms: [0, 100],
	selectedEngineCount: [0, 100],
	selectedMaxSpeed: [0, 100],
	cancellationPercentage: [0, 100],
};
export interface sortDto {
	field: string;
	order: [-1, 1];
}

export interface searchResponseDto {
	list: any[];
	size: number;
}
