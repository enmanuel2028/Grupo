/**
 * @fileoverview Event class for product updates.
 * Represents the event that occurs when a product's attributes are modified.
 */

export class ProductoUpdatedEvent {
  constructor(
    private readonly productId: string,
    private readonly propertyName: string,
    private readonly oldValue: any,
    private readonly newValue: any,
    private readonly timestamp: Date = new Date()
  ) {}

  /**
   * Gets the ID of the updated product.
   */
  public getProductId(): string {
    return this.productId;
  }

  /**
   * Gets the name of the property that was updated.
   */
  public getPropertyName(): string {
    return this.propertyName;
  }

  /**
   * Gets the old value of the updated property.
   */
  public getOldValue(): any {
    return this.oldValue;
  }

  /**
   * Gets the new value of the updated property.
   */
  public getNewValue(): any {
    return this.newValue;
  }

  /**
   * Gets the timestamp when the update occurred.
   */
  public getTimestamp(): Date {
    return new Date(this.timestamp.getTime());
  }

  /**
   * Creates a string representation of the event.
   */
  public toString(): string {
    return `ProductoUpdatedEvent [productId=${this.productId}, property=${this.propertyName}, oldValue=${this.oldValue}, newValue=${this.newValue}, timestamp=${this.timestamp.toISOString()}]`;
  }
}