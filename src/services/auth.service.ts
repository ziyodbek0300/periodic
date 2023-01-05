import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateAdminDto } from '@/dtos/admins.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Admin } from '@/interfaces/admins.interface';
import adminModel from '@/models/admins.model';
import { isEmpty } from '@utils/util';

/**
 * Authorization, admin login va logout qilish bo'limi
 */
class AuthService {
  public admins = adminModel;

  public async login(admimData: CreateAdminDto): Promise<{ cookie: string; findAdmin: Admin }> {
    if (isEmpty(admimData)) throw new HttpException(400, 'admimData is empty');

    const findAdmin: Admin = await this.admins.findOne({ username: admimData.username });
    if (!findAdmin) throw new HttpException(409, `This username ${admimData.username} was not found`);

    const isPasswordMatching: boolean = await compare(admimData.password, findAdmin.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken(findAdmin);
    const cookie = this.createCookie(tokenData);
    delete findAdmin['password'];

    return { cookie, findAdmin };
  }

  public async logout(admimData: Admin): Promise<Admin> {
    if (isEmpty(admimData)) throw new HttpException(400, 'admimData is empty');

    const findAdmin: Admin = await this.admins.findOne({ username: admimData.username, password: admimData.password }).select('-__v -password');
    if (!findAdmin) throw new HttpException(409, `This username ${admimData.username} was not found`);

    return findAdmin;
  }

  public createToken(user: Admin): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
