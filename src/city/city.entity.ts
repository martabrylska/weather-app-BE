import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";


@Entity()
export class City extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "float",
        precision: 9,
        scale: 6,
    })
    lat: number;

    @Column({
        type: "float",
        precision: 9,
        scale: 6,
    })
    lon: number;

    @Column({
        length: 200,
    })
    name: string;

    @Column({
        length: 100,
    })
    state: string;

    @Column({
        length: 4,
    })
    country: string;

    @ManyToOne(type => User, entity => entity.cities)
    @JoinColumn()
    user: User;


}