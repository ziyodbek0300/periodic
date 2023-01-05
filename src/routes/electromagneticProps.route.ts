import { Router } from 'express';
import { CreateElementPropDto } from '@/dtos/elementProps.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import ElectromagneticPropsController from '@controllers/electromagneticProps.controller';
import { CreateElectromagneticPropDto } from '@dtos/electromagneticProps.dto';

export default class ElectromagneticPropsRoute implements Routes {
  public path = '/electromagnetic-props';
  public router = Router();
  public electromagneticPropsController = new ElectromagneticPropsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.electromagneticPropsController.getElementProps);
    this.router.get(`${this.path}/:id`, this.electromagneticPropsController.getElementPropById);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateElectromagneticPropDto, 'body'),
      this.electromagneticPropsController.createElementProp,
    );
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(CreateElementPropDto, 'body', true),
      this.electromagneticPropsController.updateElementProp,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.electromagneticPropsController.deleteElementProp);
  }
}
