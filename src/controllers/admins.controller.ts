import { NextFunction, Request, Response } from 'express';
import { CreateAdminDto } from '@/dtos/admins.dto';
import { Admin } from '@/interfaces/admins.interface';
import adminService from '@/services/admins.service';

export default class AdminController {
  public adminService = new adminService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllAdminData: Admin[] = await this.adminService.findAllAdmin();

      res.status(200).json({ data: findAllAdminData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findOneAdminData: Admin = await this.adminService.findAdminById(req.params.id);

      res.status(200).json({ data: findOneAdminData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createAdminData: Admin = await this.adminService.createAdmin(req.body as CreateAdminDto);

      res.status(201).json({ data: createAdminData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateAdminData: Admin = await this.adminService.updateAdmin(req.params.id, req.body as CreateAdminDto);

      res.status(200).json({ data: updateAdminData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteAdminData: Admin = await this.adminService.deleteAdmin(req.params.id);

      res.status(200).json({ data: deleteAdminData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
