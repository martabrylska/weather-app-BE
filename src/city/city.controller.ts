import {Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {CityService} from "./city.service";
import {AuthGuard} from "../auth/auth.guard";
import {UserObj} from "../decorators/user-obj.decorator";
import {FiltersDto} from "./dto/filters.dto";
import {CityDto} from "./dto/city.dto";
import {GetCitiesResponse, GetOneCityResponse, RemoveCityResponse} from "../types/city";
import {UserPayload} from "../types/user";
import {City} from "./city.entity";

@Controller('city')
export class CityController {
    constructor(
        @Inject(CityService) private cityService: CityService,
    ) {
    }

    @Post('/add')
    @UseGuards(AuthGuard)
    addCity(
        @Body() newCity: CityDto,
        @UserObj() user: UserPayload,
    ): Promise<GetOneCityResponse> {
        return this.cityService.addCity(newCity, user.username);
    }

    @Get('/user')
    @UseGuards(AuthGuard)
    listCitiesForUser(
        @UserObj() user: UserPayload,
    ): Promise<GetCitiesResponse> {
        return this.cityService.listCitiesForUser(user.username);
    }

    @Delete('/remove/:cityId')
    @UseGuards(AuthGuard)
    removeCity(
        @Param('cityId') cityId: string,
    ): Promise<RemoveCityResponse> {
        return this.cityService.removeCity(cityId);
    }

    @Get('/get-one')
    @UseGuards(AuthGuard)
    getOneCity(
        @Query("lat") lat: number,
        @Query("lon") lon: number,
        @UserObj() user: UserPayload,
    ): Promise<GetOneCityResponse> {
        return this.cityService.getOneCity(lat, lon, user);
    }

    @Patch('/filter')
    @UseGuards(AuthGuard)
    filterCities(
        @Body() filters: FiltersDto,
        @UserObj() user: UserPayload,
    ): Promise<City[]> {
        return this.cityService.filterCities(filters, user.username);
    }


}
