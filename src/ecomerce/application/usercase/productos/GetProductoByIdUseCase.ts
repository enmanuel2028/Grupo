import { AbstractProducto } from '../../../domain/productos/AbstractProducto';
import { ProductoService } from '../../../domain/productos/DomainProductos';

/**
 * Caso de uso para obtener un producto por su ID.
 * Sigue el principio de responsabilidad única.
 */
export class GetProductoByIdUseCase {
  constructor(private readonly productoService: ProductoService) {}

  /**
   * Ejecuta el caso de uso.
   * @param id - El identificador del producto a buscar.
   * @returns Promesa que resuelve al producto encontrado.
   */
  async execute(id: string): Promise<AbstractProducto> {
    if (!id) {
      throw new Error('El ID del producto es requerido');
    }
    
    return this.productoService.getProductoById(id);
  }
}