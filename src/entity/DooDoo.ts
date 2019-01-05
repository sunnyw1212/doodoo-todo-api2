import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { MinLength } from 'class-validator';
import { Account } from './Account';

@Entity()
export class DooDoo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  @MinLength(5, {
    message: 'Title must be longer than 5 characters',
  })
  title: string;

  @Column('text')
  body: string;

  @Column({ nullable: false })
  created_by: number;

  @Index()
  @Column({ nullable: false })
  assigned_to: number;

  @CreateDateColumn({ nullable: false, type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(type => Account, account => account.assigned_doodoos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'assigned_to' })
  assigned_to_account: Account;

  @ManyToOne(type => Account, account => account.created_doodoos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'created_by' })
  created_by_account: Account;
}
