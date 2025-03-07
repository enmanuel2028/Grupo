/**
 * Tipo que representa un documento de producto en MongoDB.
 */
export interface ProductoDocument {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoriaId: string;
  imagenUrl: string;
  descuento: number;
  destacado: boolean;
  createdAt: Date;
  updatedAt: Date;
}