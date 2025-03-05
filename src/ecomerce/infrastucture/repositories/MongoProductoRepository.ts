import { AbstractProducto } from '../../domain/productos/AbstractProducto';
import { Producto } from '../../domain/productos/Producto';
import { ProductoNull } from '../../domain/productos/ProductoNull';
import { ProductoRepository } from '../../domain/productos/DomainProductos';

// Simulación de un modelo de MongoDB
interface ProductoDocument {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoriaId: string;
  imagenUrl: string;
  descuento: number;
  destacado: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Implementación del repositorio de productos utilizando MongoDB.
 * Esta es una implementación simulada para fines de demostración.
 */
export class MongoProductoRepository implements ProductoRepository {
  // Simulación de una colección de MongoDB
  private productos: ProductoDocument[] = [];

  /**
   * Busca un producto por su identificador.
   * @param id - El identificador del producto.
   * @returns Promesa que resuelve al producto encontrado o ProductoNull si no existe.
   */
  async findById(id: string): Promise<AbstractProducto> {
    const productoDoc = this.productos.find(p => p._id === id);
    
    if (!productoDoc) {
      return ProductoNull.getInstance();
    }
    
    return this.mapToDomain(productoDoc);
  }

  /**
   * Obtiene todos los productos.
   * @returns Promesa que resuelve a un array de productos.
   */
  async findAll(): Promise<AbstractProducto[]> {
    return this.productos.map(doc => this.mapToDomain(doc));
  }

  /**
   * Busca productos por categoría.
   * @param categoriaId - El identificador de la categoría.
   * @returns Promesa que resuelve a un array de productos.
   */
  async findByCategoria(categoriaId: string): Promise<AbstractProducto[]> {
    const productosDoc = this.productos.filter(p => p.categoriaId === categoriaId);
    return productosDoc.map(doc => this.mapToDomain(doc));
  }

  /**
   * Busca productos destacados.
   * @returns Promesa que resuelve a un array de productos destacados.
   */
  async findDestacados(): Promise<AbstractProducto[]> {
    const productosDoc = this.productos.filter(p => p.destacado);
    return productosDoc.map(doc => this.mapToDomain(doc));
  }

  /**
   * Guarda un nuevo producto.
   * @param producto - El producto a guardar.
   * @returns Promesa que resuelve al producto guardado.
   */
  async save(producto: AbstractProducto): Promise<AbstractProducto> {
    if (producto.getTipo() === 'NULL') {
      throw new Error('No se puede guardar un ProductoNull');
    }

    // Verificar si el producto ya existe
    const existingIndex = this.productos.findIndex(p => p._id === producto.getId());
    if (existingIndex !== -1) {
      throw new Error(`El producto con ID ${producto.getId()} ya existe`);
    }

    // Crear documento para MongoDB
    const productoDoc: ProductoDocument = {
      _id: producto.getId(),
      nombre: producto.getNombre(),
      descripcion: producto.getDescripcion(),
      precio: producto.getPrecio(),
      stock: producto.getStock(),
      categoriaId: producto.getCategoriaId(),
      imagenUrl: producto.getImagenUrl(),
      descuento: 0,
      destacado: false,
      createdAt: producto.getCreatedAt(),
      updatedAt: producto.getUpdatedAt()
    };

    // Si es un Producto (no abstracto), obtener propiedades específicas
    if (producto instanceof Producto) {
      productoDoc.descuento = producto.getDescuento();
      productoDoc.destacado = producto.esDestacado();
    }

    // Guardar en la "base de datos"
    this.productos.push(productoDoc);

    return producto;
  }

  /**
   * Actualiza un producto existente.
   * @param producto - El producto con los datos actualizados.
   * @returns Promesa que resuelve al producto actualizado.
   * @throws Error si el producto no existe.
   */
  async update(producto: AbstractProducto): Promise<AbstractProducto> {
    if (producto.getTipo() === 'NULL') {
      throw new Error('No se puede actualizar un ProductoNull');
    }

    const index = this.productos.findIndex(p => p._id === producto.getId());
    
    if (index === -1) {
      throw new Error(`Producto con ID ${producto.getId()} no encontrado`);
    }

    // Actualizar documento
    this.productos[index] = {
      _id: producto.getId(),
      nombre: producto.getNombre(),
      descripcion: producto.getDescripcion(),
      precio: producto.getPrecio(),
      stock: producto.getStock(),
      categoriaId: producto.getCategoriaId(),
      imagenUrl: producto.getImagenUrl(),
      descuento: 0,
      destacado: false,
      createdAt: producto.getCreatedAt(),
      updatedAt: producto.getUpdatedAt()
    };

    // Si es un Producto (no abstracto), actualizar propiedades específicas
    if (producto instanceof Producto) {
      this.productos[index].descuento = producto.getDescuento();
      this.productos[index].destacado = producto.esDestacado();
    }

    return producto;
  }

  /**
   * Elimina un producto por su identificador.
   * @param id - El identificador del producto a eliminar.
   * @returns Promesa que resuelve a un booleano indicando si se eliminó correctamente.
   */
  async delete(id: string): Promise<boolean> {
    const initialLength = this.productos.length;
    this.productos = this.productos.filter(p => p._id !== id);
    
    return this.productos.length < initialLength;
  }

  /**
   * Convierte un documento de MongoDB a una entidad de dominio.
   * @param doc - El documento de MongoDB.
   * @returns La entidad de dominio correspondiente.
   */
  private mapToDomain(doc: ProductoDocument): AbstractProducto {
    return new Producto(
      doc._id,
      doc.nombre,
      doc.descripcion,
      doc.precio,
      doc.stock,
      doc.categoriaId,
      doc.imagenUrl,
      doc.descuento,
      doc.destacado,
      doc.createdAt,
      doc.updatedAt
    );
  }
}