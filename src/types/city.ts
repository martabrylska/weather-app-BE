export interface AddCityResponse {
    isSuccess: boolean;
}

export interface RemoveCityResponse {
    isSuccess: boolean;
}

export type GetCitiesResponse = GetOneCity[];

export interface GetOneCity {
    id: string;
    lat: number;
    lon: number;
    name: string;
    state: string;
    country: string;
}
