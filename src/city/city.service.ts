import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {CityDto} from "./dto/city.dto";
import {AddCityResponse, GetCitiesResponse, RemoveCityResponse} from "../types/city";
import {City} from "./city.entity";
import {UserService} from "../user/user.service";

@Injectable()
export class CityService {
    constructor(
        @Inject(forwardRef(() => UserService)) private userService: UserService,
    ) {
    }

    async _validate(city: CityDto): Promise<boolean> {
        const {lat, lon, country, name, state, userId} = city;

        // const user = await this.userService.getOneUser(userId);
        return !(
            typeof lat !== "number"
            || typeof lon !== "number"
            || typeof name !== "string"
            || typeof state !== "string"
            || typeof country !== "string"
            || name.length > 200
            || state.length > 100
            || country.length > 4
            || userId === ""
            // || !user
        );
    }

    async addCity(newCity: CityDto): Promise<AddCityResponse> {
        if (!(await this._validate(newCity))) {
            return {
                isSuccess: false,
            }
        }
        const city = new City();
        city.lat = newCity.lat;
        city.lon = newCity.lon;
        city.name = newCity.name;
        city.state = newCity.state;
        city.country = newCity.country;

        await city.save();

        const user = await this.userService.getOneUser(newCity.userId);
        city.user = user;
        return {
            isSuccess: true,
        }
    }

    async listCitiesForUser(userId: string): Promise<GetCitiesResponse> {
        const user = await this.userService.getOneUser(userId);
        if (!user) {
            throw new Error('User not found!');
        }
        return City.find({
            where: {user: {
                    id: userId,
                }},
        });
    }

    async removeCity(cityId: string): Promise<RemoveCityResponse> {
        const city = await City.findOne({
            where: {
                id: cityId
            },
        })

        if (!city) {
            return {
                isSuccess: false,
            }
        }

        await City.delete({
            id: cityId,
        });
        return {
            isSuccess: true,
        }
    }
}
