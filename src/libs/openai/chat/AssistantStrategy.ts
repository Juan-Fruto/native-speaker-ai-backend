import { AbstractChatStrategy } from './AbstractChatStrategy';
import OpenAI from 'openai';

export class AssistantStrategy extends AbstractChatStrategy {
  
  constructor(openai: OpenAI , payload: string){
    super(openai);
  }

  public run(){}
  
  public getResponse(): String {
      return "ds"
  }
}