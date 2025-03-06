/**
 * @fileoverview Implementación de un producto digital.
 * Extiende la clase abstracta AbstractProducto para productos que son digitales.
 */

import { AbstractProducto, ProductoVisitor } from './AbstractProducto';
import { ProductId } from '../value-objects/ProductId';
import { Money } from '../value-objects/Money';
import { ProductoEventEmitter } from '../events/ProductoEventEmitter';
import { ProductoUpdatedEvent } from '../events/ProductoUpdatedEvent';

/**
 * Tipo de formato para productos digitales.
 */
export enum FormatoDigital {
  PDF = 'PDF',
  EPUB = 'EPUB',
  MP3 = 'MP3',
  MP4 = 'MP4',
  ZIP = 'ZIP',
  OTRO = 'OTRO'
}

/**
 * Implementación de un producto digital en el sistema.
 * Extiende la clase abstracta AbstractProducto.
 */
export class ProductoDigital extends AbstractProducto {
  /**
   * @param id - Identificador único del producto
   * @param nombre - Nombre del producto
   * @param descripcion - Descripción detallada del producto
   * @param precio - Precio base del producto
   * @param stock - Cantidad disponible (para productos digitales suele ser ilimitado)
   * @param categoriaId - Identificador de la categoría a la que pertenece
   * @param imagenUrl - URL de la imagen principal del producto
   * @param formato - Formato del producto digital
   * @param tamanoMb - Tamaño en megabytes
   * @param urlDescarga - URL para la descarga del producto
   * @param descuento - Porcentaje de descuento aplicado al producto (0-100)
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
    private formato: FormatoDigital,
    private tamanoMb: number,
    private urlDescarga: string,
    private descuento: number = 0,
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
    this.validarTamano(tamanoMb);
  }

  /**
   * Obtiene el formato del producto digital.
   * @returns El formato del producto.
   */
  public getFormato(): FormatoDigital {
    return this.formato;
  }

  /**
   * Establece el formato del producto digital.
   * @param formato - El nuevo formato.
   */
  public setFormato(formato: FormatoDigital): void {
    const oldFormato = this.formato;
    this.formato = formato;
    this.actualizarFechaModificacion();
    
    if (this.shouldEmitEvents()) {
      this.eventEmitter.emit(
        new ProductoUpdatedEvent(
          this.getId().getValue(),
          'formato',
          oldFormato,
          formato
        )
      );
    }
  }

  /**
   * Obtiene el tamaño en megabytes del producto digital.
   * @returns El tamaño en MB.
   */
  public getTamanoMb(): number {
    return this.tamanoMb;
  }

  /**
   * Establece el tamaño en megabytes del producto digital.
   * @param tamanoMb - El nuevo tamaño.
   * @throws Error si el tamaño es negativo.
   */
  public setTamanoMb(tamanoMb: number): void {
    this.validarTamano(tamanoMb);
    const oldTamano = this.tamanoMb;
    this.tamanoMb = tamanoMb;
    this.actualizarFechaModificacion();
    
    if (this.shouldEmitEvents()) {
      this.eventEmitter.emit(
        new ProductoUpdatedEvent(
          this.getId().getValue(),
          'tamanoMb',
          oldTamano,
          tamanoMb
        )
      );
    }
  }

  /**
   * Obtiene la URL de descarga del producto digital.
   * @returns La URL de descarga.
   */
  public getUrlDescarga(): string {
    return this.urlDescarga;
  }

  /**
   * Establece la URL de descarga del producto digital.
   * @param urlDescarga - La nueva URL de descarga.
   */
  public setUrlDescarga(urlDescarga: string): void {
    const oldUrl = this.urlDescarga;
    this.urlDescarga = urlDescarga;
    this.actualizarFechaModificacion();
    
    if (this.shouldEmitEvents()) {
      this.eventEmitter.emit(
        new ProductoUpdatedEvent(
          this.getId().getValue(),
          'urlDescarga',
          oldUrl,
          urlDescarga
        )
      );
    }
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
   * Implementación del método abstracto para obtener el tipo de producto.
   * @returns El tipo de producto, en este caso "DIGITAL".
   */
  public getTipo(): string {
    return 'DIGITAL';
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
   * Sobrescribe el método para verificar disponibilidad.
   * Los productos digitales siempre están disponibles si tienen stock > 0 o stock ilimitado.
   * @returns true si el producto está disponible.
   */
  public override estaDisponible(): boolean {
    // Para productos digitales, consideramos que están disponibles si:
    // 1. Tienen stock > 0, o
    // 2. Tienen stock = -1 (ilimitado)
    return this.getStock() > 0 || this.getStock() === -1;
  }

  protected override validarReduccionStock(cantidad: number): void {
    // Si el stock es ilimitado (-1), no hay necesidad de validar
    if (this.getStock() === -1) {
      return;
    }
    
    // Para stock normal, la validación ya está en el método base
    super.validarReduccionStock(cantidad);
  }

  protected override despuesDeReducirStock(cantidad: number): void {
    // Si el stock es ilimitado (-1), no reducimos el stock
    if (this.getStock() === -1) {
      // Restaurar el stock a -1 (ya que el método base lo habría reducido)
      this.setStock(-1);
    }
  }

  /**
   * Implementa el método del patrón Visitor.
   * @param visitor - El visitante que procesará el producto.
   * @returns El resultado del procesamiento del visitante.
   */
  public accept<T>(visitor: ProductoVisitor<T>): T {
    return visitor.visitProductoDigital(this);
  }

  /**
   * Implementa el método del patrón Prototype.
   * @returns Una nueva instancia con los mismos valores.
   */
  public clone(): ProductoDigital {
    return new ProductoDigital(
      this.getId(),
      this.getNombre(),
      this.getDescripcion(),
      this.getPrecio(),
      this.getStock(),
      this.getCategoriaId(),
      this.getImagenUrl(),
      this.formato,
      this.tamanoMb,
      this.urlDescarga,
      this.descuento,
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
   * Valida que el tamaño sea válido.
   * @param tamanoMb - El tamaño a validar.
   * @throws Error si el tamaño es negativo.
   */
  private validarTamano(tamanoMb: number): void {
    if (tamanoMb < 0) {
      throw new Error('El tamaño no puede ser negativo');
    }
  }

  /**
   * Crea una representación en cadena del producto digital.
   * @returns Una cadena con la información básica del producto.
   */
  public override toString(): string {
    return `ProductoDigital [id=${this.getId().getValue()}, nombre=${this.getNombre()}, formato=${this.formato}, tamaño=${this.tamanoMb}MB, precio=${this.getPrecio().toString()}, descuento=${this.descuento}%]`;
  }

  /**
   * Crea un builder para construir productos digitales de manera fluida.
   * Implementa el patrón Builder.
   * @returns Un nuevo builder de productos digitales.
   */
  public static builder(): ProductoDigitalBuilder {
    return new ProductoDigitalBuilder();
  }
}

/**
 * Implementación del patrón Builder para la creación fluida de productos digitales.
 */
export class ProductoDigitalBuilder {
  private id: ProductId;
  private nombre: string;
  private descripcion: string;
  private precio: Money;
  private stock: number;
  private categoriaId: string;
  private imagenUrl: string;
  private formato: FormatoDigital;
  private tamanoMb: number;
  private urlDescarga: string;
  private descuento: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor() {
    this.id = ProductId.create();
    this.nombre = '';
    this.descripcion = '';
    this.precio = Money.zero();
    this.stock = -1; // Por defecto, stock ilimitado para productos digitales
    this.categoriaId = '';
    this.imagenUrl = '';
    this.formato = FormatoDigital.OTRO;
    this.tamanoMb = 0;
    this.urlDescarga = '';
    this.descuento = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Establece el ID del producto.
   * @param id - El ID a establecer.
   * @returns El builder para encadenamiento.
   */
  public withId(id: ProductId): ProductoDigitalBuilder {
    this.id = id;
    return this;
  }

  /**
   * Establece el nombre del producto.
   * @param nombre - El nombre a establecer.
   * @returns El builder para encadenamiento.
   */
  public withNombre(nombre: string): ProductoDigitalBuilder {
    this.nombre = nombre;
    return this;
  }

  /**
   * Establece la descripción del producto.
   * @param descripcion - La descripción a establecer.
   * @returns El builder para encadenamiento.
   */
  public withDescripcion(descripcion: string): ProductoDigitalBuilder {
    this.descripcion = descripcion;
    return this;
  }

  /**
   * Establece el precio del producto.
   * @param precio - El precio a establecer.
   * @returns El builder para encadenamiento.
   */
  public withPrecio(precio: Money): ProductoDigitalBuilder {
    this.precio = precio;
    return this;
  }

  /**
   * Establece el stock del producto.
   * @param stock - El stock a establecer. Usar -1 para stock ilimitado.
   * @returns El builder para encadenamiento.
   */
  public withStock(stock: number): ProductoDigitalBuilder {
    this.stock = stock;
    return this;
  }

  /**
   * Establece stock ilimitado para el producto digital.
   * @returns El builder para encadenamiento.
   */
  public withStockIlimitado(): ProductoDigitalBuilder {
    this.stock = -1;
    return this;
  }

  /**
   * Establece la categoría del producto.
   * @param categoriaId - El ID de categoría a establecer.
   * @returns El builder para encadenamiento.
   */
  public withCategoria(categoriaId: string): ProductoDigitalBuilder {
    this.categoriaId = categoriaId;
    return this;
  }

  /**
   * Establece la URL de la imagen del producto.
   * @param imagenUrl - La URL a establecer.
   * @returns El builder para encadenamiento.
   */
  public withImagenUrl(imagenUrl: string): ProductoDigitalBuilder {
    this.imagenUrl = imagenUrl;
    return this;
  }

  /**
   * Establece el formato del producto digital.
   * @param formato - El formato a establecer.
   * @returns El builder para encadenamiento.
   */
  public withFormato(formato: FormatoDigital): ProductoDigitalBuilder {
    this.formato = formato;
    return this;
  }

  /**
   * Establece el tamaño del producto digital.
   * @param tamanoMb - El tamaño en MB a establecer.
   * @returns El builder para encadenamiento.
   */
  public withTamanoMb(tamanoMb: number): ProductoDigitalBuilder {
    this.tamanoMb = tamanoMb;
    return this;
  }

  /**
   * Establece la URL de descarga del producto digital.
   * @param urlDescarga - La URL a establecer.
   * @returns El builder para encadenamiento.
   */
  public withUrlDescarga(urlDescarga: string): ProductoDigitalBuilder {
    this.urlDescarga = urlDescarga;
    return this;
  }

  /**
   * Establece el descuento del producto.
   * @param descuento - El descuento a establecer.
   * @returns El builder para encadenamiento.
   */
  public withDescuento(descuento: number): ProductoDigitalBuilder {
    this.descuento = descuento;
    return this;
  }

  /**
   * Establece la fecha de creación del producto.
   * @param createdAt - La fecha a establecer.
   * @returns El builder para encadenamiento.
   */
  public withCreatedAt(createdAt: Date): ProductoDigitalBuilder {
    this.createdAt = createdAt;
    return this;
  }

  /**
   * Establece la fecha de actualización del producto.
   * @param updatedAt - La fecha a establecer.
   * @returns El builder para encadenamiento.
   */
  public withUpdatedAt(updatedAt: Date): ProductoDigitalBuilder {
    this.updatedAt = updatedAt;
    return this;
  }

  /**
   * Construye y devuelve el producto digital con los valores establecidos.
   * @returns El producto digital construido.
   * @throws Error si faltan valores obligatorios.
   */
  public build(): ProductoDigital {
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
    
    if (!this.urlDescarga || this.urlDescarga.trim() === '') {
      throw new Error('La URL de descarga del producto digital es obligatoria');
    }
    
    return new ProductoDigital(
      this.id,
      this.nombre,
      this.descripcion,
      this.precio,
      this.stock,
      this.categoriaId,
      this.imagenUrl,
      this.formato,
      this.tamanoMb,
      this.urlDescarga,
      this.descuento,
      this.createdAt,
      this.updatedAt
    );
  }
}