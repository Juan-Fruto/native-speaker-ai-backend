import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
// import { Language, Gender } from '../../services/textToSpeech/voices/voiceTypes';

const chatComFormatChecker = (data: any) => {
  if (Array.isArray(data)) {
    // check the format of the objects
    return data.every(e => (
        typeof e === 'object' && e !== null && typeof e.role === 'string' && typeof e.content === 'string'
      )
    )
  }
}

export const messageArrayValidatios = [

  check('payload')
    .exists().withMessage('The payload has not been provided')
    .isArray().withMessage('Invalid payload format')
    .custom((value, {req}) => {
      
      if(!chatComFormatChecker(value)){
        throw new Error('Invalid payload format');
      }

      return true;
    }),
  
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if(!errors.isEmpty()){
        return res.status(403).json({data: errors});
      }

      next();
    } catch (error) {
      res.status(403).json({data: error});
    }
  }
    
];

export const messageStringValidatios = [

  check('payload')
    .exists().withMessage('The payload has not been provided')
    .isString().withMessage('Invalid payload format'),
  
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if(!errors.isEmpty()){
        return res.status(403).json({data: errors});
      }

      next();
    } catch (error) {
      res.status(403).json({data: error});
    }
  }
    
];

// inside the router
export const messageValidatios = [

  check('gender')
    .exists().withMessage('The geneder has not been provided')
    .custom(
      (value, {req}) => {
      
        if(value !== "male" && value !== "female"){
        
          throw new Error('Invalid geneder format');
        
        }
  
        return true;
      }
    ),
  
    check('language')
    .exists().withMessage('The language has not been provided')
    .custom(
      (value, {req}) => {
      
        // replace to a query to the DB
        if(value !== "english" && value !== "spanish"){
        
          throw new Error('Invalid language format');
        
        }
  
        return true;
      }
    ),
  
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if(!errors.isEmpty()){
        return res.status(403).json({data: errors});
      }

      next();
    } catch (error) {
      res.status(403).json({data: error});
    }
  }
    
];

// inside the controller
export const assisantValidations = [
  // check if the chat name exists, or even better if it is the first message
  // if exists validate the id thread

];

// inside the controller
export const chatCompletionValidations = [

  //

];