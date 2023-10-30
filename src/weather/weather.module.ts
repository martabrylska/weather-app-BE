import {forwardRef, Module} from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import {CityModule} from "../city/city.module";

@Module({
  imports: [
    forwardRef(() => CityModule),
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
  exports: [WeatherService]
})
export class WeatherModule {}
