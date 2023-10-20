import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Chat } from './Chat';
import { MessageOrigin } from './MessageOrigin';

@Entity()
export class Message extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id : string;

  @Column({type: 'varchar', length: 800})
  content : string;

  @Column({type: 'timestamp'})
  createdAt: Date;
  
  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat : Chat

  @ManyToOne(() => MessageOrigin, (messageOrigin) => messageOrigin.origin, {eager: true}) // eager loading
  origin : MessageOrigin;
}