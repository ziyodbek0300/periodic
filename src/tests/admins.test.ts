import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '../app';
import { CreateAdminDto } from '../dtos/admins.dto';
import AdminsRoute from '../routes/admins.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response fineAll Users', async () => {
      const adminsRoute = new AdminsRoute();
      const users = adminsRoute.adminsController.userService.users;

      users.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          username: 'a@username.com',
          password: await bcrypt.hash('q1w2e3r4!', 10),
        },
        {
          _id: 'alskdjfhg',
          username: 'b@username.com',
          password: await bcrypt.hash('a1s2d3f4!', 10),
        },
        {
          _id: 'zmxncbv',
          username: 'c@username.com',
          password: await bcrypt.hash('z1x2c3v4!', 10),
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([adminsRoute]);
      return request(app.getServer()).get(`${adminsRoute.path}`).expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne User', async () => {
      const userId = 'qpwoeiruty';

      const adminsRoute = new AdminsRoute();
      const users = adminsRoute.adminsController.userService.users;

      users.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        username: 'a@username.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([adminsRoute]);
      return request(app.getServer()).get(`${adminsRoute.path}/${userId}`).expect(200);
    });
  });

  describe('[POST] /users', () => {
    it('response Create User', async () => {
      const userData: CreateAdminDto = {
        username: 'test@username.com',
        password: 'q1w2e3r4',
      };

      const adminsRoute = new AdminsRoute();
      const users = adminsRoute.adminsController.userService.users;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        username: userData.username,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([adminsRoute]);
      return request(app.getServer()).post(`${adminsRoute.path}`).send(userData).expect(201);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response Update User', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const userData: CreateAdminDto = {
        username: 'test@username.com',
        password: 'q1w2e3r4',
      };

      const adminsRoute = new AdminsRoute();
      const users = adminsRoute.adminsController.userService.users;

      if (userData.username) {
        users.findOne = jest.fn().mockReturnValue({
          _id: userId,
          username: userData.username,
          password: await bcrypt.hash(userData.password, 10),
        });
      }

      users.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: userId,
        username: userData.username,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([adminsRoute]);
      return request(app.getServer()).put(`${adminsRoute.path}/${userId}`).send(userData);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response Delete User', async () => {
      const userId = '60706478aad6c9ad19a31c84';

      const adminsRoute = new AdminsRoute();
      const users = adminsRoute.adminsController.userService.users;

      users.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        username: 'test@username.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([adminsRoute]);
      return request(app.getServer()).delete(`${adminsRoute.path}/${userId}`).expect(200);
    });
  });
});
