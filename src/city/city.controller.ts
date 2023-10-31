import {Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {CityService} from "./city.service";
import {CityDto} from "./dto/city.dto";
import {GetCitiesResponse, GetOneCityResponse, RemoveCityResponse} from "../types/city";
import {UserObj} from "../decorators/user-obj.decorator";
import {AuthGuard} from "../auth/auth.guard";
import {UserPayload} from "../types/user";
import {FiltersDto} from "./dto/filters.dto";


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
        @UserObj() user: UserPayload
    ): Promise<GetCitiesResponse> {

        return this.cityService.listCitiesForUser(user.username);
    }

    @Delete('/remove/:cityId')
    @UseGuards(AuthGuard)
    removeCity(
        @Param('cityId') cityId: string
    ): Promise<RemoveCityResponse> {
        return this.cityService.removeCity(cityId);
    }

    @Get('/get-one')
    @UseGuards(AuthGuard)
    getOneCity(
        @Query("lat") lat: string,
        @Query("lon") lon: string,
        @UserObj() user: UserPayload
    ): Promise<GetOneCityResponse> {
        return this.cityService.getOneCity(Number(lat), Number(lon), user);
    }

    @Patch('/filter')
    @UseGuards(AuthGuard)
    filterCities(
        @Body() filters: FiltersDto,
        @UserObj() user: UserPayload
    ) {
        return this.cityService.filterCities(filters, user.username);
    }


}
