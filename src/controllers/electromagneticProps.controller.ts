import { NextFunction, Request, Response } from 'express';
import catchAsync from '@/utils/catchAsync';
import { ElectromagneticProps } from '@interfaces/electromagneticProps.interface';
import ElectromagneticPropsService from '@services/electromagneticProps.service';
import { CreateElectromagneticPropDto } from '@dtos/electromagneticProps.dto';

export default class ElectromagneticPropsController {
  public elementPropService = new ElectromagneticPropsService();

  public getElementProps = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const findAllElementPropData: ElectromagneticProps[] = await this.elementPropService.findAllElementProp(req.query);

    res.status(200).json({ data: findAllElementPropData, message: 'findAll' });
  });

  public getElementPropById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const findOneElementPropData: ElectromagneticProps = await this.elementPropService.findElementPropById(req.params.id);

    res.status(200).json({ data: findOneElementPropData, message: 'findOne' });
  });

  public createElementProp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const createElementPropData: ElectromagneticProps = await this.elementPropService.createElementProp(req.body as CreateElectromagneticPropDto);

    res.status(201).json({ data: createElementPropData, message: 'created' });
  });

  public updateElementProp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const updateElementPropData: ElectromagneticProps = await this.elementPropService.updateElementProp(req.params.id, req.body as CreateElectromagneticPropDto);

    res.status(200).json({ data: updateElementPropData, message: 'updated' });
  });

  public deleteElementProp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const deleteElementPropData: ElectromagneticProps = await this.elementPropService.deleteElementProp(req.params.id);

    res.status(200).json({ data: deleteElementPropData, message: 'deleted' });
  });
}
