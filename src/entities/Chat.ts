import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { User } from './User';
import { Message } from './Message';

@Entity()
export class Chat extends BaseEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id : string;

  @Column({type: 'varchar', length: 40})
  chatName : string;

  @Column({type: 'varchar', length: 80})
  userRole : string;

  @Column({type: 'varchar', length: 80})
  botRole : string;

  @Column({type: 'varchar', length: 200})
  context : string;

  @Column({type: 'timestamp'})
  createdAt : Date;

  @ManyToOne(() => User, (user) => user.chats)
  user : User

  @OneToMany(() => Message, (message) => message.chat)
  messages : Message[]
}