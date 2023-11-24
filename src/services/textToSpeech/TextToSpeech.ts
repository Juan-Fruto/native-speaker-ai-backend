import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { randomUUID } from 'crypto';
import { Language, Gender } from './voices/voiceTypes';
import Voice, { IVoice } from './voices/Voice';

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

    this.configureVoice();
  }

  private configureVoice(): void {
    // 15 languages
    let lang : IVoice;
    if(this.language == "arabic") lang = new Voice.English(this.gender, this.openai)
    
  }

  public setText(text: string): void {
    this.text = text;
  }

  public async generateAudio(): Promise<boolean> {
    const mp3 = await this.openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      // input: "Hola mi nombre es Native Speaker AI! y fui creado para ayudarte a mejorar tu inglés",
      input: this.text,
    });
    
    try {
      console.log(this.speechFile);
      const buffer = Buffer.from(await mp3.arrayBuffer());
      await fs.promises.writeFile(this.speechFile, buffer);
      return true
    } catch (error) {
      console.error('error', error);
      return false;
    }
  }

  private uniqueFileName(): string {
    return `speech_${randomUUID()}.mp3`;
  }
}