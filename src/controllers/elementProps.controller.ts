import { NextFunction, Request, Response } from 'express';
import { CreateElementPropDto } from '@/dtos/elementProps.dto';
import { ElementProp } from '@/interfaces/elementProps.interface';
import elementPropService from '@/services/elementProps.service';
import catchAsync from '@/utils/catchAsync';

export default class ElementPropController {
  public elementPropService = new elementPropService();

  public getElementProps = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const findAllElementPropData: ElementProp[] = await this.elementPropService.findAllElementProp(req.query);

    res.status(200).json({ data: findAllElementPropData, message: 'findAll' });
  });

  public getElementPropById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const findOneElementPropData: ElementProp = await this.elementPropService.findElementPropById(req.params.id);

    res.status(200).json({ data: findOneElementPropData, message: 'findOne' });
  });

  public createElementProp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const createElementPropData: ElementProp = await this.elementPropService.createElementProp(req.body as CreateElementPropDto);

    res.status(201).json({ data: createElementPropData, message: 'created' });
  });

  public updateElementProp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const updateElementPropData: ElementProp = await this.elementPropService.updateElementProp(req.params.id, req.body as CreateElementPropDto);

    res.status(200).json({ data: updateElementPropData, message: 'updated' });
  });

  public deleteElementProp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const deleteElementPropData: ElementProp = await this.elementPropService.deleteElementProp(req.params.id);

    res.status(200).json({ data: deleteElementPropData, message: 'deleted' });
  });
}
