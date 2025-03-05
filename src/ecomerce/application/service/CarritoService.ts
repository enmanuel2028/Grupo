import { AbstractProducto } from '../../domain/productos/AbstractProducto';
import { CarritoCompras } from '../../domain/carrito/CarritoCompras';
import { Money } from '../../domain/value-objects/Money';

/**
 * Interfaz que define las operaciones del servicio de carrito de compras.
 */
export interface CarritoService {
  /**
   * Agrega un producto al carrito.
   * @param producto - El producto a agregar.
   * @param cantidad - La cantidad a agregar.
   */
  agregarProducto(producto: AbstractProducto, cantidad?: number): void;

  /**
   * Elimina un producto del carrito.
   * @param productoId - El ID del producto a eliminar.
   */
  eliminarProducto(productoId: string): void;

  /**
   * Actualiza la cantidad de un producto en el carrito.
   * @param productoId - El ID del producto a actualizar.
   * @param cantidad - La nueva cantidad.
   */
  actualizarCantidad(productoId: string, cantidad: number): void;

  /**
   * Obtiene el total del carrito.
   * @returns El total del carrito.
   */
  obtenerTotal(): Money;

  /**
   * Obtiene todos los items del carrito.
   * @returns Los items del carrito.
   */
  obtenerItems(): Array<{ producto: AbstractProducto; cantidad: number }>;

  /**
   * Vacía el carrito de compras.
   */
  vaciarCarrito(): void;

  /**
   * Obtiene la cantidad total de items en el carrito.
   * @returns El número total de items.
   */
  obtenerCantidadTotal(): number;
}

/**
 * Implementación del servicio de carrito de compras.
 */
export class CarritoServiceImpl implements CarritoService {
  private carrito: CarritoCompras;

  constructor() {
    this.carrito = CarritoCompras.getInstance();
  }

  public agregarProducto(producto: AbstractProducto, cantidad: number = 1): void {
    this.carrito.agregarProducto(producto, cantidad);
  }

  public eliminarProducto(productoId: string): void {
    this.carrito.eliminarProducto(productoId);
  }

  public actualizarCantidad(productoId: string, cantidad: number): void {
    this.carrito.actualizarCantidad(productoId, cantidad);
  }

  public obtenerTotal(): Money {
    return this.carrito.calcularTotal();
  }

  public obtenerItems(): Array<{ producto: AbstractProducto; cantidad: number }> {
    return this.carrito.getItems();
  }

  public vaciarCarrito(): void {
    this.carrito.vaciar();
  }

  public obtenerCantidadTotal(): number {
    return this.carrito.getCantidadTotal();
  }
}