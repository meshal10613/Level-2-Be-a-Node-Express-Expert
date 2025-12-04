import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token)
                return res.status(401).json({ message: "Unauthorized Access" });

            const decoded = jwt.verify(token, config.app.jwt_secret as string);
            req.user = decoded as JwtPayload;
            next();
        } catch (error: any) {
            res.status(500).json({
                path: req.url,
                success: false,
                message: error.message,
                details: error,
            });
        }
    };
};

export default auth;
