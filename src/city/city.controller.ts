import {Body, Controller, Delete, Get, Inject, Param, Post} from '@nestjs/common';
import {CityService} from "./city.service";
import {CityDto} from "./dto/city.dto";
import {AddCityResponse, GetCitiesResponse, RemoveCityResponse} from "../types/city";

@Controller('city')
export class CityController {
    constructor(
        @Inject(CityService) private cityService: CityService,
    ) {
    }

    @Post('/add')
    addCity(
        @Body() newCity: CityDto
    ): Promise<AddCityResponse> {
        return this.cityService.addCity(newCity);
    }

    @Get('/user/:userId')
    listCitiesForUser(
        @Param() userId: string
    ): Promise<GetCitiesResponse> {
        return this.cityService.listCitiesForUser(userId);
    }

    @Delete('/remove/:cityId')
    removeCity(
        @Param() cityId: string
    ): Promise<RemoveCityResponse> {
        return this.cityService.removeCity(cityId);
    }


}
