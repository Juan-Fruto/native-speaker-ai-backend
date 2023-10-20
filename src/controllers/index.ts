import { Handler } from 'express';
 
export const helloHandler: Handler = (req, res) => {
  res.send('hi from controllers');
}

export const aboutHandler: Handler = (req, res) => {
  res.send('This is the API of the Speak Native AI project');
}