import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"; // Importe o objeto default

interface ITokenPayload {
  id: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }


  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

try {
  const secret = process.env.JWT_SECRET as string;
  const decoded = jwt.verify(token, secret);


    const { id } = decoded as unknown as ITokenPayload;


    req.user = {
      id: id,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}