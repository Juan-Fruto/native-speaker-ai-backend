import { Handler } from 'express';
import OpenAI from 'openai';
import { ChatCompletionStrategy } from '../libs/openai/chat/ChatCompletionStrategy';
const ElevenLabs = require("elevenlabs-node");
import {setVoice} from '../utils/setVoice';
import { randomUUID } from 'crypto';
import {Language} from '../services/textToSpeech/voices/voiceTypes';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_APIKEY
});

export const messageArrayHandler: Handler = async (req, res) => {

  const { payload } = req.body; // string []
  const { language }: { language: Language } = req.body;
  const { gender }: { gender: "female" | "male" }= req.body;
  let gptResponse: string;
  const voiceId = setVoice(gender);

  const chatCompletion = new ChatCompletionStrategy(openai, payload, "gpt-4-1106-preview");

  await chatCompletion.run();

  // get openai response
  gptResponse = chatCompletion.getResponse();

  // Audio generation
  const voice = new ElevenLabs(
    {
      apiKey:  process.env.ELEVEN_LABS_APIKEY, // API key from Elevenlabs
      voiceId: voiceId, // Michael´s Voice ID
    }
  );
  
  // send request to Elevenlabs
  const voiceResponse = await voice.textToSpeechStream({
    // required Parameters
    textInput:       gptResponse,               // the text to convert to speech
    // optional Parameters
    stability:       0.5,                       // the stability for the converted speech
    similarityBoost: 0.5,                       // the similarity boost for the converted speech
    modelId:         language == "english" ? "eleven_turbo_v2": "eleven_multilingual_v2",  // the ElevenLabs Model ID
    style:           0,                         // the style exaggeration for the converted speech
    responseType:    "stream",                  // the streaming type (arraybuffer, stream, json)
    speakerBoost:    true                       // the speaker boost for the converted speech
  });
  
  // headers for the audio
  res.set({
    'Content-Type': 'audio/mp3',
    'Content-Disposition': `attachment; filename=speech_${randomUUID()}.mp3`
  });
  
  // send the audio while recieving the axios response
  voiceResponse.pipe(res, { end: false });

  res.write(JSON.stringify(gptResponse));
  voiceResponse.on('end', () => res.end());
   
}

// implementation for the assistant strategy
export const messageStringHandler: Handler = async (req, res) => {
  //
}

// only for development
export const textToSpeech: Handler = async (req, res) => {
  // 
}

export const speechToText: Handler = async (req, res) => {
  //
}