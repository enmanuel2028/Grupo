import { Usuario } from '../user/Usuario';
import { Producto } from '../productos/Producto';

/**
 * Representa la entidad de Favoritos en el dominio.
 * Gestiona la relación entre usuarios y sus productos favoritos.
 */
export class Favoritos {
  private readonly id: string;
  private usuario: Usuario;
  private productos: Set<Producto>;

  constructor(id: string, usuario: Usuario) {
    this.id = id;
    this.usuario = usuario;
    this.productos = new Set<Producto>();
  }

  /**
   * Obtiene el identificador único de la lista de favoritos.
   */
  public obtenerId(): string {
    return this.id;
  }

  /**
   * Obtiene el usuario propietario de la lista de favoritos.
   */
  public obtenerUsuario(): Usuario {
    return this.usuario;
  }

  /**
   * Obtiene todos los productos favoritos.
   */
  public obtenerProductos(): Producto[] {
    return Array.from(this.productos);
  }

  /**
   * Agrega un producto a favoritos.
   * @param producto - El producto a agregar a favoritos
   */
  public agregarProducto(producto: Producto): void {
    this.productos.add(producto);
  }

  /**
   * Elimina un producto de favoritos.
   * @param producto - El producto a eliminar de favoritos
   */
  public eliminarProducto(producto: Producto): void {
    this.productos.delete(producto);
  }

  /**
   * Verifica si un producto está en favoritos.
   * @param producto - El producto a verificar
   */
  public tieneProducto(producto: Producto): boolean {
    return this.productos.has(producto);
  }

  /**
   * Limpia todos los productos de la lista de favoritos.
   */
  public limpiar(): void {
    this.productos.clear();
  }
}