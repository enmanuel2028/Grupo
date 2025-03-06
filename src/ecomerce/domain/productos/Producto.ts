/**
 * @fileoverview Implementación concreta de un producto estándar.
 * Extiende la clase abstracta AbstractProducto e implementa sus métodos.
 */

import { AbstractProducto, ProductoVisitor } from './AbstractProducto';
import { ProductId } from '../value-objects/ProductId';
import { Money } from '../value-objects/Money';
import { ProductoEventEmitter } from '../events/ProductoEventEmitter';

/**
 * Implementación concreta de un producto estándar en el sistema.
 * Extiende la clase abstracta AbstractProducto.
 */
export class Producto extends AbstractProducto {
  /**
   * @param id - Identificador único del producto
   * @param nombre - Nombre del producto
   * @param descripcion - Descripción detallada del producto
   * @param precio - Precio base del producto
   * @param stock - Cantidad disponible en inventario
   * @param categoriaId - Identificador de la categoría a la que pertenece
   * @param imagenUrl - URL de la imagen principal del producto
   * @param descuento - Porcentaje de descuento aplicado al producto (0-100)
   * @param destacado - Indica si el producto está destacado
   * @param etiquetas - Lista de etiquetas asociadas al producto
   * @param createdAt - Fecha de creación
   * @param updatedAt - Fecha de última actualización
   * @param eventEmitter - Emisor de eventos de dominio
   */
  constructor(
    id: ProductId,
    nombre: string,
    descripcion: string,
    precio: Money,
    stock: number,
    categoriaId: string,
    imagenUrl: string,
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
    this.validarDescuento(descuento);
  }

  /**
   * Obtiene el porcentaje de descuento aplicado al producto.
   * @returns El porcentaje de descuento.
   */
  public getDescuento(): number {
    return this.descuento;
  }

  /**
   * Establece el porcentaje de descuento para el producto.
   * @param descuento - El nuevo porcentaje de descuento.
   * @throws Error si el descuento es negativo o mayor a 100.
   */
  public setDescuento(descuento: number): void {
    this.validarDescuento(descuento);
    const oldDescuento = this.descuento;
    this.descuento = descuento;
    this.actualizarFechaModificacion();
    
    if (this.shouldEmitEvents()) {
      this.eventEmitter.emit(
        new ProductoUpdatedEvent(
          this.getId().getValue(),
          'descuento',
          oldDescuento,
          descuento
        )
      );
    }
  }

  /**
   * Verifica si el producto está marcado como destacado.
   * @returns true si el producto es destacado, false en caso contrario.
   */
  public esDestacado(): boolean {
    return this.destacado;
  }

  /**
   * Establece si el producto es destacado o no.
   * @param destacado - El nuevo estado de destacado.
   */
  public setDestacado(destacado: boolean): void {
    const oldDestacado = this.destacado;
    this.destacado = destacado;
    this.actualizarFechaModificacion();
    
    if (this.shouldEmitEvents()) {
      this.eventEmitter.emit(
        new ProductoUpdatedEvent(
          this.getId().getValue(),
          'destacado',
          oldDestacado,
          destacado
        )
      );
    }
  }

  /**
   * Obtiene las etiquetas asociadas al producto.
   * @returns Array con las etiquetas del producto.
   */
  public getEtiquetas(): string[] {
    return [...this.etiquetas]; // Devuelve una copia para evitar modificaciones externas
  }

  /**
   * Añade una etiqueta al producto.
   * @param etiqueta - La etiqueta a añadir.
   * @returns true si la etiqueta se añadió, false si ya existía.
   */
  public addEtiqueta(etiqueta: string): boolean {
    if (!etiqueta || etiqueta.trim() === '') {
      throw new Error('La etiqueta no puede estar vacía');
    }
    
    const etiquetaNormalizada = etiqueta.trim().toLowerCase();
    
    if (this.etiquetas.includes(etiquetaNormalizada)) {
      return false;
    }
    
    this.etiquetas.push(etiquetaNormalizada);
    this.actualizarFechaModificacion();
    
    if (this.shouldEmitEvents()) {
      this.eventEmitter.emit(
        new ProductoUpdatedEvent(
          this.getId().getValue(),
          'etiquetas',
          [...this.etiquetas].filter(e => e !== etiquetaNormalizada),
          [...this.etiquetas]
        )
      );
    }
    
    return true;
  }

  /**
   * Elimina una etiqueta del producto.
   * @param etiqueta - La etiqueta a eliminar.
   * @returns true si la etiqueta se eliminó, false si no existía.
   */
  public removeEtiqueta(etiqueta: string): boolean {
    const etiquetaNormalizada = etiqueta.trim().toLowerCase();
    const index = this.etiquetas.indexOf(etiquetaNormalizada);
    
    if (index === -1) {
      return false;
    }
    
    const oldEtiquetas = [...this.etiquetas];
    this.etiquetas.splice(index, 1);
    this.actualizarFechaModificacion();
    
    if (this.shouldEmitEvents()) {
      this.eventEmitter.emit(
        new ProductoUpdatedEvent(
          this.getId().getValue(),
          'etiquetas',
          oldEtiquetas,
          [...this.etiquetas]
        )
      );
    }
    
    return true;
  }

  /**
   * Implementación del método abstracto para obtener el tipo de producto.
   * @returns El tipo de producto, en este caso "STANDARD".
   */
  public getTipo(): string {
    return 'STANDARD';
  }

  /**
   * Calcula el precio final del producto aplicando el descuento.
   * @returns El precio final después de aplicar el descuento.
   */
  public calcularPrecioFinal(): Money {
    if (this.descuento <= 0) {
      return this.getPrecio();
    }
    
    return this.getPrecio().applyDiscount(this.descuento);
  }

  /**
   * Implementa el método del patrón Visitor.
   * @param visitor - El visitante que procesará el producto.
   * @returns El resultado del procesamiento del visitante.
   */
  public accept<T>(visitor: ProductoVisitor<T>): T {
    return visitor.visitProductoEstandar(this);
  }

  /**
   * Implementa el método del patrón Prototype.
   * @returns Una nueva instancia con los mismos valores.
   */
  public clone(): Producto {
    return new Producto(
      this.getId(),
      this.getNombre(),
      this.getDescripcion(),
      this.getPrecio(),
      this.getStock(),
      this.getCategoriaId(),
      this.getImagenUrl(),
      this.descuento,
      this.destacado,
      [...this.etiquetas],
      new Date(this.getCreatedAt().getTime()),
      new Date(this.getUpdatedAt().getTime())
    );
  }

  /**
   * Valida que el descuento esté en un rango válido (0-100).
   * @param descuento - El descuento a validar.
   * @throws Error si el descuento es negativo o mayor a 100.
   */
  private validarDescuento(descuento: number): void {
    if (descuento < 0 || descuento > 100) {
      throw new Error('El descuento debe estar entre 0 y 100');
    }
  }

  /**
   * Crea una representación en cadena del producto.
   * @returns Una cadena con la información básica del producto.
   */
  public override toString(): string {
    return `Producto [id=${this.getId().getValue()}, nombre=${this.getNombre()}, precio=${this.getPrecio().toString()}, descuento=${this.descuento}%, stock=${this.getStock()}]`;
  }

  /**
   * Crea un builder para construir productos de manera fluida.
   * Implementa el patrón Builder.
   * @returns Un nuevo builder de productos.
   */
  public static builder(): ProductoBuilder {
    return new ProductoBuilder();
  }
}

/**
 * Implementación del patrón Builder para la creación fluida de productos.
 */
export class ProductoBuilder {
  private id: ProductId;
  private nombre: string;
  private descripcion: string;
  private precio: Money;
  private stock: number;
  private categoriaId: string;
  private imagenUrl: string;
  private descuento: number;
  private destacado: boolean;
  private etiquetas: string[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor() {
    this.id = ProductId.create();
    this.nombre = '';
    this.descripcion = '';
    this.precio = Money.zero();
    this.stock = 0;
    this.categoriaId = '';
    this.imagenUrl = '';
    this.descuento = 0;
    this.destacado = false;
    this.etiquetas = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Establece el ID del producto.
   * @param id - El ID a establecer.
   * @returns El builder para encadenamiento.
   */
  public withId(id: ProductId): ProductoBuilder {
    this.id = id;
    return this;
  }

  /**
   * Establece el nombre del producto.
   * @param nombre - El nombre a establecer.
   * @returns El builder para encadenamiento.
   */
  public withNombre(nombre: string): ProductoBuilder {
    this.nombre = nombre;
    return this;
  }

  /**
   * Establece la descripción del producto.
   * @param descripcion - La descripción a establecer.
   * @returns El builder para encadenamiento.
   */
  public withDescripcion(descripcion: string): ProductoBuilder {
    this.descripcion = descripcion;
    return this;
  }

  /**
   * Establece el precio del producto.
   * @param precio - El precio a establecer.
   * @returns El builder para encadenamiento.
   */
  public withPrecio(precio: Money): ProductoBuilder {
    this.precio = precio;
    return this;
  }

  /**
   * Establece el stock del producto.
   * @param stock - El stock a establecer.
   * @returns El builder para encadenamiento.
   */
  public withStock(stock: number): ProductoBuilder {
    this.stock = stock;
    return this;
  }

  /**
   * Establece la categoría del producto.
   * @param categoriaId - El ID de categoría a establecer.
   * @returns El builder para encadenamiento.
   */
  public withCategoria(categoriaId: string): ProductoBuilder {
    this.categoriaId = categoriaId;
    return this;
  }

  /**
   * Establece la URL de la imagen del producto.
   * @param imagenUrl - La URL a establecer.
   * @returns El builder para encadenamiento.
   */
  public withImagenUrl(imagenUrl: string): ProductoBuilder {
    this.imagenUrl = imagenUrl;
    return this;
  }

  /**
   * Establece el descuento del producto.
   * @param descuento - El descuento a establecer.
   * @returns El builder para encadenamiento.
   */
  public withDescuento(descuento: number): ProductoBuilder {
    this.descuento = descuento;
    return this;
  }

  /**
   * Establece si el producto es destacado.
   * @param destacado - El valor a establecer.
   * @returns El builder para encadenamiento.
   */
  public withDestacado(destacado: boolean): ProductoBuilder {
    this.destacado = destacado;
    return this;
  }

  /**
   * Establece las etiquetas del producto.
   * @param etiquetas - Las etiquetas a establecer.
   * @returns El builder para encadenamiento.
   */
  public withEtiquetas(etiquetas: string[]): ProductoBuilder {
    this.etiquetas = [...etiquetas];
    return this;
  }

  /**
   * Añade una etiqueta al producto.
   * @param etiqueta - La etiqueta a añadir.
   * @returns El builder para encadenamiento.
   */
  public addEtiqueta(etiqueta: string): ProductoBuilder {
    if (etiqueta && !this.etiquetas.includes(etiqueta.trim().toLowerCase())) {
      this.etiquetas.push(etiqueta.trim().toLowerCase());
    }
    return this;
  }

  /**
   * Establece la fecha de creación del producto.
   * @param createdAt - La fecha a establecer.
   * @returns El builder para encadenamiento.
   */
  public withCreatedAt(createdAt: Date): ProductoBuilder {
    this.createdAt = createdAt;
    return this;
  }

  /**
   * Establece la fecha de actualización del producto.
   * @param updatedAt - La fecha a establecer.
   * @returns El builder para encadenamiento.
   */
  public withUpdatedAt(updatedAt: Date): ProductoBuilder {
    this.updatedAt = updatedAt;
    return this;
  }

  /**
   * Construye y devuelve el producto con los valores establecidos.
   * @returns El producto construido.
   * @throws Error si faltan valores obligatorios.
   */
  public build(): Producto {
    // Validar campos obligatorios
    if (!this.nombre || this.nombre.trim() === '') {
      throw new Error('El nombre del producto es obligatorio');
    }
    
    if (!this.descripcion || this.descripcion.trim() === '') {
      throw new Error('La descripción del producto es obligatoria');
    }
    
    if (!this.categoriaId || this.categoriaId.trim() === '') {
      throw new Error('La categoría del producto es obligatoria');
    }
    
    return new Producto(
      this.id,
      this.nombre,
      this.descripcion,
      this.precio,
      this.stock,
      this.categoriaId,
      this.imagenUrl,
      this.descuento,
      this.destacado,
      this.etiquetas,
      this.createdAt,
      this.updatedAt
    );
  }
}

// Importación de eventos necesarios
import { ProductoUpdatedEvent } from '../events/ProductoUpdatedEvent';