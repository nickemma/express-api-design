import { Request, Response } from "express";

export const protect = (req: Request, res: Response, next: Function) => {
    console.log('Auth middleware');
    next();
}
