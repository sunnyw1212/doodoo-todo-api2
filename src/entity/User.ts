import {
  Entity, Index, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { DooDoo } from './DooDoo';
import { UserSummary } from '../types';
@Entity()
@Index(['email_address'], { unique: true })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  @IsEmail()
  email_address: string;

  @Column({ length: 100, nullable: false })
  password_hash: string;

  @Column({ length: 50, nullable: false })
  access_token: string;

  @Column()
  is_doer: boolean = false;

  @Column({ nullable: true })
  assigned_doer: number;

  @OneToMany(type => DooDoo, doodoo => doodoo.assigned_to)
  assigned_doodoos: DooDoo[];

  @OneToMany(type => DooDoo, doodoo => doodoo.created_by)
  created_doodoos: DooDoo[];

  summary(): UserSummary {
    const user_summary: UserSummary = {
      id: this.id,
      email_address: this.email_address,
      access_token: this.access_token,
      is_doer: this.is_doer,
      assigned_doer: this.assigned_doer,
    };
    return user_summary;
  }
}
