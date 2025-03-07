import { AbstractProducto } from '../../../domain/productos/AbstractProducto';
import { Producto } from '../../../domain/productos/Producto';
import { Money } from '../../../domain/value-objects/Money';
import { ProductId } from '../../../domain/value-objects/ProductId';
import { ProductoDocument } from '../types/ProductoDocument';

/**
 * Mapper para convertir entre entidades de dominio y documentos de MongoDB.
 */
export class ProductoMapper {
  /**
   * Convierte un documento de MongoDB a una entidad de dominio.
   */
  public toDomain(doc: ProductoDocument): AbstractProducto {
    return new Producto(
      ProductId.fromString(doc._id),
      doc.nombre,
      doc.descripcion,
      Money.of(doc.precio),
      doc.stock,
      doc.categoriaId,
      doc.imagenUrl,
      doc.descuento,
      doc.destacado,
      [],
      doc.createdAt,
      doc.updatedAt
    );
  }

  /**
   * Convierte una entidad de dominio a un documento de MongoDB.
   */
  public toDocument(producto: AbstractProducto): ProductoDocument {
    return {
      _id: producto.getId().toString(),
      nombre: producto.getNombre(),
      descripcion: producto.getDescripcion(),
      precio: producto.getPrecio().getAmount(),
      stock: producto.getStock(),
      categoriaId: producto.getCategoriaId(),
      imagenUrl: producto.getImagenUrl(),
      descuento: producto instanceof Producto ? producto.getDescuento() : 0,
      destacado: producto instanceof Producto ? producto.esDestacado() : false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}