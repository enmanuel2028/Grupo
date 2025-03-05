import { AbstractProducto } from '../../../domain/productos/AbstractProducto';
import { ProductoService, UpdateProductoDTO } from '../../../domain/productos/DomainProductos';

/**
 * Caso de uso para actualizar un producto existente.
 * Sigue el principio de responsabilidad única.
 */
export class UpdateProductoUseCase {
  constructor(private readonly productoService: ProductoService) {}

  /**
   * Ejecuta el caso de uso.
   * @param id - El identificador del producto a actualizar.
   * @param productoData - Los datos actualizados del producto.
   * @returns Promesa que resuelve al producto actualizado.
   * @throws Error si los datos son inválidos o el producto no existe.
   */
  async execute(id: string, productoData: UpdateProductoDTO): Promise<AbstractProducto> {
    // Validar ID
    if (!id) {
      throw new Error('El ID del producto es requerido');
    }
    
    // Validar que haya al menos un campo para actualizar
    if (Object.keys(productoData).length === 0) {
      throw new Error('Se debe proporcionar al menos un campo para actualizar');
    }
    
    // Validar datos de entrada
    this.validateInput(productoData);
    
    // Actualizar el producto
    return this.productoService.updateProducto(id, productoData);
  }

  /**
   * Valida los datos de entrada para la actualización de un producto.
   * @param data - Los datos a validar.
   * @throws Error si los datos son inválidos.
   */
  private validateInput(data: UpdateProductoDTO): void {
    if (data.nombre !== undefined && data.nombre.trim() === '') {
      throw new Error('El nombre del producto no puede estar vacío');
    }
    
    if (data.descripcion !== undefined && data.descripcion.trim() === '') {
      throw new Error('La descripción del producto no puede estar vacía');
    }
    
    if (data.precio !== undefined && data.precio < 0) {
      throw new Error('El precio del producto debe ser un valor positivo');
    }
    
    if (data.stock !== undefined && data.stock < 0) {
      throw new Error('El stock del producto debe ser un valor positivo');
    }
    
    if (data.descuento !== undefined && (data.descuento < 0 || data.descuento > 100)) {
      throw new Error('El descuento debe estar entre 0 y 100');
    }
  }
}