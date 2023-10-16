import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CityModule } from './city/city.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {config} from "./config/config";

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mysql",
    "host": config.dbHost,
    "port": 3306,
    "username": config.dbUser,
    "password": config.dbPassword,
    "database": config.dbDatabase,
    "entities": ["dist/**/**.entity{.ts,.js}"],
    "bigNumberStrings": false,
    "logging": true,
    "synchronize": true
  }),
    UserModule,
    CityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
