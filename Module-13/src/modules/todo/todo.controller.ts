import { Request, Response } from "express";
import { todoServices } from "./todo.service";

const createTodo = async (req: Request, res: Response) => {
    try {
        const { user_id, title } = req.body;

        const result = await todoServices.createTodo(user_id, title);
        res.status(201).json({
            path: req.url,
            success: true,
            message: "Todos Insertded Successfully....!",
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

const getAllTodos = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.getAllTodos();

        res.status(200).json({
            path: req.url,
            success: true,
            message: "Todos Retrieved Successfully....!",
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

const getTodoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await todoServices.getTodoById(id as string);

        if (result.rows.length === 0) {
            return res.status(404).json({
                path: req.url,
                success: false,
                message: "Todo Not Found!",
            });
        }

        res.status(200).json({
            path: req.url,
            success: true,
            message: "Todo Retrieved Successfully....!",
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

const updateTodoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { user_id, title } = req.body;
        const result = await todoServices.updateTodoById(
            user_id as number,
            title as string,
            id as string
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                path: req.url,
                success: false,
                message: "Todo Not Found!",
            });
        }

        res.status(200).json({
            path: req.url,
            success: true,
            message: "Todo Updated Successfully....!",
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
const deleteTodoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await todoServices.deleteTodoById(id as string);

        if (result.rowCount === 0) {
            return res.status(404).json({
                path: req.url,
                success: false,
                message: "Todo Not Found!",
            });
        }

        res.status(200).json({
            path: req.url,
            success: true,
            message: "Todo Deleted Successfully....!",
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

export const todoControllers = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodoById,
	deleteTodoById
};
