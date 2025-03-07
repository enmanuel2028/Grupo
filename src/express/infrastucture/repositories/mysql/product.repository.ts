import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../../config/database';
import { Product, ProductCreate, ProductUpdate, ProductResponse } from '../../../domain/models/product.model';
import { IProductRepository } from '../../../domain/repositories/product.repository';

export class MySQLProductRepository implements IProductRepository {
    async findById(id: number): Promise<ProductResponse | null> {
        const [rows] = await pool.execute<(Product & RowDataPacket)[]>(
            'SELECT * FROM products WHERE id = ?',
            [id]
        );
        return rows[0] || null;
    }

    async findAll(): Promise<ProductResponse[]> {
        const [rows] = await pool.execute<(Product & RowDataPacket)[]>(
            'SELECT * FROM products'
        );
        return rows;
    }

    async findByCategory(category: string): Promise<ProductResponse[]> {
        const [rows] = await pool.execute<(Product & RowDataPacket)[]>(
            'SELECT * FROM products WHERE category = ?',
            [category]
        );
        return rows;
    }

    async search(query: string): Promise<ProductResponse[]> {
        const searchQuery = `%${query}%`;
        const [rows] = await pool.execute<(Product & RowDataPacket)[]>(
            'SELECT * FROM products WHERE name LIKE ? OR description LIKE ?',
            [searchQuery, searchQuery]
        );
        return rows;
    }

    async create(product: ProductCreate): Promise<ProductResponse> {
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO products (name, description, price, stock, category, imageUrl) VALUES (?, ?, ?, ?, ?, ?)',
            [product.name, product.description, product.price, product.stock, product.category, product.imageUrl]
        );

        const newProduct = await this.findById(result.insertId);
        if (!newProduct) throw new Error('Failed to create product');
        return newProduct;
    }

    async update(id: number, product: ProductUpdate): Promise<ProductResponse> {
        const updates: string[] = [];
        const values: any[] = [];

        if (product.name) {
            updates.push('name = ?');
            values.push(product.name);
        }
        if (product.description) {
            updates.push('description = ?');
            values.push(product.description);
        }
        if (product.price !== undefined) {
            updates.push('price = ?');
            values.push(product.price);
        }
        if (product.stock !== undefined) {
            updates.push('stock = ?');
            values.push(product.stock);
        }
        if (product.category) {
            updates.push('category = ?');
            values.push(product.category);
        }
        if (product.imageUrl) {
            updates.push('imageUrl = ?');
            values.push(product.imageUrl);
        }

        if (updates.length === 0) return this.findById(id) as Promise<ProductResponse>;

        values.push(id);
        await pool.execute(
            `UPDATE products SET ${updates.join(', ')} WHERE id = ?`,
            values
        );

        const updatedProduct = await this.findById(id);
        if (!updatedProduct) throw new Error('Product not found');
        return updatedProduct;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await pool.execute<ResultSetHeader>(
            'DELETE FROM products WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    async updateStock(id: number, quantity: number): Promise<boolean> {
        const [result] = await pool.execute<ResultSetHeader>(
            'UPDATE products SET stock = stock + ? WHERE id = ?',
            [quantity, id]
        );
        return result.affectedRows > 0;
    }
}