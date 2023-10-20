import { createConnection } from './services/db';
import app from './app';

// database connection
createConnection();

// run server
app.listen(app.get('PORT'), () => console.log('Running on port ' + app.get('PORT')));