import {Router} from 'express';
import elementPropsController from '@/controllers/elementProps.controller';
import {CreateElementPropDto} from '@/dtos/elementProps.dto';
import {Routes} from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

export default class ElementPropsRoute implements Routes {
  public path = '/element-props';
  public router = Router();
  public elementPropsController = new elementPropsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.elementPropsController.getElementProps);
    this.router.get(`${this.path}/:id`, authMiddleware, this.elementPropsController.getElementPropById);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateElementPropDto, 'body'),
      this.elementPropsController.createElementProp,
    );
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(CreateElementPropDto, 'body', true),
      this.elementPropsController.updateElementProp,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.elementPropsController.deleteElementProp);
  }
}
