// import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { DooDoo } from '../entity/DooDoo';

export class DooDooController {
  // private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return DooDoo.find({ relations: ['assigned_to_account', 'created_by_account'] });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return DooDoo.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return DooDoo.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const doodooToRemove: DooDoo = (await DooDoo.findOne(request.params.id)) as DooDoo;
    await DooDoo.remove(doodooToRemove);
  }
}
