import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { randomUUID } from 'crypto';
import { Language, Gender } from './voices/voiceTypes';
import Voice, { IVoice } from './voices/Voice';
const ElevenLabs = require("elevenlabs-node");

export class TextToSpeech {
  private openai: OpenAI;
  public language: Language;
  private gender: Gender;
  public speechFile: string;
  private text: string;

  constructor(language: Language, gender: Gender ,openai: OpenAI) {
    this.language = language;
    this.openai = openai;
    this.gender = gender;
    this.speechFile = path.resolve(`./src/temp/chat/audio/${this.uniqueFileName()}`);
  }

  public setText(text: string): void {
    this.text = text;
  }

  public async generateAudio(): Promise<void> {

    const voice = new ElevenLabs(
      {
        apiKey:  "ae3185300a6c12e3e1ff786a523b13e7", // API key from Elevenlabs
        voiceId: "flq6f7yk4E4fJM5XTYuZ",             // A Voice ID from Elevenlabs
      }
    );

    const voiceResponse = await voice.textToSpeechStream({
      // Required Parameters
      textInput:       this.text,                // The text you wish to convert to speech

      // Optional Parameters
      voiceId:         "flq6f7yk4E4fJM5XTYuZ",         // A different Voice ID from the default
      stability:       0.5,                            // The stability for the converted speech
      similarityBoost: 0.5,                            // The similarity boost for the converted speech
      modelId:         "eleven_multilingual_v2",       // The ElevenLabs Model ID
      style:           0,                              // The style exaggeration for the converted speech
      responseType:    "stream",                       // The streaming type (arraybuffer, stream, json)
      speakerBoost:    true                            // The speaker boost for the converted speech
    })
    
    await voiceResponse.pipe(fs.createWriteStream(this.speechFile));
  }

  private uniqueFileName(): string {
    return `speech_${randomUUID()}.mp3`;
  }
}