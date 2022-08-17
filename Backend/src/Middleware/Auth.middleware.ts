import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

const AdminAuth = (req: Request, res: Response, next: NextFunction) => {
  // const token = req.header('Authorization')?.replace('jwt ', '');
  const token = req.session.user?.token;
  // const tokenCookie = req.cookies.jwt;

  if (token) {
    verify(token, process.env.TOKEN_KEY!, (err: any, decodedToken: any) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      }
      // } else {
      //   if (decodedToken.name !== 'Test') {
      //     return res.status(401).json({ message: 'Not authorized' });
      //   } else {
      //   }
      // }
      next();
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

export default AdminAuth;
