import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { Language } from '../../entities/Language';
import { redisClient } from '../../services/redis';
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
      async (value, {req}) => {

        let languages: Language[] | undefined;

        try {
          let redisQueryRes = await redisClient.get('languages'); // redis query result
  
          const languageAsignation = (): Language[] | undefined => {
            if(redisQueryRes == null){ // if the data doesn't exist
  
              // sql query
              Language.find().then(data => {
                redisClient.set('languages', JSON.stringify(data), { // caching the sql query result
                  EX: 60*60*24*3, // expires every 72 hours
                });
                return data // return the sql query result
              });
  
            } else {
              return JSON.parse(redisQueryRes); // return the redis query result
            }
          }
          
          languages = languageAsignation();
          
        } catch (error) {
          throw new Error('Server error');
        }

        if(!languages) throw new Error('Server error'); // change the status code
        
        const match = languages.find((l) => l.language === value);
  
        if (!match) {
          throw new Error('Invalid language format');
        }
  
        return true;

      }
    ),
  
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      
      if(!errors.isEmpty()){
        for(const err of errors.array()) {
          if(err.msg == 'Server error'){
           return res.status(503).json({data: errors});
          }
        };

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