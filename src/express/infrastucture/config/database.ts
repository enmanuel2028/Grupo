import mysql, { PoolOptions } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: './env/.env' });

if (!process.env['DB_HOST'] || !process.env['DB_USER'] || !process.env['DB_PASSWORD'] || !process.env['DB_NAME']) {
    throw new Error('Database configuration environment variables are not properly set');
}

const poolConfig: PoolOptions = {
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
    port: parseInt(process.env['DB_PORT'] || '3306'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(poolConfig);

export const getConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection successful');
        return connection;
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
};

export default pool;