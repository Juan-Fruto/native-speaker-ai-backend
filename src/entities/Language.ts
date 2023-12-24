import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne, 
} from 'typeorm';
import { TLanguage } from '../services/textToSpeech/voices/voiceTypes';


@Entity()
export class Language extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: 'uuid';

  @Column({type: 'varchar', length: 20})
  language: TLanguage;
}