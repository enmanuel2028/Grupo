import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../../config/database';
import { Order, OrderCreate, OrderUpdate, OrderResponse } from '../../../domain/models/order.model';
import { IOrderRepository } from '../../../domain/repositories/order.repository';

export class MySQLOrderRepository implements IOrderRepository {
    async findById(id: number): Promise<OrderResponse | null> {
        const [rows] = await pool.execute<(Order & RowDataPacket)[]>(
            'SELECT * FROM orders WHERE id = ?',
            [id]
        );
        
        if (!rows[0]) return null;
        
        const items = await this.getOrderItems(rows[0].id!);
        return { ...rows[0], items };
    }

    async findByUserId(userId: number): Promise<OrderResponse[]> {
        const [rows] = await pool.execute<(Order & RowDataPacket)[]>(
            'SELECT * FROM orders WHERE userId = ?',
            [userId]
        );

        const orders = await Promise.all(
            rows.map(async (order) => {
                const items = await this.getOrderItems(order.id!);
                return { ...order, items };
            })
        );

        return orders;
    }

    async findAll(): Promise<OrderResponse[]> {
        const [rows] = await pool.execute<(Order & RowDataPacket)[]>(
            'SELECT * FROM orders'
        );

        const orders = await Promise.all(
            rows.map(async (order) => {
                const items = await this.getOrderItems(order.id!);
                return { ...order, items };
            })
        );

        return orders;
    }

    async create(order: OrderCreate): Promise<OrderResponse> {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const [orderResult] = await connection.execute<ResultSetHeader>(
                'INSERT INTO orders (userId, status, total, shippingAddress, paymentMethod) VALUES (?, ?, ?, ?, ?)',
                [order.userId, 'pending', order.total, order.shippingAddress, order.paymentMethod]
            );

            const orderId = orderResult.insertId;

            await Promise.all(
                order.items.map(async (item) => {
                    await connection.execute(
                        'INSERT INTO order_items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)',
                        [orderId, item.productId, item.quantity, item.price]
                    );
                })
            );

            await connection.commit();

            const newOrder = await this.findById(orderId);
            if (!newOrder) throw new Error('Failed to create order');
            return newOrder;

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    async update(id: number, order: OrderUpdate): Promise<OrderResponse> {
        const updates: string[] = [];
        const values: any[] = [];

        if (order.status) {
            updates.push('status = ?');
            values.push(order.status);
        }
        if (order.total !== undefined) {
            updates.push('total = ?');
            values.push(order.total);
        }
        if (order.shippingAddress) {
            updates.push('shippingAddress = ?');
            values.push(order.shippingAddress);
        }
        if (order.paymentMethod) {
            updates.push('paymentMethod = ?');
            values.push(order.paymentMethod);
        }

        if (updates.length === 0) return this.findById(id) as Promise<OrderResponse>;

        values.push(id);
        await pool.execute(
            `UPDATE orders SET ${updates.join(', ')} WHERE id = ?`,
            values
        );

        const updatedOrder = await this.findById(id);
        if (!updatedOrder) throw new Error('Order not found');
        return updatedOrder;
    }

    async updateStatus(id: number, status: Order['status']): Promise<boolean> {
        const [result] = await pool.execute<ResultSetHeader>(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, id]
        );
        return result.affectedRows > 0;
    }

    async delete(id: number): Promise<boolean> {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            await connection.execute(
                'DELETE FROM order_items WHERE orderId = ?',
                [id]
            );

            const [result] = await connection.execute<ResultSetHeader>(
                'DELETE FROM orders WHERE id = ?',
                [id]
            );

            await connection.commit();
            return result.affectedRows > 0;

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    async getOrderItems(orderId: number): Promise<OrderResponse['items']> {
        const [rows] = await pool.execute<(RowDataPacket & {
            id: number;
            orderId: number;
            productId: number;
            quantity: number;
            price: number;
            product_name: string;
            product_imageUrl: string | null;
        })[]>(
            `SELECT oi.*, p.name as product_name, p.imageUrl as product_imageUrl
            FROM order_items oi
            LEFT JOIN products p ON oi.productId = p.id
            WHERE oi.orderId = ?`,
            [orderId]
        );

        return rows.map(item => ({
            id: item.id,
            orderId: item.orderId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            product: {
                name: item.product_name,
                imageUrl: item.product_imageUrl || undefined
            }
        }));
    }
}