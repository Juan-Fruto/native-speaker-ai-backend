import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const chatComFormatChecker = (data: any) => {
  // check if data is an array
  if (!Array.isArray(data)) {
    return false;
  }

  // check the format of the objects
  return data.every(e => (
      typeof e === 'object' && e !== null && typeof e.role === 'string' && typeof e.content === 'string'
    )
  );
}


// inside the router
export const messageValidatios = [

  check('payload')
    .exists().withMessage('The payload has not been provided')
    .custom((value, {req}) => {
      
      if(chatComFormatChecker(value)){
      
        req.body.payload_datatype = "Array of strings";
      
      } else if(typeof value === "string"){
      
        req.body.payload_datatype = "string";
      
      } else{
        
        req.body.payload_datatype = undefined;
        throw new Error('Invalid payload format');
      
      }

      return true;
    }),

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