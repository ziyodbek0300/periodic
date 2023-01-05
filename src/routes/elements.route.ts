import { Router } from 'express';
import ElementsController from '@/controllers/elements.controller';
import { CreateElementDto } from '@/dtos/elements.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

export default class ElementsRoute implements Routes {
  public path = '/elements';
  public router = Router();
  public elementsController = new ElementsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.elementsController.getElements);
    this.router.get(`${this.path}/:id`, this.elementsController.getElementById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateElementDto, 'body'), this.elementsController.createElement);
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(CreateElementDto, 'body', true),
      this.elementsController.updateElement,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.elementsController.deleteElement);
  }
}
