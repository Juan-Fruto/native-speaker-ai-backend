import { Router } from 'express';
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

router.post('/message_array', messageValidatios, messageArrayValidatios, messageArrayHandler);

router.post('/message_string', messageValidatios, messageStringValidatios, messageStringHandler);

router.post('/text_to_speech', textToSpeech);

router.post('/speech_to_text', speechToText);

router.post('/translate');

export default router;