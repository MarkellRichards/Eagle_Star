import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  PROPERTY_MANAGER = "property_manager",
  USER = "user",
}

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 150,
  })
  fName: string;

  @Column({
    type: "varchar",
    length: 150,
  })
  lName: string;

  @Column()
  age: number;

  @Column({
    nullable: false,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toJSON() {
    return { ...this, password: undefined };
  }

  @BeforeInsert()
  lowercaseEmail(): void {
    this.email = this.email.toLowerCase();
  }
}
