import { NextFunction, Request, Response } from 'express';

// try catch o'rniga ishlatiladi, codeni qisqa, oson va sodda qilish uchun ishlaqiladi
export default (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
