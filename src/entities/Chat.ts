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

<<<<<<< HEAD
  @Column({type: 'varchar', length: 20})
=======
  @Column({type: 'varchar', length: 40})
>>>>>>> 969ef08d0f9ae856070fa45bdb570871615ed4e5
  chatName : string;

  @Column({type: 'varchar', length: 80})
  userRole : string;

  @Column({type: 'varchar', length: 80})
  botRole : string;

<<<<<<< HEAD
  @Column({type: 'varchar', length: 250})
=======
  @Column({type: 'varchar', length: 200})
>>>>>>> 969ef08d0f9ae856070fa45bdb570871615ed4e5
  context : string;

  @Column({type: 'timestamp'})
  createdAt : Date;

  @ManyToOne(() => User, (user) => user.chats)
  user : User

  @OneToMany(() => Message, (message) => message.chat)
  messages : Message[]
}