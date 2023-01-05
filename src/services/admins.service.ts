import { hash } from 'bcrypt';
import { CreateAdminDto } from '@/dtos/admins.dto';
import { HttpException } from '@exceptions/HttpException';
import { Admin } from '@/interfaces/admins.interface';
import adminModel from '@models/admins.model';
import { isEmpty } from '@utils/util';

/** Adminlarni yaratish, o'zgartirish, o'chirish va olish logikasi shu yerga yozilgan.
 * Barchasi soda, bir ko'rishda tushina oladigan sodda qilingan
 */
export default class AdminService {
  public admins = adminModel;

  public async findAllAdmin(): Promise<Admin[]> {
    const admins: Admin[] = await this.admins.find().select('-__v -password');
    return admins;
  }

  public async findAdminById(adminId: string): Promise<Admin> {
    if (isEmpty(adminId)) throw new HttpException(400, 'AdminId is empty');

    const findAdmin: Admin = await this.admins.findOne({ _id: adminId }).select('-__v -password');
    if (!findAdmin) throw new HttpException(409, "Admin doesn't exist");

    return findAdmin;
  }

  public async createAdmin(adminData: CreateAdminDto): Promise<Admin> {
    if (isEmpty(adminData)) throw new HttpException(400, 'adminData is empty');

    const findAdmin: Admin = await this.admins.findOne({ username: adminData.username });
    if (findAdmin) throw new HttpException(409, `This username ${adminData.username} already exists`);

    // admin yaratilishidan avval passwordi shu yerga hashlanadi
    adminData.password = await hash(adminData.password, 10);
    const createAdmin = await this.admins.create(adminData);
    delete createAdmin.password;
    return createAdmin;
  }

  public async updateAdmin(adminId: string, adminData: CreateAdminDto): Promise<Admin> {
    if (isEmpty(adminData)) throw new HttpException(400, 'adminData is empty');

    // databaseda ikkita bir xil username bo'lmarligi uchun va errorni userga chiroylik tarzda jonatish uchun username tekshirilmoqda
    if (adminData.username) {
      const findAdmin: Admin = await this.admins.findOne({ _id: { $ne: 20 }, username: adminData.username });
      if (findAdmin) throw new HttpException(409, `This username ${adminData.username} already exists`);
    }

    // admin yangi parolni almashtirsa, yangi parol shu yerda hashlanadi
    if (adminData.password) {
      const hashedPassword = await hash(adminData.password, 10);
      adminData.password = hashedPassword;
    }

    const updateAdminById: Admin = await this.admins.findByIdAndUpdate(adminId, { adminData }).select('-__v -password');
    if (!updateAdminById) throw new HttpException(409, "Admin doesn't exist");

    return updateAdminById;
  }

  public async deleteAdmin(adminId: string): Promise<Admin> {
    const deleteAdminById: Admin = await this.admins.findByIdAndDelete(adminId).select('-__v -password');
    if (!deleteAdminById) throw new HttpException(409, "Admin doesn't exist");

    return deleteAdminById;
  }
}
