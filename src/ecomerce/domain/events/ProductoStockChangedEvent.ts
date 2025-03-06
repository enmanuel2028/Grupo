/**
 * @fileoverview Event class for product stock changes.
 * Represents the event that occurs when a product's stock quantity is modified.
 */

export class ProductoStockChangedEvent {
  constructor(
    private readonly productId: string,
    private readonly oldStock: number,
    private readonly newStock: number,
    private readonly change: number,
    private readonly timestamp: Date = new Date()
  ) {}

  /**
   * Gets the ID of the product whose stock changed.
   */
  public getProductId(): string {
    return this.productId;
  }

  /**
   * Gets the old stock quantity.
   */
  public getOldStock(): number {
    return this.oldStock;
  }

  /**
   * Gets the new stock quantity.
   */
  public getNewStock(): number {
    return this.newStock;
  }

  /**
   * Gets the change in stock quantity (positive for increase, negative for decrease).
   */
  public getChange(): number {
    return this.change;
  }

  /**
   * Gets the timestamp when the stock change occurred.
   */
  public getTimestamp(): Date {
    return new Date(this.timestamp.getTime());
  }

  /**
   * Creates a string representation of the event.
   */
  public toString(): string {
    return `ProductoStockChangedEvent [productId=${this.productId}, oldStock=${this.oldStock}, newStock=${this.newStock}, change=${this.change}, timestamp=${this.timestamp.toISOString()}]`;
  }
}