import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Message } from './Message';

type origin = "human" | "bot";

@Entity()
export class MessageOrigin extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id : string;

  @Column({type: 'varchar', length: 5})
  origin : origin;

  @OneToMany(() => Message, (message) => message.origin)
  messages : Message[];
  
}