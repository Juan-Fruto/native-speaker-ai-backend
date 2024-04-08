jest.useFakeTimers();

import { DataSource } from 'typeorm';
import { User } from '../src/entities/User';
import { Chat } from '../src/entities/Chat';
import { Message } from '../src/entities/Message';
import { MessageOrigin } from '../src/entities/MessageOrigin';
import { Advice } from '../src/entities/Advice';
import { Language } from "../src/entities/Language"; 
import 'dotenv/config';

// Singleton class
export class TestHelper {

  private static _instance: TestHelper;
  private dbConnect!: DataSource;

  private constructor(){}

  public static get instance(): TestHelper {
    if(!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  public async setupDB() {
    this.dbConnect = new DataSource({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3307,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Chat, Message, MessageOrigin, Advice, Language], // tables
      synchronize: true,
    });
    this.dbConnect.initialize();
  }

  public async teardownTestDB() {
    this.dbConnect.destroy();
  }

}