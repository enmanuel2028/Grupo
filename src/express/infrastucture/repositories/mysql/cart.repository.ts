import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../../config/database';
import { CartItemCreate, CartItemUpdate, CartItemResponse, Cart } from '../../../domain/models/cart.model';
import { ICartRepository } from '../../../domain/repositories/cart.repository';

export class MySQLCartRepository implements ICartRepository {
    async findByUserId(userId: number): Promise<Cart> {
        const items = await this.getItems(userId);
        const total = items.reduce((sum, item) => {
            return sum + (item.product?.price || 0) * item.quantity;
        }, 0);

        return {
            userId,
            items,
            total
        };
    }

    async addItem(item: CartItemCreate): Promise<CartItemResponse> {
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO cart_items (userId, productId, quantity) VALUES (?, ?, ?)',
            [item.userId, item.productId, item.quantity]
        );

        const newItem = await this.getItem(result.insertId);
        if (!newItem) throw new Error('Failed to create cart item');
        return newItem;
    }

    async updateItem(id: number, item: CartItemUpdate): Promise<CartItemResponse> {
        if (item.quantity !== undefined) {
            await pool.execute(
                'UPDATE cart_items SET quantity = ? WHERE id = ?',
                [item.quantity, id]
            );
        }

        const updatedItem = await this.getItem(id);
        if (!updatedItem) throw new Error('Cart item not found');
        return updatedItem;
    }

    async removeItem(id: number): Promise<boolean> {
        const [result] = await pool.execute<ResultSetHeader>(
            'DELETE FROM cart_items WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    async clearCart(userId: number): Promise<boolean> {
        const [result] = await pool.execute<ResultSetHeader>(
            'DELETE FROM cart_items WHERE userId = ?',
            [userId]
        );
        return result.affectedRows > 0;
    }

    async getItem(id: number): Promise<CartItemResponse | null> {
        const [rows] = await pool.execute<(CartItemResponse & RowDataPacket)[]>(
            `SELECT ci.*, p.name as product_name, p.price as product_price, p.imageUrl as product_imageUrl
            FROM cart_items ci
            LEFT JOIN products p ON ci.productId = p.id
            WHERE ci.id = ?`,
            [id]
        );

        if (!rows[0]) return null;

        const item = rows[0];
        return {
            ...item,
            product: {
                name: item['product_name'],
                price: item['product_price'],
                imageUrl: item['product_imageUrl']
            }
        };
    }

    async getItems(userId: number): Promise<CartItemResponse[]> {
        const [rows] = await pool.execute<(CartItemResponse & RowDataPacket)[]>(
            `SELECT ci.*, p.name as product_name, p.price as product_price, p.imageUrl as product_imageUrl
            FROM cart_items ci
            LEFT JOIN products p ON ci.productId = p.id
            WHERE ci.userId = ?`,
            [userId]
        );

        return rows.map(item => ({
            ...item,
            product: {
                name: item['product_name'],
                price: item['product_price'],
                imageUrl: item['product_imageUrl']
            }
        }));
    }
}