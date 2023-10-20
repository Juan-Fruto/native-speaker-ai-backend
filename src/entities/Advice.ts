import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity()
export class Advice extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id : string

  @Column({type: 'varchar', length: 100})
  content : string
  
}