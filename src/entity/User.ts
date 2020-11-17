import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, BeforeInsert} from "typeorm";


@Entity({name: "users"})
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "varchar",
        length: 150
    })
    fName: string;

    @Column({
        type: "varchar",
        length: 150
    })
    lName: string;

    @Column()
    age: number;

    @Column({
        unique: true,
        nullable: false
    })
    email: string;

    @Column()
    password: string;

    @Column({
        unique: true
    })
    username: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    toJSON(){
        return {...this, password: undefined}
    }

    @BeforeInsert()
    lowercaseEmail(){
        this.email = this.email.toLowerCase()
    }
}
