export interface AddCityResponse {
    isSuccess: boolean;
}

export interface RemoveCityResponse {
    isSuccess: boolean;
}

export type GetCitiesResponse = GetOneCity[];

export type GetOneCityResponse = GetOneCity | {
    isSuccess: false;
}

export interface GetOneCity {
    id: string;
    lat: number;
    lon: number;
    name: string;
    state: string;
    country: string;
}
