import { pool } from "../../config/db";

const createTodo = async (user_id: any, title: any) => {
    const result = await pool.query(
        `INSERT INTO todos (user_id, title) VALUES ($1, $2) RETURNING *`,
        [user_id, title]
    );

    return result;
};

const getAllTodos = async () => {
    const result = await pool.query(`SELECT * FROM todos`);

    return result;
};

const getTodoById = async (id: string) => {
    const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [id]);

    return result;
};

const updateTodoById = async (user_id: number, title: string, id: string) => {
    const result = await pool.query(
        `UPDATE todos SET user_id = $1, title= $2 WHERE id = $3 RETURNING *`,
        [user_id, title, id]
    );

    return result;
};

const deleteTodoById = async (id: string) => {
    const result = await pool.query(
        `DELETE FROM todos WHERE id = $1 RETURNING *`,
        [id]
    );

	return result;
};

export const todoServices = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodoById,
	deleteTodoById
};
