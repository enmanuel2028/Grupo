import { AbstractProducto } from '../../../domain/productos/AbstractProducto';
import { CreateProductoDTO, ProductoService } from '../../../domain/productos/DomainProductos';

/**
 * Caso de uso para crear un nuevo producto.
 * Sigue el principio de responsabilidad única.
 */
export class CreateProductoUseCase {
  constructor(private readonly productoService: ProductoService) {}

  /**
   * Ejecuta el caso de uso.
   * @param productoData - Los datos del producto a crear.
   * @returns Promesa que resuelve al producto creado.
   * @throws Error si los datos son inválidos.
   */
  async execute(productoData: CreateProductoDTO): Promise<AbstractProducto> {
    // Validar datos de entrada
    this.validateInput(productoData);
    
    // Crear el producto
    return this.productoService.createProducto(productoData);
  }

  /**
   * Valida los datos de entrada para la creación de un producto.
   * @param data - Los datos a validar.
   * @throws Error si los datos son inválidos.
   */
  private validateInput(data: CreateProductoDTO): void {
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre del producto es requerido');
    }
    
    if (!data.descripcion || data.descripcion.trim() === '') {
      throw new Error('La descripción del producto es requerida');
    }
    
    if (data.precio === undefined || data.precio < 0) {
      throw new Error('El precio del producto debe ser un valor positivo');
    }
    
    if (data.stock === undefined || data.stock < 0) {
      throw new Error('El stock del producto debe ser un valor positivo');
    }
    
    if (!data.categoriaId || data.categoriaId.trim() === '') {
      throw new Error('La categoría del producto es requerida');
    }
    
    if (data.descuento !== undefined && (data.descuento < 0 || data.descuento > 100)) {
      throw new Error('El descuento debe estar entre 0 y 100');
    }
  }
}