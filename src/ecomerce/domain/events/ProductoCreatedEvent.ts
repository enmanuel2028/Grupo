/**
 * @fileoverview Event class for product creation.
 * Represents the event that occurs when a new product is created.
 */

export class ProductoCreatedEvent {
  constructor(
    private readonly productId: string,
    private readonly nombre: string,
    private readonly precio: number,
    private readonly timestamp: Date = new Date()
  ) {}

  /**
   * Gets the ID of the created product.
   */
  public getProductId(): string {
    return this.productId;
  }

  /**
   * Gets the name of the created product.
   */
  public getNombre(): string {
    return this.nombre;
  }

  /**
   * Gets the price of the created product.
   */
  public getPrecio(): number {
    return this.precio;
  }

  /**
   * Gets the timestamp when the product was created.
   */
  public getTimestamp(): Date {
    return new Date(this.timestamp.getTime());
  }

  /**
   * Creates a string representation of the event.
   */
  public toString(): string {
    return `ProductoCreatedEvent [productId=${this.productId}, nombre=${this.nombre}, precio=${this.precio}, timestamp=${this.timestamp.toISOString()}]`;
  }
}