import { Router } from 'express';
import {
  helloHandler,
  aboutHandler
} from '../controllers/index';
import 'dotenv/config';

const router = Router();

router.get('/', helloHandler);

router.get('/about', aboutHandler);

// router.get('/test', async (req, res) => {
//   const r = process.env.DB_NAME;
//   res.json({"message": r})
// })

export default router;