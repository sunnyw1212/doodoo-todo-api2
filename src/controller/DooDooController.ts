import { Request, Response } from 'express';
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
  BadRequestError,
} from 'routing-controllers';

import { DooDoo } from '../entity/DooDoo';
import { validateNumber } from '../utils/validator';
import { CustomSuccessResponse } from '../types';

@JsonController()
export class DooDooController {
  @Get('/doodoo')
  async getAll(@Req() request: Request, @Res() response: Response) {
    return await DooDoo.find({ relations: ['assigned_to_user', 'created_by_user'] });
  }

  @Get('/doodoo/:id')
  async getOne(@Req() request: Request, @Res() response: Response, @Param('id') id: number) {
    if (!validateNumber(id)) {
      throw new BadRequestError('Invalid id');
    }
    const doodoo = await DooDoo.findOne(id);
    if (!doodoo) {
      throw new NotFoundError('DooDoo not found');
    }

    const result: CustomSuccessResponse = {
      status: 'success',
      data: {
        doodoo,
      },
    };
    return response.status(200).json(result);
  }

  @Post('/doodoo')
  async save(@Req() request: Request, @Res() response: Response, @Body() doodoo: DooDoo) {
    return DooDoo.save(doodoo);
  }

  @Put('/doodoo/:id')
  async put(
  @Req() request: Request,
    @Res() response: Response,
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
  async remove(@Req() request: Request, @Res() response: Response, @Param('id') id: number) {
    const doodoo_to_remove = await DooDoo.findOne(id);
    if (!doodoo_to_remove) {
      throw new NotFoundError('fuck');
    }
    await DooDoo.remove(doodoo_to_remove);
  }
}
