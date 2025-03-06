/**
 * @fileoverview Event emitter for product-related domain events.
 * Implements the Singleton pattern to provide a global event bus.
 */

import { ProductoCreatedEvent } from './ProductoCreatedEvent';
import { ProductoUpdatedEvent } from './ProductoUpdatedEvent';
import { ProductoStockChangedEvent } from './ProductoStockChangedEvent';
import { UserCreatedEvent } from './UserCreatedEvent';

type ProductoEvent = ProductoCreatedEvent | ProductoUpdatedEvent | ProductoStockChangedEvent | UserCreatedEvent;
type EventHandler = (event: ProductoEvent) => void;

export class ProductoEventEmitter {
  private static instance: ProductoEventEmitter;
  private handlers: EventHandler[] = [];

  private constructor() {}

  /**
   * Gets the singleton instance of the event emitter.
   */
  public static getInstance(): ProductoEventEmitter {
    if (!ProductoEventEmitter.instance) {
      ProductoEventEmitter.instance = new ProductoEventEmitter();
    }
    return ProductoEventEmitter.instance;
  }

  /**
   * Subscribes a handler to product events.
   * @param handler - The event handler function
   */
  public subscribe(handler: EventHandler): void {
    this.handlers.push(handler);
  }

  /**
   * Unsubscribes a handler from product events.
   * @param handler - The event handler function to remove
   */
  public unsubscribe(handler: EventHandler): void {
    this.handlers = this.handlers.filter(h => h !== handler);
  }

  /**
   * Emits a product event to all subscribed handlers.
   * @param event - The event to emit
   */
  public emit(event: ProductoEvent): void {
    this.handlers.forEach(handler => handler(event));
  }
}