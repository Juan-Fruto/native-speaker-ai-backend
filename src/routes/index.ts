import { Router } from 'express';
import {
  helloHandler,
  aboutHandler
} from '../controllers/index';

const router = Router();

router.get('/', helloHandler);

router.get('/about', aboutHandler);

export default router;