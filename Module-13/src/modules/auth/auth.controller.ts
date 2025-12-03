import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
    try {
		const result = await authServices.loginUser(req.body.email as string, req.body.password as string);

		res.status(200).json({
			path: req.url,
			success: true,
			message: "User Logged In Successfully....!",
			data: result
		})
    } catch (error: any) {
        res.status(500).json({
            path: req.url,
            success: false,
            message: error.message,
            details: error,
        });
    }
};

export const authControllers = { loginUser };
