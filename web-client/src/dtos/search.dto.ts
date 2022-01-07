export default interface searchDto {
    searchText: string;
    checkIn: string;
    checkOut: string;
    sort: sortDto;
    filter: filterDto;
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