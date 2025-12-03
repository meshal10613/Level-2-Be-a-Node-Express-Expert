import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const result = await userServices.createUser(data.name, data.email);

        res.status(201).json({
            path: req.url,
            success: true,
            message: "Data Insertded Successfully....!",
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({
            path: req.url,
            success: false,
            message: error.message,
            details: error,
        });
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUsers();

        res.status(200).json({
            path: req.url,
            success: true,
            message: "Users Retrieved Successfully....!",
            data: result.rows,
        });
    } catch (error: any) {
        res.status(500).json({
            path: req.url,
            success: false,
            message: error.message,
            details: error,
        });
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userServices.getUserById(id as string);

        if (result.rows.length === 0) {
            return res.status(404).json({
                path: req.url,
                success: false,
                message: "User Not Found!",
            });
        }

        res.status(200).json({
            path: req.url,
            success: true,
            message: "User Retrieved Successfully....!",
            data: result.rows,
        });
    } catch (error: any) {
        res.status(500).json({
            path: req.url,
            success: false,
            message: error.message,
            details: error,
        });
    }
};

const updateUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const result = await userServices.updateUserById(
            name,
            email,
            id as string
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                path: req.url,
                success: false,
                message: "User Not Found!",
            });
        }

        res.status(200).json({
            path: req.url,
            success: true,
            message: "User Updated Successfully....!",
            data: result.rows,
        });
    } catch (error: any) {
        res.status(500).json({
            path: req.url,
            success: false,
            message: error.message,
            details: error,
        });
    }
};

const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userServices.deleteUserById(id as string);

        if (result.rowCount === 0) {
            return res.status(404).json({
                path: req.url,
                success: false,
                message: "User Not Found!",
            });
        }

        res.status(200).json({
            path: req.url,
            success: true,
            message: "User Deleted Successfully....!",
            data: null,
        });
    } catch (error: any) {
        res.status(500).json({
            path: req.url,
            success: false,
            message: error.message,
            details: error,
        });
    }
};

export const userControllers = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
	deleteUserById
};
