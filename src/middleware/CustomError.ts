import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { CustomErrorResponse } from '../types';
@Middleware({ type: 'after' })
export class CustomError implements ExpressErrorMiddlewareInterface {
  /**
   * Error handler - sets response code and sends json with error message.
   * Handle: standard node error, HttpError, NotFoundError and string.
   *
   * @param {any} error An throwed object (error)
   * @param {Request} request The Express request object
   * @param {Response} response The Express response object
   * @param {NextFunction} next The next Express middleware function
   */
  public error(error: any, request: Request, response: Response, next: NextFunction) {
    const developmentMode: boolean = process.env.NODE_ENV === 'development';
    const responseObject: CustomErrorResponse = {
      status: 'fail',
    };

    if (error.message) {
      responseObject.message = error.message;
    }
    if (error.name) {
      responseObject.name = error.name;
    }
    // show stack only if in development mode
    if (error.stack && developmentMode) {
      responseObject.stack = error.stack;
    }

    // send json only with error
    response.status(error.httpCode || 500).json(responseObject);

    // if its an array of NotFoundError
    // if (Array.isArray(error) && error.every(element => element instanceof NotFoundError)) {
    //   res.status(400);
    //   responseObject.message = 'Invalid request';
    //   responseObject.data = error;
    // responseObject.details = [];
    // error.forEach((element: NotFoundError) => {
    //     Object.keys(element.constraints).forEach((type) => {
    //         responseObject.details.push(`property ${element.constraints[type]}`);
    //     });
    // });
    // }
  }
}
