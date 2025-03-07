/**
 * @fileoverview Implementación de productos naturales para la tienda Buena Vida.
 * Extiende la clase abstracta AbstractProducto para manejar productos orgánicos,
 * suplementos naturales, cosméticos naturales y productos para el hogar.
 */

import { AbstractProducto, ProductoVisitor } from './AbstractProducto';
import { ProductId } from '../value-objects/ProductId';
import { Money } from '../value-objects/Money';
import { ProductoEventEmitter } from '../events/ProductoEventEmitter';

/**
 * Tipo de producto natural disponible en la tienda.
 */
export enum TipoProductoNatural {
  ALIMENTO_ORGANICO = 'ALIMENTO_ORGANICO',
  SUPLEMENTO_NATURAL = 'SUPLEMENTO_NATURAL',
  COSMETICO_NATURAL = 'COSMETICO_NATURAL',
  PRODUCTO_HOGAR = 'PRODUCTO_HOGAR',
  LIBRO_RECURSO = 'LIBRO_RECURSO'
}

/**
 * Implementación de productos naturales específicos para Buena Vida.
 */
export class ProductoNatural extends AbstractProducto {
  constructor(
    id: ProductId,
    nombre: string,
    descripcion: string,
    precio: Money,
    stock: number,
    categoriaId: string,
    imagenUrl: string,
    private readonly tipoProducto: TipoProductoNatural,
    private readonly ingredientes: string[],
    private readonly beneficios: string[],
    private readonly certificaciones: string[] = [],
    private descuento: number = 0,
    private destacado: boolean = false,
    private etiquetas: string[] = [],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    eventEmitter?: ProductoEventEmitter
  ) {
    super(
      id,
      nombre,
      descripcion,
      precio,
      stock,
      categoriaId,
      imagenUrl,
      createdAt,
      updatedAt,
      eventEmitter
    );
    this.validarIngredientes(ingredientes);
    this.validarBeneficios(beneficios);
  }

  /**
   * Valida que la lista de ingredientes no esté vacía y sea válida.
   */
  private validarIngredientes(ingredientes: string[]): void {
    if (!ingredientes || ingredientes.length === 0) {
      throw new Error('El producto natural debe tener al menos un ingrediente');
    }
  }

  /**
   * Valida que la lista de beneficios no esté vacía y sea válida.
   */
  private validarBeneficios(beneficios: string[]): void {
    if (!beneficios || beneficios.length === 0) {
      throw new Error('El producto natural debe tener al menos un beneficio listado');
    }
  }

  /**
   * Obtiene el tipo de producto natural.
   */
  public getTipoProducto(): TipoProductoNatural {
    return this.tipoProducto;
  }

  /**
   * Obtiene la lista de ingredientes del producto.
   */
  public getIngredientes(): string[] {
    return [...this.ingredientes];
  }

  /**
   * Obtiene la lista de beneficios del producto.
   */
  public getBeneficios(): string[] {
    return [...this.beneficios];
  }

  /**
   * Obtiene las certificaciones del producto.
   */
  public getCertificaciones(): string[] {
    return [...this.certificaciones];
  }

  /**
   * Obtiene el descuento aplicado al producto.
   */
  public getDescuento(): number {
    return this.descuento;
  }

  /**
   * Establece el descuento para el producto.
   */
  public setDescuento(descuento: number): void {
    if (descuento < 0 || descuento > 100) {
      throw new Error('El descuento debe estar entre 0 y 100');
    }
    this.descuento = descuento;
    this.actualizarProducto();
  }

  /**
   * Verifica si el producto está destacado.
   */
  public isDestacado(): boolean {
    return this.destacado;
  }

  /**
   * Establece si el producto está destacado.
   */
  public setDestacado(destacado: boolean): void {
    this.destacado = destacado;
    this.actualizarProducto();
  }

  /**
   * Obtiene las etiquetas del producto.
   */
  public getEtiquetas(): string[] {
    return [...this.etiquetas];
  }

  /**
   * Acepta un visitador para el patrón Visitor.
Constructor of class 'Money' is private and only accessible within the class declaration.ts(2673)
const descuentoAplicado: number   */
  public accept<T>(visitor: ProductoVisitor<T>): T {
    return visitor.visitProductoNatural(this);
  }

  /**
   * Actualiza el producto y emite un evento de actualización.
   * Este método se llama internamente cuando se modifican las propiedades del producto.
   */
  private actualizarProducto(): void {
    const oldUpdatedAt = this.updatedAt;
    this.updatedAt = new Date();
    if (this.eventEmitter) {
      this.eventEmitter.emitProductoActualizado(
        { id: this.id.toString() },
        'updatedAt',
        oldUpdatedAt,
        this.updatedAt
      );
    }
  }

  /**
   * Obtiene el tipo de producto.
   */
  public getTipo(): string {
    return this.tipoProducto;
  }

  /**
   * Calcula el precio final del producto incluyendo descuentos.
   */
  public calcularPrecioFinal(): Money {
    const precioBase = this.precio.getAmount();
    const descuentoAplicado = precioBase * (this.descuento / 100);
    return Money.fromValue(precioBase - descuentoAplicado, this.precio.getCurrency());
  }

  /**
   * Implementación del método de clonación.
   */
  public clone(): ProductoNatural {
    return new ProductoNatural(
      this.id,
      this.nombre,
      this.descripcion,
      this.precio,
      this.stock,
      this.categoriaId,
      this.imagenUrl,
      this.tipoProducto,
      [...this.ingredientes],
      [...this.beneficios],
      [...this.certificaciones],
      this.descuento,
      this.destacado,
      [...this.etiquetas],
      new Date(this.createdAt),
      new Date(this.updatedAt),
      this.eventEmitter
    );
  }
}