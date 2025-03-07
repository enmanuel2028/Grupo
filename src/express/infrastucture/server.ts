import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getConnection } from './config/database';

// Load environment variables
dotenv.config({ path: './env/.env' });

// Create Express application
const app: Application = express();

// Middleware
app.use(cors({
    origin: process.env['ALLOWED_ORIGINS']?.split(','),
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
import productRoutes from './routes/productRoutes';

app.use(process.env['API_PREFIX'] || '/api/v1', [
    productRoutes
]);

// Test database connection
getConnection()
    .then(() => {
        console.log('Database connection test successful');
    })
    .catch((error) => {
        console.error('Database connection test failed:', error);
    });

// Start server
const PORT = process.env['PORT'] || 3000;
const HOST = process.env['HOST'] || 'localhost';

app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

export default app;