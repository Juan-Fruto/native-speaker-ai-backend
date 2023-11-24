import OpenAI from 'openai';
import { Gender } from './voiceTypes';

export interface IVoice {
  gender: Gender
  setModel(): void
  getModel(): any
}

class English implements IVoice {
  gender: Gender
  openai: OpenAI

  constructor(gender: Gender, openai: OpenAI) {
    this.gender = gender;
    this.openai = openai;
  }
  
  public setModel(): OpenAI.Audio.Speech.SpeechCreateParams['voice'] {
    if(this.gender == "male") return "alloy";
    if(this.gender == "female") return "shimmer";
    return "alloy";
  }

  public async getModel(): Promise<any> {
    const mp3 = await this.openai.audio.speech.create({
      model: "tts-1",
      voice: this.setModel(),
      // input: "Hola mi nombre es Native Speaker AI! y fui creado para ayudarte a mejorar tu inglés",
      input: "this.text,"
    });
  }
}

export default {English}