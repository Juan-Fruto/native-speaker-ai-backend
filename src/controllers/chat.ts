import { Handler } from 'express';
import OpenAI from 'openai';
import { ChatCompletionStrategy } from '../libs/openai/chat/ChatCompletionStrategy';
import { TextToSpeech } from '../services/textToSpeech/TextToSpeech';
import fs from 'fs';

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

    const textToSpeech = new TextToSpeech(language, gender, openai);

    textToSpeech.setText(gptResponse);

    await textToSpeech.generateAudio();

    // headers for the audio
    res.setHeader('Content-Type', 'audio/mp3');
    res.setHeader('Content-Disposition', 'attachment; filename=audio.mp3');
    
    // creation of the streming
    const audioStream = fs.createReadStream(textToSpeech.speechFile);
    
    // send the audio while reading
    audioStream.pipe(res);
    }

  if(payload_datatype === "string") {} // implementation for the assistant strategy

 
}

export const textToSpeech: Handler = async (req, res) => {
  // if the language is english then

}

export const speechToText: Handler = async (req, res) => {
  //
}