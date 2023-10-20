import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Chat } from './Chat';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id : string

  @Column({type: 'varchar', length: 50})
  name : string

  @Column({type: 'varchar', length: 40, unique: true})
  email : string

  @Column({type: 'varchar', length: 40})
  password : string

  @OneToMany(() => Chat, (chat) => chat.user)
  chats : Chat[]
}