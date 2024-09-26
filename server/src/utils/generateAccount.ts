import generateRandomPassword from "./generateRandomPassword";
import pool from '../db/config';
import bcrypt from 'bcryptjs';
import { ResultSetHeader, RowDataPacket } from "mysql2";

class GenerateNewAccount {
    public static async create(username: string | null, email: string | null, type: "admin" | "normal" | "provider") {
        if (!username || !email) {
            return false;
        }

        const password = generateRandomPassword();
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();
            const [existingUser] = await connection.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
            if (existingUser.length) {
                throw new Error("User already exists with this email");
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await connection.query<ResultSetHeader>('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, type]);

            // Fetch the newly created user
            const [newUserRows] = await connection.query<any[]>('SELECT * FROM users WHERE id = ?', [result.insertId]);
            const newUser = newUserRows[0];

            await connection.commit();

            return {
                ...newUser,
                original_password: password
            };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release(); // Use release instead of end
        }
    }
}

export default GenerateNewAccount;