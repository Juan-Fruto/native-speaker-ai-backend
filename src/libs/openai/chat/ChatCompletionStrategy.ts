import { AbstractChatStrategy } from './AbstractChatStrategy';
import OpenAI from 'openai';

type Model = "gpt-3.5-turbo-1106" | "gpt-4-1106-preview";

type ChatComPayload = [{role: string, content: string}]

export class ChatCompletionStrategy extends AbstractChatStrategy {
  
  payload: OpenAI.Chat.ChatCompletionMessageParam[];
  model: Model;
  response: string | null;

  constructor(openai: OpenAI , payload: OpenAI.Chat.ChatCompletionMessageParam[], model: Model) {
    console.log(payload); // quitar
    super(openai);
    this.payload = payload;
    this.model = model;
  }

  public async run(): Promise<void> {
    // analyze the user message, lexical richness
    //const userMessage = this.payload[this.payload.length - 1].content;

    const completion = await AbstractChatStrategy.openai.chat.completions.create({
      messages: this.payload,
      model: this.model,
      max_tokens: 6
    });

    console.log(completion.choices[0].message)

    this.response = completion.choices[0].message.content;
  }
  
  public getResponse(): string {
      if(this.response){
        return this.response;
      } else {
        return "an error occurred";
      }
  }
}