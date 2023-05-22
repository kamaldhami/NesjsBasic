import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization;
      token = token.split(' ')[1];

      if (token) {
        try {
          const validated = jwt.verify(token, process.env.JWT_SECRET);

          req.user = validated;
          next();
        } catch (err) {
          res.status(401).json({
            message: 'Invalid Token. Login Again!',
          });
        }
      }
    } catch (err) {
      res.status(401).json({
        msg: 'Authorization is required',
      });
    }
  }
}
