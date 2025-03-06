import { AbstractProducto } from '../AbstractProducto';
import { Producto } from '../Producto';
import { ProductoNull } from '../ProductoNull';
import { ProductId } from '../../value-objects/ProductId';
import { Money } from '../../value-objects/Money';
import { 
  ProductoRepository, 
  ProductoService, 
  CreateProductoDTO, 
  UpdateProductoDTO 
} from '../DomainProductos';

/**
 * Implementación del servicio de dominio para productos.
 */
export class ProductoServiceImpl implements ProductoService {
  constructor(private readonly productoRepository: ProductoRepository) {}

  /**
   * Obtiene un producto por su identificador.
   * @param id - El identificador del producto.
   * @returns Promesa que resuelve al producto encontrado o ProductoNull si no existe.
   */
  async getProductoById(id: string): Promise<AbstractProducto> {
    try {
      return await this.productoRepository.findById(id);
    } catch (error) {
      console.error(`Error al obtener producto con ID ${id}:`, error);
      return ProductoNull.getInstance();
    }
  }

  /**
   * Obtiene todos los productos.
   * @returns Promesa que resuelve a un array de productos.
   */
  async getAllProductos(): Promise<AbstractProducto[]> {
    return this.productoRepository.findAll();
  }

  /**
   * Obtiene productos por categoría.
   * @param categoriaId - El identificador de la categoría.
   * @returns Promesa que resuelve a un array de productos.
   */
  async getProductosByCategoria(categoriaId: string): Promise<AbstractProducto[]> {
    return this.productoRepository.findByCategoria(categoriaId);
  }

  /**
   * Obtiene productos destacados.
   * @returns Promesa que resuelve a un array de productos destacados.
   */
  async getProductosDestacados(): Promise<AbstractProducto[]> {
    return this.productoRepository.findDestacados();
  }

  /**
   * Crea un nuevo producto.
   * @param productoData - Los datos del producto a crear.
   * @returns Promesa que resuelve al producto creado.
   */
  async createProducto(productoData: CreateProductoDTO): Promise<AbstractProducto> {
    const { 
      nombre, 
      descripcion, 
      precio, 
      stock, 
      categoriaId, 
      imagenUrl, 
      descuento = 0, 
      destacado = false 
    } = productoData;

    // Generar un ID único (en una implementación real podría ser un UUID)
    const id = ProductId.create();
    
    const nuevoProducto = new Producto(
      id,
      nombre,
      descripcion,
      Money.of(precio),
      stock,
      categoriaId,
      imagenUrl,
      descuento,
      destacado
    );

    return this.productoRepository.save(nuevoProducto);
  }

  /**
   * Actualiza un producto existente.
   * @param id - El identificador del producto a actualizar.
   * @param productoData - Los datos actualizados del producto.
   * @returns Promesa que resuelve al producto actualizado.
   * @throws Error si el producto no existe.
   */
  async updateProducto(id: string, productoData: UpdateProductoDTO): Promise<AbstractProducto> {
    const productId = ProductId.fromString(id);
    const producto = await this.productoRepository.findById(productId.getValue());
    
    if (producto.getTipo() === 'NULL') {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    // Actualizar solo los campos proporcionados
    if (productoData.nombre !== undefined) {
      producto.setNombre(productoData.nombre);
    }
    
    if (productoData.descripcion !== undefined) {
      producto.setDescripcion(productoData.descripcion);
    }
    
    if (productoData.precio !== undefined) {
      producto.setPrecio(Money.of(productoData.precio));
    }
    
    if (productoData.stock !== undefined) {
      producto.setStock(productoData.stock);
    }
    
    if (productoData.imagenUrl !== undefined) {
      producto.setImagenUrl(productoData.imagenUrl);
    }
    
    // Campos específicos de Producto
    if (producto instanceof Producto) {
      if (productoData.descuento !== undefined) {
        producto.setDescuento(productoData.descuento);
      }
      
      if (productoData.destacado !== undefined) {
        producto.setDestacado(productoData.destacado);
      }
    }

    return this.productoRepository.update(producto);
  }

  /**
   * Elimina un producto por su identificador.
   * @param id - El identificador del producto a eliminar.
   * @returns Promesa que resuelve a un booleano indicando si se eliminó correctamente.
   */
  async deleteProducto(id: string): Promise<boolean> {
    const productId = ProductId.fromString(id);
    return this.productoRepository.delete(productId.getValue());
  }

  /**
   * Actualiza el stock de un producto.
   * @param id - El identificador del producto.
   * @param cantidad - La cantidad a añadir (positiva) o restar (negativa).
   * @returns Promesa que resuelve al producto con el stock actualizado.
   * @throws Error si el producto no existe o si no hay suficiente stock.
   */
  async updateStock(id: string, cantidad: number): Promise<AbstractProducto> {
    const productId = ProductId.fromString(id);
    const producto = await this.productoRepository.findById(productId.getValue());
    
    if (producto.getTipo() === 'NULL') {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    if (cantidad > 0) {
      producto.aumentarStock(cantidad);
    } else if (cantidad < 0) {
      producto.reducirStock(Math.abs(cantidad));
    }

    return this.productoRepository.update(producto);
  }
}