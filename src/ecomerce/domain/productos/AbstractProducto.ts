/**
 * @fileoverview Clase abstracta base para todos los productos del dominio.
 * Implementa el patrón Template Method para definir el esqueleto de operaciones
 * y permitir que las subclases implementen comportamientos específicos.
 */

import { ProductId } from '../value-objects/ProductId';
import { Money } from '../value-objects/Money';
import { ProductoEventEmitter } from '../events/ProductoEventEmitter';
import { ProductoCreatedEvent } from '../events/ProductoCreatedEvent';
import { ProductoUpdatedEvent } from '../events/ProductoUpdatedEvent';
import { ProductoStockChangedEvent } from '../events/ProductoStockChangedEvent';

/**
 * Clase abstracta que define la estructura y comportamiento base para todos los productos.
 * Implementa el patrón Template Method.
 */
export abstract class AbstractProducto {
  protected readonly eventEmitter: ProductoEventEmitter;

  /**
   * @param id - Identificador único del producto
   * @param nombre - Nombre del producto
   * @param descripcion - Descripción detallada del producto
   * @param precio - Precio base del producto
   * @param stock - Cantidad disponible en inventario
   * @param categoriaId - Identificador de la categoría a la que pertenece
   * @param imagenUrl - URL de la imagen principal del producto
   * @param createdAt - Fecha de creación
   * @param updatedAt - Fecha de última actualización
   * @param eventEmitter - Emisor de eventos de dominio
   */
  constructor(
    protected readonly id: ProductId,
    protected nombre: string,
    protected descripcion: string,
    protected precio: Money,
    protected stock: number,
    protected readonly categoriaId: string,
    protected imagenUrl: string,
    protected readonly createdAt: Date,
    protected updatedAt: Date,
    eventEmitter?: ProductoEventEmitter
  ) {
    this.validarNombre(nombre);
    this.validarDescripcion(descripcion);
    this.validarStock(stock);
    this.eventEmitter = eventEmitter || ProductoEventEmitter.getInstance();
    
    // Emitir evento de creación
    if (this.shouldEmitEvents()) {
      this.eventEmitter.emit(
        new ProductoCreatedEvent(this.id.getValue(), this.nombre, this.precio.getAmount())
      );
    }
  }

  /**
   * Obtiene el identificador único del producto.
   * @returns El identificador del producto.
   */
  public getId(): ProductId {
    return this.id;
  }

  /**
   * Obtiene el nombre del producto.
   * @returns El nombre del producto.
   */
  public getNombre(): string {
    return this.nombre;
  }

  /**
   * Actualiza el nombre del producto.
   * @param nombre - El nuevo nombre del producto.
   * @throws Error si el nombre es inválido.
   */
  public setNombre(nombre: string): void {
    this.validarNombre(nombre);
    const oldNombre = this.nombre;
    this.nombre = nombre;
    this.actualizarFechaModificacion();
    
    if (this.shouldEmitEvents()) {
      this.eventEmitter.emit(
        new ProductoUpdatedEvent(
          this.id.getValue(),
          'nombre',
          oldNombre,
          nombre
        )
      );
    }
  }

  /**
   * Obtiene la descripción del producto.
   * @returns La descripción del producto.
   */
  public getDescripcion(): string {
    return this.descripcion;
  }

  /**
   * Actualiza la descripción del producto.
   * @param descripcion - La nueva descripción del producto.
   * @throws Error si la descripción es inválida.
   */
  public setDescripcion(descripcion: string): void {
    this.validarDescripcion(descripcion);
    const oldDescripcion = this.descripcion;
    this.descripcion = descripcion;
    this.actualizarFechaModificacion();
    
    if (this.shouldEmitEvents()) {
      this.eventEmitter.emit(
        new ProductoUpdatedEvent(
          this.id.getValue(),
          'descripcion',
          oldDescripcion,
          descripcion
        )
      );
    }
  }

  /**
   * Obtiene el precio del producto.
   * @returns El precio del producto.
   */
  public getPrecio(): Money {
    return this.precio;
  }

  /**
   * Actualiza el precio del producto.
   * @param precio - El nuevo precio del producto.
   */
  public setPrecio(precio: Money): void {
    const oldPrecio = this.precio;
    this.precio = precio;
    this.actualizarFechaModificacion();
    
    if (this.shouldEmitEvents()) {
      this.eventEmitter.emit(
        new ProductoUpdatedEvent(
          this.id.getValue(),
          'precio',
          oldPrecio.getAmount(),
          precio.getAmount()
        )
      );
    }
  }

  /**
   * Obtiene la cantidad disponible en stock.
   * @returns La cantidad en stock.
   */
  public getStock(): number {
    return this.stock;
  }

  /**
   * Actualiza la cantidad en stock.
   * @param stock - La nueva cantidad en stock.
   * @throws Error si el stock es negativo.
   */
  public setStock(stock: number): void {
    this.validarStock(stock);
    const oldStock = this.stock;
    this.stock = stock;
    this.actualizarFechaModificacion();
    
    if (this.shouldEmitEvents()) {
      this.eventEmitter.emit(
        new ProductoStockChangedEvent(
          this.id.getValue(),
          oldStock,
          stock,
          stock - oldStock
        )
      );
    }
  }

  /**
   * Obtiene el identificador de la categoría a la que pertenece el producto.
   * @returns El identificador de la categoría.
   */
  public getCategoriaId(): string {
    return this.categoriaId;
  }

  /**
   * Obtiene la URL de la imagen del producto.
   * @returns La URL de la imagen.
   */
  public getImagenUrl(): string {
    return this.imagenUrl;
  }

  /**
   * Actualiza la URL de la imagen del producto.
   * @param imagenUrl - La nueva URL de la imagen.
   */
  public setImagenUrl(imagenUrl: string): void {
    const oldImagenUrl = this.imagenUrl;
    this.imagenUrl = imagenUrl;
    this.actualizarFechaModificacion();
    
    if (this.shouldEmitEvents()) {
      this.eventEmitter.emit(
        new ProductoUpdatedEvent(
          this.id.getValue(),
          'imagenUrl',
          oldImagenUrl,
          imagenUrl
        )
      );
    }
  }

  /**
   * Obtiene la fecha de creación del producto.
   * @returns La fecha de creación.
   */
  public getCreatedAt(): Date {
    return new Date(this.createdAt.getTime());
  }

  /**
   * Obtiene la fecha de última modificación del producto.
   * @returns La fecha de última modificación.
   */
  public getUpdatedAt(): Date {
    return new Date(this.updatedAt.getTime());
  }

  /**
   * Verifica si el producto está disponible en stock.
   * @returns true si hay stock disponible, false en caso contrario.
   */
  public estaDisponible(): boolean {
    return this.stock > 0;
  }

  /**
   * Reduce la cantidad en stock del producto.
   * Implementa el patrón Template Method definiendo los pasos del algoritmo,
   * pero delegando algunos pasos específicos a las subclases.
   * 
   * @param cantidad - La cantidad a reducir.
   * @throws Error si no hay suficiente stock disponible.
   */
  public reducirStock(cantidad: number): void {
    // 1. Validar la cantidad (paso común)
    if (cantidad <= 0) {
      throw new Error('La cantidad a reducir debe ser positiva');
    }
    
    // 2. Verificar disponibilidad (paso común)
    if (cantidad > this.stock) {
      throw new Error('No hay suficiente stock disponible');
    }
    
    // 3. Hook para que las subclases realicen validaciones adicionales
    this.validarReduccionStock(cantidad);
    
    // 4. Guardar stock anterior para eventos
    const oldStock = this.stock;
    
    // 5. Reducir stock (paso común)
    this.stock -= cantidad;
    
    // 6. Hook para que las subclases realicen acciones adicionales
    this.despuesDeReducirStock(cantidad);
    
    // 7. Actualizar fecha de modificación (paso común)
    this.actualizarFechaModificacion();
    
    // 8. Emitir evento (paso común)
    if (this.shouldEmitEvents()) {
      this.eventEmitter.emit(
        new ProductoStockChangedEvent(
          this.id.getValue(),
          oldStock,
          this.stock,
          -cantidad
        )
      );
    }
  }

  /**
   * Aumenta la cantidad en stock del producto.
   * Implementa el patrón Template Method.
   * 
   * @param cantidad - La cantidad a aumentar.
   * @throws Error si la cantidad es negativa.
   */
  public aumentarStock(cantidad: number): void {
    // 1. Validar la cantidad (paso común)
    if (cantidad <= 0) {
      throw new Error('La cantidad a aumentar debe ser positiva');
    }
    
    // 2. Hook para que las subclases realicen validaciones adicionales
    this.validarAumentoStock(cantidad);
    
    // 3. Guardar stock anterior para eventos
    const oldStock = this.stock;
    
    // 4. Aumentar stock (paso común)
    this.stock += cantidad;
    
    // 5. Hook para que las subclases realicen acciones adicionales
    this.despuesDeAumentarStock(cantidad);
    
    // 6. Actualizar fecha de modificación (paso común)
    this.actualizarFechaModificacion();
    
    // 7. Emitir evento (paso común)
    if (this.shouldEmitEvents()) {
      this.eventEmitter.emit(
        new ProductoStockChangedEvent(
          this.id.getValue(),
          oldStock,
          this.stock,
          cantidad
        )
      );
    }
  }

  /**
   * Crea una copia profunda del producto.
   * Implementa el patrón Prototype.
   * 
   * @returns Una nueva instancia con los mismos valores.
   */
  public abstract clone(): AbstractProducto;

  /**
   * Método hook para validaciones adicionales antes de reducir stock.
   * Las subclases pueden sobrescribir este método para añadir validaciones específicas.
   * 
   * @param cantidad - La cantidad a reducir.
   */
  protected validarReduccionStock(cantidad: number): void {
    // Por defecto no hace nada, las subclases pueden sobrescribir
  }

  /**
   * Método hook para acciones adicionales después de reducir stock.
   * Las subclases pueden sobrescribir este método para añadir comportamientos específicos.
   * 
   * @param cantidad - La cantidad reducida.
   */
  protected despuesDeReducirStock(cantidad: number): void {
    // Por defecto no hace nada, las subclases pueden sobrescribir
  }

  /**
   * Método hook para validaciones adicionales antes de aumentar stock.
   * Las subclases pueden sobrescribir este método para añadir validaciones específicas.
   * 
   * @param cantidad - La cantidad a aumentar.
   */
  protected validarAumentoStock(cantidad: number): void {
    // Por defecto no hace nada, las subclases pueden sobrescribir
  }

  /**
   * Método hook para acciones adicionales después de aumentar stock.
   * Las subclases pueden sobrescribir este método para añadir comportamientos específicos.
   * 
   * @param cantidad - La cantidad aumentada.
   */
  protected despuesDeAumentarStock(cantidad: number): void {
    // Por defecto no hace nada, las subclases pueden sobrescribir
  }

  /**
   * Valida que el nombre no sea vacío.
   * @param nombre - El nombre a validar.
   * @throws Error si el nombre es inválido.
   */
  protected validarNombre(nombre: string): void {
    if (!nombre || nombre.trim() === '') {
      throw new Error('El nombre del producto no puede estar vacío');
    }
    
    if (nombre.length > 100) {
      throw new Error('El nombre del producto no puede exceder los 100 caracteres');
    }
  }

  /**
   * Valida que la descripción no sea vacía.
   * @param descripcion - La descripción a validar.
   * @throws Error si la descripción es inválida.
   */
  protected validarDescripcion(descripcion: string): void {
    if (!descripcion || descripcion.trim() === '') {
      throw new Error('La descripción del producto no puede estar vacía');
    }
  }

  /**
   * Valida que el stock no sea negativo.
   * @param stock - El stock a validar.
   * @throws Error si el stock es negativo.
   */
  protected validarStock(stock: number): void {
    if (stock < 0) {
      throw new Error('El stock no puede ser negativo');
    }
  }

  /**
   * Actualiza la fecha de modificación al momento actual.
   */
  protected actualizarFechaModificacion(): void {
    this.updatedAt = new Date();
  }

  /**
   * Determina si se deben emitir eventos de dominio.
   * Las subclases pueden sobrescribir este método para controlar la emisión de eventos.
   * 
   * @returns true si se deben emitir eventos, false en caso contrario.
   */
  protected shouldEmitEvents(): boolean {
    return true;
  }

  /**
   * Método abstracto para obtener el tipo de producto.
   * @returns El tipo de producto.
   */
  public abstract getTipo(): string;

  /**
   * Método abstracto para calcular el precio final del producto.
   * Puede incluir descuentos, impuestos, etc.
   * @returns El precio final del producto.
   */
  public abstract calcularPrecioFinal(): Money;

  /**
   * Método abstracto para aceptar un visitante.
   * Implementa el patrón Visitor.
   * 
   * @param visitor - El visitante que procesará el producto.
   * @returns El resultado del procesamiento del visitante.
   */
  public abstract accept<T>(visitor: ProductoVisitor<T>): T;
}

/**
 * Interfaz para implementar el patrón Visitor.
 * Permite añadir nuevas operaciones a la jerarquía de productos sin modificar las clases.
 */
export interface ProductoVisitor<T> {
  visitProductoEstandar(producto: any): T;
  visitProductoDigital(producto: any): T;
  visitProductoPersonalizado(producto: any): T;
  visitProductoNull(producto: any): T;
  visitProductoNatural(producto: any): T;
}