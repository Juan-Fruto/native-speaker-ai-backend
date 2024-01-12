import { Request, Response, NextFunction, Router } from 'express';
import { 
  messageArrayHandler,
  messageStringHandler,
  textToSpeech,
  speechToText
} from '../controllers/chat';
import {
  messageValidatios,
  messageArrayValidatios,
  messageStringValidatios 
} from '../middlewares/validators/chat';

const router = Router();

router.post('/message_array',
// (req: Request, res: Response, next: NextFunction) => {
//   console.log(req.headers);
//   console.log(req.body);
//   next();
// },
messageValidatios, messageArrayValidatios, messageArrayHandler);

router.post('/message_string', messageValidatios, messageStringValidatios, messageStringHandler);

router.post('/text_to_speech', textToSpeech);

router.post('/speech_to_text', speechToText);

router.post('/translate');

export default router;