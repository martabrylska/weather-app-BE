import {Body, Controller, Inject, Param, Post, UseGuards} from '@nestjs/common';
import {WeatherService} from "./weather.service";
import {AuthGuard} from "../auth/auth.guard";
import {WeatherDto} from "./dto/weather.dto";
import {Weather} from "./weather.entity";

@Controller('weather')
export class WeatherController {
    constructor(
        @Inject(WeatherService) private weatherService: WeatherService,
    ) {
    }

    @Post('/add/:cityId')
    @UseGuards(AuthGuard)
    addWeather(
        @Body() newWeather: WeatherDto,
        @Param('cityId') cityId: string,
    ): Promise<Weather> {
        return this.weatherService.addWeather(newWeather, cityId);
    }
}
