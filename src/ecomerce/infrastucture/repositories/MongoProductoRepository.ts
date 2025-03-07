import { AbstractProducto } from '../../domain/productos/AbstractProducto';
import { ProductoNull } from '../../domain/productos/ProductoNull';
import { ProductoRepository } from '../../domain/productos/DomainProductos';
import { ProductoMapper } from './mappers/ProductoMapper';
import { ProductoDocument } from './types/ProductoDocument';

/**
 * Implementación del repositorio de productos utilizando MongoDB.
 * Esta es una implementación simulada para fines de demostración.
 */
export class MongoProductoRepository implements ProductoRepository {
  private productos: ProductoDocument[] = [];
  private mapper: ProductoMapper;

  constructor() {
    this.mapper = new ProductoMapper();
  }

  async findById(id: string): Promise<AbstractProducto> {
    const productoDoc = this.productos.find(p => p._id === id);
    return productoDoc ? this.mapper.toDomain(productoDoc) : ProductoNull.getInstance();
  }

  async findAll(): Promise<AbstractProducto[]> {
    return this.productos.map(doc => this.mapper.toDomain(doc));
  }

  async findByCategoria(categoriaId: string): Promise<AbstractProducto[]> {
    return this.productos
      .filter(p => p.categoriaId === categoriaId)
      .map(doc => this.mapper.toDomain(doc));
  }

  async findDestacados(): Promise<AbstractProducto[]> {
    return this.productos
      .filter(p => p.destacado)
      .map(doc => this.mapper.toDomain(doc));
  }

  async save(producto: AbstractProducto): Promise<AbstractProducto> {
    if (producto.getTipo() === 'NULL') {
      throw new Error('No se puede guardar un ProductoNull');
    }

    const existingProduct = await this.findById(producto.getId().toString());
    if (existingProduct.getTipo() !== 'NULL') {
      throw new Error(`El producto con ID ${producto.getId()} ya existe`);
    }

    const productoDoc = this.mapper.toDocument(producto);
    this.productos.push(productoDoc);
    return producto;
  }

  async update(producto: AbstractProducto): Promise<AbstractProducto> {
    if (producto.getTipo() === 'NULL') {
      throw new Error('No se puede actualizar un ProductoNull');
    }

    const index = this.productos.findIndex(p => p._id === producto.getId().toString());
    if (index === -1) {
      throw new Error(`Producto con ID ${producto.getId()} no encontrado`);
    }

    this.productos[index] = this.mapper.toDocument(producto);
    return producto;
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.productos.length;
    this.productos = this.productos.filter(p => p._id !== id);
    return this.productos.length < initialLength;
  }
}