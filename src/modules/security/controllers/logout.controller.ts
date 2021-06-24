import { Request, Response } from 'express';

export function logout(req: Request, res: Response) {
  req.logOut();
  res.redirect('/');
}
