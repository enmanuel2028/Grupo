/**
 * @fileoverview Implementación del patrón Null Object para productos.
 * Proporciona un objeto seguro para usar cuando no se encuentra un producto.
 */

import { AbstractProducto, ProductoVisitor } from './AbstractProducto';
import { ProductId } from '../value-objects/ProductId';
import { Money } from '../value-objects/Money';

/**
 * Implementación del patrón Null Object para productos.
 * Proporciona un objeto seguro para usar cuando no se encuentra un producto.
 * Implementa el patrón Singleton para garantizar una única instancia.
 */
export class ProductoNull extends AbstractProducto {
  private static instance: ProductoNull;

  /**
   * Constructor privado para implementar el patrón Singleton.
   */
  private constructor() {
    super(
      ProductId.create(),
      'Producto no disponible',
      'Este producto no existe o no está disponible',
      Money.zero(),
      0,
      'null-category',
      '',
      new Date(),
      new Date()
    );
  }

  /**
   * Obtiene la única instancia de ProductoNull (patrón Singleton).
   * @returns La instancia de ProductoNull.
   */
  public static getInstance(): ProductoNull {
    if (!ProductoNull.instance) {
      ProductoNull.instance = new ProductoNull();
    }
    return ProductoNull.instance;
  }

  /**
   * Implementación del método abstracto para obtener el tipo de producto.
   * @returns El tipo de producto, en este caso "NULL".
   */
  public getTipo(): string {
    return 'NULL';
  }

  /**
   * Implementación del método abstracto para calcular el precio final.
   * @returns Siempre Money.zero() para un producto nulo.
   */
  public calcularPrecioFinal(): Money {
    return Money.zero();
  }

  /**
   * Implementa el método del patrón Visitor.
   * @param visitor - El visitante que procesará el producto.
   * @returns El resultado del procesamiento del visitante.
   */
  public accept<T>(visitor: ProductoVisitor<T>): T {
    return visitor.visitProductoNull(this);
  }

  /**
   * Implementa el método del patrón Prototype.
   * @returns La misma instancia, ya que es un Singleton.
   */
  public clone(): AbstractProducto {
    return this; // Devuelve la misma instancia para mantener el patrón Singleton
  }

  /**
   * Sobrescribe el método para verificar disponibilidad.
   * @returns Siempre false para un producto nulo.
   */
  public override estaDisponible(): boolean {
    return false;
  }

  /**
   * Sobrescribe el método para reducir stock.
   * No hace nada en un producto nulo.
   * @throws Error siempre, ya que no se puede reducir stock de un producto nulo.
   */
  public override reducirStock(cantidad: number): void {
    throw new Error('No se puede reducir el stock de un producto nulo');
  }

  /**
   * Sobrescribe el método para aumentar stock.
   * No hace nada en un producto nulo.
   * @throws Error siempre, ya que no se puede aumentar stock de un producto nulo.
   */
  public override aumentarStock(cantidad: number): void {
    throw new Error('No se puede aumentar el stock de un producto nulo');
  }

  /**
   * Sobrescribe todos los setters para que lancen error.
   * @throws Error siempre, ya que no se puede modificar un producto nulo.
   */
  public override setNombre(nombre: string): void {
    throw new Error('No se puede modificar un producto nulo');
  }

  public override setDescripcion(descripcion: string): void {
    throw new Error('No se puede modificar un producto nulo');
  }

  public override setPrecio(precio: Money): void {
    throw new Error('No se puede modificar un producto nulo');
  }

  public override setStock(stock: number): void {
    throw new Error('No se puede modificar un producto nulo');
  }

  public override setImagenUrl(imagenUrl: string): void {
    throw new Error('No se puede modificar un producto nulo');
  }

  /**
   * Sobrescribe el método shouldEmitEvents para evitar la emisión de eventos.
   * @returns Siempre false para un producto nulo.
   */
  protected override shouldEmitEvents(): boolean {
    return false;
  }

  /**
   * Crea una representación en cadena del producto nulo.
   * @returns Una cadena que indica que es un producto nulo.
   */
  public override toString(): string {
    return 'ProductoNull [Producto no disponible]';
  }
}