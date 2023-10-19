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
        length: 200,
    })
    hashPass: string;

    @Column({
        default: null,
        nullable: true,
    })
    currentTokenId: string | null;

    @Column({
        length: 8,
    })
    units: string;

    @OneToMany(type => City, entity => entity.user)
    cities: City[];

}