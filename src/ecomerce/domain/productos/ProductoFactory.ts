/**
 * @fileoverview Factory para la creación de diferentes tipos de productos.
 * Implementa el patrón Factory Method para encapsular la lógica de creación.
 */

import { AbstractProducto } from './AbstractProducto';
import { Producto } from './Producto';
import { ProductoDigital, FormatoDigital } from './ProductoDigital';
import { ProductId } from '../value-objects/ProductId';
import { Money } from '../value-objects/Money';

/**
 * Tipo de producto que puede ser creado por la factory.
 */
export enum TipoProducto {
  ESTANDAR = 'ESTANDAR',
  DIGITAL = 'DIGITAL'
}

/**
 * Interfaz para los datos necesarios para crear un producto estándar.
 */
export interface ProductoEstandarData {
  id?: string;
  nombre: string;
  descripcion: string;
  precio: number;
  moneda?: string;
  stock: number;
  categoriaId: string;
  imagenUrl: string;
  descuento?: number;
  destacado?: boolean;
  etiquetas?: string[];
}

/**
 * Interfaz para los datos necesarios para crear un producto digital.
 */
export interface ProductoDigitalData extends ProductoEstandarData {
  formato: FormatoDigital;
  tamanoMb: number;
  urlDescarga: string;
}

/**
 * Factory para la creación de diferentes tipos de productos.
 * Implementa el patrón Factory Method.
 */
export class ProductoFactory {
  /**
   * Crea un nuevo producto del tipo especificado.
   * @param tipo - El tipo de producto a crear.
   * @param data - Los datos para la creación del producto.
   * @returns El producto creado.
   * @throws Error si el tipo de producto no es soportado.
   */
  public static crearProducto(tipo: TipoProducto, data: ProductoEstandarData | ProductoDigitalData): AbstractProducto {
    switch (tipo) {
      case TipoProducto.ESTANDAR:
        return this.crearProductoEstandar(data as ProductoEstandarData);
      
      case TipoProducto.DIGITAL:
        return this.crearProductoDigital(data as ProductoDigitalData);
      
      default:
        throw new Error(`Tipo de producto no soportado: ${tipo}`);
    }
  }

  /**
   * Crea un nuevo producto estándar.
   * @param data - Los datos para la creación del producto.
   * @returns El producto estándar creado.
   */
  private static crearProductoEstandar(data: ProductoEstandarData): Producto {
    return Producto.builder()
      .withId(data.id ? ProductId.fromString(data.id) : ProductId.create())
      .withNombre(data.nombre)
      .withDescripcion(data.descripcion)
      .withPrecio(Money.fromValue(data.precio, data.moneda || 'USD'))
      .withStock(data.stock)
      .withCategoria(data.categoriaId)
      .withImagenUrl(data.imagenUrl || '')
      .withDescuento(data.descuento || 0)
      .withDestacado(data.destacado || false)
      .withEtiquetas(data.etiquetas || [])
      .build();
  }

  /**
   * Crea un nuevo producto digital.
   * @param data - Los datos para la creación del producto digital.
   * @returns El producto digital creado.
   */
  private static crearProductoDigital(data: ProductoDigitalData): ProductoDigital {
    return ProductoDigital.builder()
      .withId(data.id ? ProductId.fromString(data.id) : ProductId.create())
      .withNombre(data.nombre)
      .withDescripcion(data.descripcion)
      .withPrecio(Money.fromValue(data.precio, data.moneda || 'USD'))
      .withStock(data.stock)
      .withCategoria(data.categoriaId)
      .withImagenUrl(data.imagenUrl || '')
      .withFormato(data.formato)
      .withTamanoMb(data.tamanoMb)
      .withUrlDescarga(data.urlDescarga)
      .withDescuento(data.descuento || 0)
      .build();
  }
}