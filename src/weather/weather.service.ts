import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {CityService} from "../city/city.service";
import {WeatherDto} from "./dto/weather.dto";
import {City} from "../city/city.entity";
import {Weather} from "./weather.entity";

@Injectable()
export class WeatherService {
    constructor(
        @Inject(forwardRef(() => CityService)) private cityService: CityService,
    ) {
    }

    async addWeather(newWeather: WeatherDto, cityId: string): Promise<Weather> {
        const city = await City.findOne({
            relations: ['weather'],
            where: {
                id: cityId,
            },
        });

        await Weather.delete({city: {id: cityId}})

        const weather = new Weather();
        weather.temp = newWeather.temp;
        weather.tempMax = newWeather.tempMax;
        weather.tempMin = newWeather.tempMin;
        weather.tempSensed = newWeather.tempSensed;
        weather.wind = newWeather.wind;
        weather.rain = newWeather.rain;
        weather.snow = newWeather.snow;
        weather.short = newWeather.short;
        weather.desc = newWeather.desc;
        weather.clouds = newWeather.clouds;
        weather.humidity = newWeather.humidity;
        weather.pressure = newWeather.pressure;
        weather.time = newWeather.time;
        weather.timezone = newWeather.timezone;
        weather.city = city;

        await weather.save();

        return weather;
    }
}
