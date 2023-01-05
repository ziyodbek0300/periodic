import {Router} from 'express';
import AtomicPropsController from '@/controllers/atomicProps.controller';
import {CreateAtomicPropDto} from '@/dtos/atomicProps.dto';
import {Routes} from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

export default class AtomicPropsRoute implements Routes {
  public path = '/atomic-props';
  public router = Router();
  public atomicPropsController = new AtomicPropsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.atomicPropsController.getAtomicProps);
    this.router.get(`${this.path}/:id`, authMiddleware, this.atomicPropsController.getAtomicPropById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateAtomicPropDto, 'body'), this.atomicPropsController.createAtomicProp);
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(CreateAtomicPropDto, 'body', true),
      this.atomicPropsController.updateAtomicProp,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.atomicPropsController.deleteAtomicProp);
  }
}
