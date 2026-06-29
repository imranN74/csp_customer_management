import { type Request, type Response, type NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

//_________AUTHENTICATE USER___________
interface TokenDate extends JwtPayload {
  id: string;
  role: string;
}

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const jwt_secrete = process.env.JWT_SECRETE;

  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Invalid credential, Please login and try again!",
      });
    }

    if (!jwt_secrete) {
      return res.status(400).json({
        success: false,
        message: "secrete missing!",
      });
    }

    const decoded = jwt.verify(token, jwt_secrete) as TokenDate;
    if (!decoded) {
      return res.status(403).json({
        success: false,
        message: "Invalid credential, Please login and try again!",
      });
    }

    res.locals.userId = decoded.id;
    res.locals.isAdmin = decoded.role;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token!",
    });
  }
}

//________VERIFY ROLE____________

export function authorizeUser(req: Request, res: Response, next: NextFunction) {
  const role = res.locals.isAdmin;
  if (!role) {
    return res.status(403).json({
      success: false,
      message: "you don't have access to perform the operation!",
    });
  }
  next();
}
