import express, { Application } from 'express';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import indexRouter from './routes/index';
import chatRouter from './routes/chat';
import "reflect-metadata";

export const app: Application = express();

app.use(express.json());

// third party middlewares

app.use(cors());
app.use(morgan('dev'));

// routes

app.use('/', indexRouter);
app.use('/chat', chatRouter);
app.use((req, res) => res.status(404).json({messge: 'source not found'}));

// global variables

app.set('PORT', process.env.PORT || 80);

export default app;