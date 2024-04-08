import { createDBConnection, appDataSource } from './services/db';
import {createRedisConnection} from './services/redis';
import app from './app';

// database connection
createDBConnection();

// redis connection
createRedisConnection();

// run server
app.listen(app.get('PORT'), () => console.log('Running on port ' + app.get('PORT')));