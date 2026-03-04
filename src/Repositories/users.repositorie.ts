import { pool } from "../../db.js";
import { User } from '../entities/index.js';

export const findUserByEmail = async (email: string) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return (rows as any[])[0] ?? null;
}

export class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        return findUserByEmail(email);
    }

    async create(user: Partial<User>): Promise<{ insertId: number }> {
        const [result]: any = await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [user.name, user.email, user.password]
        );
        return { insertId: result.insertId };
    }
}