import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {CityModule} from "../city/city.module";

@Module({
  imports: [
    forwardRef(() => CityModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
