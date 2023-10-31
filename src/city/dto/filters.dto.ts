export class FiltersDto {
    sort: 'time' | 'temp' | 'humidity' | 'pressure' | 'wind' | 'clouds' | 'rain' | 'snow' | 'short' | 'timezone';
    country: string;
    mainDesc: string;
}