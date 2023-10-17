import {forwardRef, Module} from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import {UserModule} from "../user/user.module";

@Module({
  imports: [
    forwardRef(() => UserModule),
  ],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
