import { DataSource } from "typeorm";
import { User } from '../entities/User';
import { Chat } from '../entities/Chat';
import { Message } from '../entities/Message';
import { MessageOrigin } from '../entities/MessageOrigin';
import { Advice } from '../entities/Advice';
import 'dotenv/config';

export const appDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Chat, Message, MessageOrigin, Advice], // tables
  synchronize: true,
  logging: false // show the queries in the console
});

export const createConnection = async () => {
  try {
    await appDataSource.initialize();
    console.log(`connected to the ${process.env.DB_NAME}`)
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
  }
}