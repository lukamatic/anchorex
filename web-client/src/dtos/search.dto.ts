export default interface searchDto {
    searchText: string;
    checkIn: string;
    checkOut: string;
    sort: sortDto | null;
    filter: filterDto | null;
    pagination: {
        offset: number,
        limit: number,
    };
    type: string;
}

export interface filterDto {
    score: {
        min: number,
        max: number
    },
    locations: string[]
}
export interface sortDto {
    field: string;
    order: [-1, 1]
}

export interface searchResponseDto {
    list: any[],
    size: number
}