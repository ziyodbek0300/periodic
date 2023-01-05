import { NextFunction, Request, Response } from 'express';
import { CreateAtomicPropDto } from '@/dtos/atomicProps.dto';
import { AtomicProp } from '@/interfaces/atomicProps.interface';
import atomicPropService from '@/services/atomicProps.service';
import catchAsync from '@/utils/catchAsync';

export default class AtomicPropController {
  public atomicPropService = new atomicPropService();

  public getAtomicProps = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const findAllAtomicPropData: AtomicProp[] = await this.atomicPropService.findAllAtomicProp(req.query);

    res.status(200).json({ data: findAllAtomicPropData, message: 'findAll' });
  });

  public getAtomicPropById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const findOneAtomicPropData: AtomicProp = await this.atomicPropService.findAtomicPropById(req.params.id);

    res.status(200).json({ data: findOneAtomicPropData, message: 'findOne' });
  });

  public createAtomicProp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const createAtomicPropData: AtomicProp = await this.atomicPropService.createAtomicProp(req.body as CreateAtomicPropDto);

    res.status(201).json({ data: createAtomicPropData, message: 'created' });
  });

  public updateAtomicProp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const updateAtomicPropData: AtomicProp = await this.atomicPropService.updateAtomicProp(req.params.id, req.body as CreateAtomicPropDto);

    res.status(200).json({ data: updateAtomicPropData, message: 'updated' });
  });

  public deleteAtomicProp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const deleteAtomicPropData: AtomicProp = await this.atomicPropService.deleteAtomicProp(req.params.id);

    res.status(200).json({ data: deleteAtomicPropData, message: 'deleted' });
  });
}
