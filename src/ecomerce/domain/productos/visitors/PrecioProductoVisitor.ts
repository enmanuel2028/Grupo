/**
 * @fileoverview Implementación del patrón Visitor para calcular precios de productos.
 * Permite añadir nuevas operaciones a la jerarquía de productos sin modificar las clases.
 */

import { ProductoVisitor } from '../AbstractProducto';
import { Producto } from '../Producto';
import { ProductoDigital } from '../ProductoDigital';
import { ProductoNull } from '../ProductoNull';
import { Money } from '../../value-objects/Money';

/**
 * Visitor que calcula el precio final de un producto aplicando lógicas específicas
 * según el tipo de producto.
 */
export class PrecioProductoVisitor implements ProductoVisitor<Money> {
  private readonly impuestoGeneral: number;
  private readonly impuestoDigital: number;

  /**
   * @param impuestoGeneral - Porcentaje de impuesto para productos estándar (0-100)
   * @param impuestoDigital - Porcentaje de impuesto para productos digitales (0-100)
   */
  constructor(impuestoGeneral: number = 21, impuestoDigital: number = 10) {
    this.impuestoGeneral = impuestoGeneral;
    this.impuestoDigital = impuestoDigital;
  }

  /**
   * Visita un producto estándar y calcula su precio final con impuestos.
   * @param producto - El producto estándar a visitar.
   * @returns El precio final con impuestos.
   */
  public visitProductoEstandar(producto: Producto): Money {
    // 1. Obtener precio base con descuento aplicado
    const precioConDescuento = producto.calcularPrecioFinal();
    
    // 2. Aplicar impuesto general
    const factor = 1 + (this.impuestoGeneral / 100);
    
    // 3. Devolver precio final
    return Money.fromValue(
      precioConDescuento.getAmount() * factor,
      precioConDescuento.getCurrency()
    );
  }

  /**
   * Visita un producto digital y calcula su precio final con impuestos.
   * @param producto - El producto digital a visitar.
   * @returns El precio final con impuestos.
   */
  public visitProductoDigital(producto: ProductoDigital): Money {
    // 1. Obtener precio base con descuento aplicado
    const precioConDescuento = producto.calcularPrecioFinal();
    
    // 2. Aplicar impuesto digital
    const factor = 1 + (this.impuestoDigital / 100);
    
    // 3. Devolver precio final
    return Money.fromValue(
      precioConDescuento.getAmount() * factor,
      precioConDescuento.getCurrency()
    );
  }

  /**
   * Visita un producto personalizado (si se implementara en el futuro).
   * @param producto - El producto personalizado a visitar.
   * @returns El precio final con impuestos.
   */
  public visitProductoPersonalizado(producto: any): Money {
    // Implementación futura para productos personalizados
    // Por ahora, aplicamos el mismo tratamiento que a los productos estándar
    return this.visitProductoEstandar(producto);
  }

  /**
   * Visita un producto nulo y devuelve precio cero.
   * @param producto - El producto nulo a visitar.
   * @returns Siempre Money.zero().
   */
  public visitProductoNull(producto: ProductoNull): Money {
    return Money.zero();
  }
}