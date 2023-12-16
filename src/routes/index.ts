import { Router } from 'express';
import {
  helloHandler,
  aboutHandler
} from '../controllers/index';
<<<<<<< HEAD
import 'dotenv/config';
=======
>>>>>>> 969ef08d0f9ae856070fa45bdb570871615ed4e5

const router = Router();

router.get('/', helloHandler);

router.get('/about', aboutHandler);

<<<<<<< HEAD
// router.get('/test', async (req, res) => {
//   const r = process.env.DB_NAME;
//   res.json({"message": r})
// })

=======
>>>>>>> 969ef08d0f9ae856070fa45bdb570871615ed4e5
export default router;