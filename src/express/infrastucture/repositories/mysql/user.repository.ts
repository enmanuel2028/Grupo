import { ResultSetHeader, RowDataPacket } from 'mysql2';
import bcrypt from 'bcryptjs';
import pool from '../../config/database';
import { User, UserRegister, UserUpdate, UserResponse } from '../../../../Usuario/Dominio/Model/user.model';
import { IUserRepository } from '../../../../Usuario/infrastucture/user.repository';

export class MySQLUserRepository implements IUserRepository {
    async findById(id: number): Promise<UserResponse | null> {
        const [rows] = await pool.execute<(User & RowDataPacket)[]>(
            'SELECT id, username, email, firstName, lastName, role, createdAt, updatedAt FROM users WHERE id = ?',
            [id]
        );
        return rows[0] || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const [rows] = await pool.execute<(User & RowDataPacket)[]>(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0] || null;
    }

    async findAll(): Promise<UserResponse[]> {
        const [rows] = await pool.execute<(UserResponse & RowDataPacket)[]>(
            'SELECT id, username, email, firstName, lastName, role, createdAt, updatedAt FROM users'
        );
        return rows;
    }

    async create(user: UserRegister): Promise<UserResponse> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO users (username, email, password, firstName, lastName, role) VALUES (?, ?, ?, ?, ?, ?)',
            [user.username, user.email, hashedPassword, user.firstName, user.lastName, 'user']
        );

        const newUser = await this.findById(result.insertId);
        if (!newUser) throw new Error('Failed to create user');
        return newUser;
    }

    async update(id: number, user: UserUpdate): Promise<UserResponse> {
        const updates: string[] = [];
        const values: any[] = [];

        if (user.username) {
            updates.push('username = ?');
            values.push(user.username);
        }
        if (user.email) {
            updates.push('email = ?');
            values.push(user.email);
        }
        if (user.password) {
            updates.push('password = ?');
            values.push(await bcrypt.hash(user.password, 10));
        }
        if (user.firstName) {
            updates.push('firstName = ?');
            values.push(user.firstName);
        }
        if (user.lastName) {
            updates.push('lastName = ?');
            values.push(user.lastName);
        }

        if (updates.length === 0) return this.findById(id) as Promise<UserResponse>;

        values.push(id);
        await pool.execute(
            `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
            values
        );

        const updatedUser = await this.findById(id);
        if (!updatedUser) throw new Error('User not found');
        return updatedUser;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await pool.execute<ResultSetHeader>(
            'DELETE FROM users WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    async validateCredentials(email: string, password: string): Promise<User | null> {
        const user = await this.findByEmail(email);
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        return isValid ? user : null;
    }
}