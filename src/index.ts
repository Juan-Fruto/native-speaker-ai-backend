<<<<<<< HEAD
import { createConnection, appDataSource } from './services/db';
=======
import { createConnection } from './services/db';
>>>>>>> 969ef08d0f9ae856070fa45bdb570871615ed4e5
import app from './app';

// database connection
createConnection();

// run server
app.listen(app.get('PORT'), () => console.log('Running on port ' + app.get('PORT')));