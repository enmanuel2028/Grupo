import { AbstractProducto } from './AbstractProducto';

/**
 * Interfaz que define el repositorio para productos.
 * Sigue el patrón de puerto en la arquitectura hexagonal.
 */
export interface ProductoRepository {
  /**
   * Busca un producto por su identificador.
   * @param id - El identificador del producto.
   * @returns Promesa que resuelve al producto encontrado.
   */
  findById(id: string): Promise<AbstractProducto>;
  
  /**
   * Obtiene todos los productos.
   * @returns Promesa que resuelve a un array de productos.
   */
  findAll(): Promise<AbstractProducto[]>;
  
  /**
   * Busca productos por categoría.
   * @param categoriaId - El identificador de la categoría.
   * @returns Promesa que resuelve a un array de productos.
   */
  findByCategoria(categoriaId: string): Promise<AbstractProducto[]>;
  
  /**
   * Busca productos destacados.
   * @returns Promesa que resuelve a un array de productos destacados.
   */
  findDestacados(): Promise<AbstractProducto[]>;
  
  /**
   * Guarda un nuevo producto.
   * @param producto - El producto a guardar.
   * @returns Promesa que resuelve al producto guardado.
   */
  save(producto: AbstractProducto): Promise<AbstractProducto>;
  
  /**
   * Actualiza un producto existente.
   * @param producto - El producto con los datos actualizados.
   * @returns Promesa que resuelve al producto actualizado.
   */
  update(producto: AbstractProducto): Promise<AbstractProducto>;
  
  /**
   * Elimina un producto por su identificador.
   * @param id - El identificador del producto a eliminar.
   * @returns Promesa que resuelve a un booleano indicando si se eliminó correctamente.
   */
  delete(id: string): Promise<boolean>;
}

/**
 * Interfaz que define el servicio de dominio para productos.
 */
export interface ProductoService {
  /**
   * Obtiene un producto por su identificador.
   * @param id - El identificador del producto.
   * @returns Promesa que resuelve al producto encontrado.
   */
  getProductoById(id: string): Promise<AbstractProducto>;
  
  /**
   * Obtiene todos los productos.
   * @returns Promesa que resuelve a un array de productos.
   */
  getAllProductos(): Promise<AbstractProducto[]>;
  
  /**
   * Obtiene productos por categoría.
   * @param categoriaId - El identificador de la categoría.
   * @returns Promesa que resuelve a un array de productos.
   */
  getProductosByCategoria(categoriaId: string): Promise<AbstractProducto[]>;
  
  /**
   * Obtiene productos destacados.
   * @returns Promesa que resuelve a un array de productos destacados.
   */
  getProductosDestacados(): Promise<AbstractProducto[]>;
  
  /**
   * Crea un nuevo producto.
   * @param productoData - Los datos del producto a crear.
   * @returns Promesa que resuelve al producto creado.
   */
  createProducto(productoData: CreateProductoDTO): Promise<AbstractProducto>;
  
  /**
   * Actualiza un producto existente.
   * @param id - El identificador del producto a actualizar.
   * @param productoData - Los datos actualizados del producto.
   * @returns Promesa que resuelve al producto actualizado.
   */
  updateProducto(id: string, productoData: UpdateProductoDTO): Promise<AbstractProducto>;
  
  /**
   * Elimina un producto por su identificador.
   * @param id - El identificador del producto a eliminar.
   * @returns Promesa que resuelve a un booleano indicando si se eliminó correctamente.
   */
  deleteProducto(id: string): Promise<boolean>;
  
  /**
   * Actualiza el stock de un producto.
   * @param id - El identificador del producto.
   * @param cantidad - La cantidad a añadir (positiva) o restar (negativa).
   * @returns Promesa que resuelve al producto con el stock actualizado.
   */
  updateStock(id: string, cantidad: number): Promise<AbstractProducto>;
}

/**
 * DTO para la creación de un producto.
 */
export interface CreateProductoDTO {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoriaId: string;
  imagenUrl: string;
  descuento?: number;
  destacado?: boolean;
}

/**
 * DTO para la actualización de un producto.
 * Todos los campos son opcionales.
 */
export interface UpdateProductoDTO {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  stock?: number;
  imagenUrl?: string;
  descuento?: number;
  destacado?: boolean;
}

/**
 * Enumeración de los tipos de productos.
 */
export enum TipoProducto {
  STANDARD = 'STANDARD',
  NULL = 'NULL'
}