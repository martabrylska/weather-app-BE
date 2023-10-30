import {forwardRef, Module} from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import {UserModule} from "../user/user.module";
import {WeatherModule} from "../weather/weather.module";

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => WeatherModule),
  ],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
