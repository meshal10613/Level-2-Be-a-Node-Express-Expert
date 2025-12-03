import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

const loginUser = async(email: string, password: string) => {
	const isExist = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
	if(isExist.rows.length === 0){
		return null;
	};

	const user = isExist.rows[0];
	const isPassMatch = await bcrypt.compare(password, user.password);
	const isEmailMatch = user.email === email;
	if(!isPassMatch){
		return {message: "Password does not match!"};
	};
	if(!isEmailMatch){
		return {message: "Email does not match!"};
	}
	return user;
};

export const authServices = { loginUser };