import { Handler } from 'express';
import OpenAI from 'openai';
import { ChatCompletionStrategy } from '../libs/openai/chat/ChatCompletionStrategy';
import { TextToSpeech } from '../services/textToSpeech/TextToSpeech';
const ElevenLabs = require("elevenlabs-node");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_APIKEY
});

export const messageHandler: Handler = async (req, res) => {

  type PayloadDataType = "Array of strings" | "string" | undefined;

  const { payload } = req.body; // string | string []
  const { payload_datatype }: { payload_datatype: PayloadDataType} = req.body; // string []
  const { language } = req.body; // type language
  const { gender } = req.body; // type male | female
  let gptResponse: string;

  if(payload_datatype === "Array of strings") {
    const chatCompletion = new ChatCompletionStrategy(openai, payload, "gpt-4-1106-preview");

    await chatCompletion.run();

    gptResponse = chatCompletion.getResponse();

    // Audio generation
     const voice = new ElevenLabs(
      {
        apiKey:  process.env.ELEVEN_LABS_APIKEY, // API key from Elevenlabs
        voiceId: process.env.ELEVEN_LABS_FEMALE, // Michael´s Voice ID
      }
    );
    
    // Send request to Elevenlabs
    const voiceResponse = await voice.textToSpeechStream({
      // Required Parameters
      textInput:       gptResponse,               // The text to convert to speech
      // Optional Parameters
      stability:       0.5,                       // The stability for the converted speech
      similarityBoost: 0.5,                       // The similarity boost for the converted speech
      modelId:         "eleven_multilingual_v2",  // The ElevenLabs Model ID
      style:           0,                         // The style exaggeration for the converted speech
      responseType:    "stream",                  // The streaming type (arraybuffer, stream, json)
      speakerBoost:    true                       // The speaker boost for the converted speech
    });
    
    // headers for the audio
    res.set({
      'Content-Type': 'audio/mp3',
      'Content-Disposition': 'attachment; filename=speech_uuid.mp3'
    });
    
    // send the audio while recieving the axios response
    voiceResponse.pipe(res, { end: false });

    res.write(JSON.stringify(gptResponse));
    voiceResponse.on('end', () => res.end());
  }

  if(payload_datatype === "string") {} // implementation for the assistant strategy
 
}

export const textToSpeech: Handler = async (req, res) => {
  // if the language is english then

}

export const speechToText: Handler = async (req, res) => {
  //
}