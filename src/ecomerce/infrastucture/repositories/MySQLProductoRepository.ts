import { AbstractProducto } from '../../domain/productos/AbstractProducto';
import { ProductoNull } from '../../domain/productos/ProductoNull';
import { ProductoRepository } from '../../domain/productos/DomainProductos';
import { ProductoMapper } from './mappers/ProductoMapper';
import mysql from 'mysql2/promise';
import { ProductoDocument } from './types/ProductoDocument';

/**
 * Implementación del repositorio de productos utilizando MySQL.
 */
export class MySQLProductoRepository implements ProductoRepository {
  private connection: mysql.Pool;
  private mapper: ProductoMapper;

  constructor() {
    this.connection = mysql.createPool({
      host: process.env['MYSQL_HOST'] || 'localhost',
      user: process.env['MYSQL_USER'] || 'root',
      password: process.env['MYSQL_PASSWORD'] || '',
      database: process.env['MYSQL_DATABASE'] || 'ecommerce',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    this.mapper = new ProductoMapper();
  }

  async findById(id: string): Promise<AbstractProducto> {
    try {
      const [rows] = await this.connection.execute(
        'SELECT * FROM productos WHERE id = ?',
        [id]
      );
      if (!Array.isArray(rows) || rows.length === 0) {
        return ProductoNull.getInstance();
      }
      const productoData = rows[0] as ProductoDocument;
      return this.mapper.toDomain(productoData);
    } catch (error) {
      console.error('Error al buscar producto por ID:', error);
      return ProductoNull.getInstance();
    }
  }

  async findAll(): Promise<AbstractProducto[]> {
    try {
      const [rows] = await this.connection.execute('SELECT * FROM productos');
      if (!Array.isArray(rows)) return [];
      return rows.map(row => this.mapper.toDomain(row as ProductoDocument));
    } catch (error) {
      console.error('Error al obtener todos los productos:', error);
      return [];
    }
  }

  async findByCategoria(categoriaId: string): Promise<AbstractProducto[]> {
    try {
      const [rows] = await this.connection.execute(
        'SELECT * FROM productos WHERE categoria_id = ?',
        [categoriaId]
      );
      if (!Array.isArray(rows)) return [];
      return rows.map(row => this.mapper.toDomain(row as ProductoDocument));
    } catch (error) {
      console.error('Error al buscar productos por categoría:', error);
      return [];
    }
  }

  async findDestacados(): Promise<AbstractProducto[]> {
    try {
      const [rows] = await this.connection.execute(
        'SELECT * FROM productos WHERE destacado = true'
      );
      if (!Array.isArray(rows)) return [];
      return rows.map(row => this.mapper.toDomain(row as ProductoDocument));
    } catch (error) {
      console.error('Error al buscar productos destacados:', error);
      return [];
    }
  }

  async save(producto: AbstractProducto): Promise<AbstractProducto> {
    if (producto.getTipo() === 'NULL') {
      throw new Error('No se puede guardar un ProductoNull');
    }

    try {
      const existingProduct = await this.findById(producto.getId().toString());
      if (existingProduct.getTipo() !== 'NULL') {
        throw new Error(`El producto con ID ${producto.getId()} ya existe`);
      }

      const productoData = this.mapper.toDocument(producto);
      await this.connection.execute(
        'INSERT INTO productos (id, nombre, descripcion, precio, stock, categoria_id, imagen_url, destacado, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          productoData._id,
          productoData.nombre,
          productoData.descripcion,
          productoData.precio,
          productoData.stock,
          productoData.categoriaId,
          productoData.imagenUrl,
          productoData.destacado,
          productoData.createdAt,
          productoData.updatedAt
        ]
      );
      return producto;
    } catch (error) {
      console.error('Error al guardar producto:', error);
      throw error;
    }
  }

  async update(producto: AbstractProducto): Promise<AbstractProducto> {
    if (producto.getTipo() === 'NULL') {
      throw new Error('No se puede actualizar un ProductoNull');
    }

    try {
      const productoData = this.mapper.toDocument(producto);
      const [result] = await this.connection.execute(
        'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria_id = ?, imagen_url = ?, destacado = ?, updated_at = ? WHERE id = ?',
        [
          productoData.nombre,
          productoData.descripcion,
          productoData.precio,
          productoData.stock,
          productoData.categoriaId,
          productoData.imagenUrl,
          productoData.destacado,
          productoData.updatedAt,
          productoData._id
        ]
      );

      if ((result as mysql.ResultSetHeader).affectedRows === 0) {
        throw new Error(`Producto con ID ${producto.getId()} no encontrado`);
      }

      return producto;
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const [result] = await this.connection.execute(
        'DELETE FROM productos WHERE id = ?',
        [id]
      );
      return (result as mysql.ResultSetHeader).affectedRows > 0;
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      return false;
    }
  }
}