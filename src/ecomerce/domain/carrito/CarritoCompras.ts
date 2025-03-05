import { AbstractProducto } from '../productos/AbstractProducto';
import { Money } from '../value-objects/Money';

/**
 * Representa un ítem en el carrito de compras.
 */
interface CarritoItem {
  producto: AbstractProducto;
  cantidad: number;
}

/**
 * Clase que representa el carrito de compras.
 * Implementa el patrón Singleton para asegurar una única instancia por sesión.
 */
export class CarritoCompras {
  private static instance: CarritoCompras;
  private items: Map<string, CarritoItem>;
  private readonly maxItemsPermitidos: number = 10;

  private constructor() {
    this.items = new Map<string, CarritoItem>();
  }

  /**
   * Obtiene la única instancia del carrito de compras.
   * @returns La instancia del carrito de compras.
   */
  public static getInstance(): CarritoCompras {
    if (!CarritoCompras.instance) {
      CarritoCompras.instance = new CarritoCompras();
    }
    return CarritoCompras.instance;
  }

  /**
   * Agrega un producto al carrito.
   * @param producto - El producto a agregar.
   * @param cantidad - La cantidad a agregar.
   * @throws Error si se excede el límite de items o no hay suficiente stock.
   */
  public agregarProducto(producto: AbstractProducto, cantidad: number = 1): void {
    if (!producto.estaDisponible()) {
      throw new Error('El producto no está disponible');
    }

    const itemExistente = this.items.get(producto.getId().toString());
    const nuevaCantidad = (itemExistente?.cantidad || 0) + cantidad;

    if (!itemExistente && this.items.size >= this.maxItemsPermitidos) {
      throw new Error(`No se pueden agregar más de ${this.maxItemsPermitidos} items diferentes al carrito`);
    }

    this.items.set(producto.getId().toString(), {
      producto,
      cantidad: nuevaCantidad
    });
  }

  /**
   * Elimina un producto del carrito.
   * @param productoId - El ID del producto a eliminar.
   */
  public eliminarProducto(productoId: string): void {
    this.items.delete(productoId);
  }

  /**
   * Actualiza la cantidad de un producto en el carrito.
   * @param productoId - El ID del producto a actualizar.
   * @param cantidad - La nueva cantidad.
   * @throws Error si el producto no existe en el carrito o la cantidad es inválida.
   */
  public actualizarCantidad(productoId: string, cantidad: number): void {
    const item = this.items.get(productoId);
    if (!item) {
      throw new Error('El producto no existe en el carrito');
    }

    if (cantidad <= 0) {
      this.eliminarProducto(productoId);
      return;
    }

    if (!item.producto.estaDisponible()) {
      throw new Error('El producto no está disponible');
    }

    this.items.set(productoId, {
      ...item,
      cantidad
    });
  }

  /**
   * Calcula el total del carrito.
   * @returns El total del carrito como objeto Money.
   */
  public calcularTotal(): Money {
    let total = Money.zero();
    for (const item of this.items.values()) {
      const precioItem = item.producto.calcularPrecioFinal().multiply(item.cantidad);
      total = total.add(precioItem);
    }
    return total;
  }

  /**
   * Obtiene todos los items del carrito.
   * @returns Array de items en el carrito.
   */
  public getItems(): CarritoItem[] {
    return Array.from(this.items.values());
  }

  /**
   * Verifica si el carrito está vacío.
   * @returns true si el carrito está vacío, false en caso contrario.
   */
  public estaVacio(): boolean {
    return this.items.size === 0;
  }

  /**
   * Vacía el carrito de compras.
   */
  public vaciar(): void {
    this.items.clear();
  }

  /**
   * Obtiene la cantidad total de items en el carrito.
   * @returns El número total de items.
   */
  public getCantidadTotal(): number {
    return Array.from(this.items.values())
      .reduce((total, item) => total + item.cantidad, 0);
  }

  /**
   * Verifica si un producto específico está en el carrito.
   * @param productoId - El ID del producto a verificar.
   * @returns true si el producto está en el carrito, false en caso contrario.
   */
  public tieneProducto(productoId: string): boolean {
    return this.items.has(productoId);
  }
}