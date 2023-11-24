import { Router } from 'express';
import { messageHandler, textToSpeech, speechToText } from '../controllers/chat';
import { messageValidatios } from '../middlewares/validators/chat';

const router = Router();

router.post('/message', messageValidatios, messageHandler);

router.post('/text_to_speech', textToSpeech);

router.post('/speech_to_text', speechToText);

router.post('/translate');

export default router;