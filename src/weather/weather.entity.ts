import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {City} from "../city/city.entity";

@Entity()
export class Weather extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "int",
    })
    time: number;

    @Column({
        type: "decimal",
        precision: 5,
        scale: 2,
    })
    temp: number;

    @Column({
        type: "decimal",
        precision: 5,
        scale: 2,
    })
    tempMax: number;

    @Column({
        type: "decimal",
        precision: 5,
        scale: 2,
    })
    tempMin: number;

    @Column({
        type: "decimal",
        precision: 5,
        scale: 2,
    })
    tempSensed: number;

    @Column({
        type: "tinyint",
    })
    humidity: number;

    @Column({
            type: "smallint",
        })
    pressure: number;

    @Column({
        type: "decimal",
        precision: 5,
        scale: 2,
    })
    wind: number;

    @Column({
        type: "tinyint",
    })
    clouds: number;

    @Column({
            type: "decimal",
            precision: 5,
            scale: 2,
        }
    )
    rain: number;

    @Column({
        type: "decimal",
        precision: 5,
        scale: 2,
    })
    snow: number;

    @Column({
        length: 100,
    })
    desc: string;

    @Column({
        length: 50,
    })
    short: string;

    @Column({
        type: "int",
    })
    timezone: number;

    @OneToOne(type => City, entity => entity.weather, {
        onDelete: "CASCADE",
    })
    @JoinColumn()
    city: City;
}