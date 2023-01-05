import { NextFunction, Request, Response } from 'express';
import { CreateAdminDto } from '@/dtos/admins.dto';
import { RequestWithAdmin } from '@interfaces/auth.interface';
import { Admin } from '@/interfaces/admins.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminData: CreateAdminDto = req.body;
      const { cookie, findAdmin } = await this.authService.login(adminData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findAdmin, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithAdmin, res: Response, next: NextFunction) => {
    try {
      const adminData: Admin = req.admin;
      const logOutAdminData: Admin = await this.authService.logout(adminData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutAdminData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
