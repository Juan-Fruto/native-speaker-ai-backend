import OpenAI from "openai";

export abstract class AbstractChatStrategy {
  protected static openai: OpenAI;

  constructor(openai: OpenAI){
    AbstractChatStrategy.openai = openai;
  }
  
  abstract getResponse(): String;
} 