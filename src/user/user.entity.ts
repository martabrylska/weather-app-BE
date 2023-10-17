import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {City} from "../city/city.entity";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 20,
    })
    name: string;

    @Column({
        length: 20,
    })
    hashPass: string;

    @Column({
        length:20,
        default: '',
    })
    token: string;

    @Column({
        length: 1,
    })
    units: string;

    @OneToMany(type => City, entity => entity.user)
    cities: City[];

}