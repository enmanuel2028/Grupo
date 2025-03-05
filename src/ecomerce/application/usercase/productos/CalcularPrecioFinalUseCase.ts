/**
 * @fileoverview Caso de uso para calcular el precio final de un producto.
 * Demuestra el uso de varios patrones de diseño en conjunto.
 */

import { AbstractProducto } from '../../../domain/productos/AbstractProducto';
import { ProductoService } from '../../../domain/productos/DomainProductos';
import { PrecioProductoVisitor } from '../../../domain/productos/visitors/PrecioProductoVisitor';
import { Money } from '../../../domain/value-objects/Money';

/**
 * Resultado del cálculo del precio final.
 */
export interface PrecioFinalResult {
  productoId: string;
  nombre: string;
  precioBase: string;
  precioConDescuento: string;
  precioFinalConImpuestos: string;
  moneda: string;
  descuento: number;
  impuestoAplicado: number;
}

/**
 * Caso de uso para calcular el precio final de un producto incluyendo impuestos.
 * Demuestra el uso de los patrones Visitor, Strategy y Command.
 */
export class CalcularPrecioFinalUseCase {
  /**
   * @param productoService - Servicio de dominio para productos
   * @param impuestoGeneral - Porcentaje de impuesto para productos estándar
   * @param impuestoDigital - Porcentaje de impuesto para productos digitales
   */
  constructor(
    private readonly productoService: ProductoService,
    private readonly impuestoGeneral: number = 21,
    private readonly impuestoDigital: number = 10
  ) {}

  /**
   * Ejecuta el caso de uso.
   * @param productoId - ID del producto para el que se calculará el precio final.
   * @returns Resultado con los detalles del cálculo.
   */
  async execute(productoId: string): Promise<PrecioFinalResult> {
    // 1. Obtener el producto
    const producto = await this.productoService.getProductoById(productoId);
    
    // 2. Crear el visitor para calcular el precio con impuestos
    const precioVisitor = new PrecioProductoVisitor(
      this.impuestoGeneral,
      this.impuestoDigital
    );
    
    // 3. Obtener precios
    const precioBase = producto.getPrecio();
    const precioConDescuento = producto.calcularPrecioFinal();
    
    // 4. Aplicar el visitor para obtener el precio final con impuestos
    const precioFinalConImpuestos = producto.accept(precioVisitor);
    
    // 5. Determinar el impuesto aplicado según el tipo de producto
    const impuestoAplicado = this.determinarImpuestoAplicado(producto);
    
    // 6. Construir y devolver el resultado
    return {
      productoId: producto.getId().getValue(),
      nombre: producto.getNombre(),
      precioBase: precioBase.toString(),
      precioConDescuento: precioConDescuento.toString(),
      precioFinalConImpuestos: precioFinalConImpuestos.toString(),
      moneda: precioBase.getCurrency(),
      descuento: this.obtenerDescuento(producto),
      impuestoAplicado
    };
  }

  /**
   * Determina el impuesto aplicado según el tipo de producto.
   * @param producto - El producto para el que se determinará el impuesto.
   * @returns El porcentaje de impuesto aplicado.
   */
  private determinarImpuestoAplicado(producto: AbstractProducto): number {
    switch (producto.getTipo()) {
      case 'DIGITAL':
        return this.impuestoDigital;
      case 'STANDARD':
      default:
        return this.impuestoGeneral;
    }
  }

  /**
   * Obtiene el descuento aplicado al producto.
   * @param producto - El producto del que se obtendrá el descuento.
   * @returns El porcentaje de descuento.
   */
  private obtenerDescuento(producto: AbstractProducto): number {
    // Intentar obtener el descuento si el producto tiene esa propiedad
    if ('getDescuento' in producto && typeof (producto as any).getDescuento === 'function') {
      return (producto as any).getDescuento();
    }
    
    // Si no tiene la propiedad, asumir que no tiene descuento
    return 0;
  }
}