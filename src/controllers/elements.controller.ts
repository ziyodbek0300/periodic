import { NextFunction, Request, Response } from 'express';
import { CreateElementDto } from '@/dtos/elements.dto';
import { Element } from '@/interfaces/elements.interface';
import elementService from '@/services/elements.service';
import catchAsync from '@/utils/catchAsync';
export default class ElementController {
  public elementService = new elementService();

  public getElements = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const findAllElementData: Element[] = await this.elementService.findAllElement(req.query);

    res.status(200).json({ data: findAllElementData, message: 'findAll' });
  });

  public getElementById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const findOneElementData: Element = await this.elementService.findElementById(req.params.id);

    res.status(200).json({ data: findOneElementData, message: 'findOne' });
  });

  public createElement = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const createElementData: Element = await this.elementService.createElement(req.body as CreateElementDto & Element);

    res.status(201).json({ data: createElementData, message: 'created' });
  });

  public updateElement = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const updateElementData: Element = await this.elementService.updateElement(req.params.id, req.body as CreateElementDto & Element);

    res.status(200).json({ data: updateElementData, message: 'updated' });
  });

  public deleteElement = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const deleteElementData: Element = await this.elementService.deleteElement(req.params.id);

    res.status(200).json({ data: deleteElementData, message: 'deleted' });
  });
}
