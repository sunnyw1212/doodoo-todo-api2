import { Request, Response, NextFunction } from 'express';
import {
  Req,
  Res,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  NotFoundError,
} from 'routing-controllers';

import { DooDoo } from '../entity/DooDoo';

@JsonController()
export class DooDooController {
  @Get('/doodoo')
  async getAll(@Req() request: Request, @Res() response: Response, next: NextFunction) {
    return await DooDoo.find({ relations: ['assigned_to_account', 'created_by_account'] });
  }

  @Get('/doodoo/:id')
  async getOne(
  @Req() request: Request,
    @Res() response: Response,
    next: NextFunction,
    @Param('id') id: number,
  ) {
    const doodoo = await DooDoo.findOne(id);
    if (!doodoo) {
      throw new NotFoundError('fuck');
    }
    return doodoo;
  }

  @Post('/doodoo')
  async save(
  @Req() request: Request,
    @Res() response: Response,
    next: NextFunction,
    @Body() doodoo: DooDoo,
  ) {
    return DooDoo.save(doodoo);
  }

  @Put('/doodoo/:id')
  async put(
  @Req() request: Request,
    @Res() response: Response,
    next: NextFunction,
    @Param('id') id: number,
    @Body() doodoo: DooDoo,
  ) {
    const existing_doodoo = await DooDoo.findOne({ id });
    if (!existing_doodoo) {
      throw new NotFoundError('fuck');
    }
    return doodoo.save();
  }

  @Delete('/doodoo/:id')
  async remove(
  @Req() request: Request,
    @Res() response: Response,
    next: NextFunction,
    @Param('id') id: number,
  ) {
    const doodoo_to_remove = await DooDoo.findOne(id);
    if (!doodoo_to_remove) {
      throw new NotFoundError('fuck');
    }
    await DooDoo.remove(doodoo_to_remove);
  }
}
