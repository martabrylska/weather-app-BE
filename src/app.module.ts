import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [UserModule, CityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
