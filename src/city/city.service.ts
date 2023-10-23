import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {CityDto} from "./dto/city.dto";
import {AddCityResponse, GetCitiesResponse, GetOneCity, GetOneCityResponse, RemoveCityResponse} from "../types/city";
import {City} from "./city.entity";
import {UserService} from "../user/user.service";
import {UserPayload} from "../types/user";

@Injectable()
export class CityService {
    constructor(
        @Inject(forwardRef(() => UserService)) private userService: UserService,
    ) {
    }

    filter(city: City): GetOneCity {
        const {id, name, state, country, lat, lon} = city;
        return {id, name, state, country, lat, lon}

    }

    async _validate(city: CityDto): Promise<boolean> {
        const {lat, lon, country, name, state} = city;

        return !(
            typeof lat !== "number"
            || typeof lon !== "number"
            || typeof name !== "string"
            || typeof state !== "string"
            || typeof country !== "string"
            || name.length > 200
            || state.length > 100
            || country.length > 4
        );
    }

    async addCity(newCity: CityDto, name): Promise<AddCityResponse> {
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
        city.user = await this.userService.getOneUser(name);

        await city.save();

        return {
            isSuccess: true,
        }
    }

    async listCitiesForUser(name: string): Promise<GetCitiesResponse> {
        const user = await this.userService.getOneUser(name);
        if (!user) {
            throw new Error('User not found!');
        }
        const cities = await City.find({
            where: {
                user: {
                    id: user.id,
                }
            },
        });
        console.log(cities);
        return cities;
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

    async getOneCity(lat: number, lon: number, user: UserPayload): Promise<GetOneCityResponse> {
        const foundUser = await this.userService.getOneUser(user.username);
        console.log(foundUser, lat, lon);

        const city = await City.findOne({
            where: {
                lat,
                lon,
                user: {
                    id: foundUser.id,
                }
            }
        })
        console.log(city);
        return city ? this.filter(city) : {
            isSuccess: false,
        };
    }
}
