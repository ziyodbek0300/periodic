import { Router } from 'express';
import AdminsController from '@/controllers/admins.controller';
import { CreateAdminDto } from '@/dtos/admins.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

export default class AdminsRoute implements Routes {
  public path = '/admins';
  public router = Router();
  public adminsController = new AdminsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.adminsController.getUsers);
    this.router.get(`${this.path}/:id`, authMiddleware, this.adminsController.getUserById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateAdminDto, 'body'), this.adminsController.createUser);
    this.router.patch(`${this.path}/:id`, authMiddleware, validationMiddleware(CreateAdminDto, 'body', true), this.adminsController.updateUser);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.adminsController.deleteUser);
  }
}
