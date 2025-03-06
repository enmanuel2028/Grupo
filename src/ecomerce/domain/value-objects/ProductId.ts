/**
 * @fileoverview Value object representing a product identifier in the domain.
 * Implements immutable product ID with validation and generation logic.
 */

import { randomUUID } from 'crypto';

export class ProductId {
  private constructor(private readonly value: string) {
    this.validateId(value);
  }

  /**
   * Creates a new ProductId with a generated UUID.
   */
  public static create(): ProductId {
    return new ProductId(randomUUID());
  }

  /**
   * Creates a ProductId from an existing string value.
   * @param id - The product ID string
   */
  public static fromString(id: string): ProductId {
    return new ProductId(id);
  }

  /**
   * Gets the product ID value.
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * Checks if this ProductId equals another.
   * @param other - The ProductId to compare with
   */
  public equals(other: ProductId): boolean {
    return this.value === other.value;
  }

  /**
   * Creates a string representation of the ProductId.
   */
  public toString(): string {
    return this.value;
  }

  private validateId(id: string): void {
    if (!id || id.trim().length === 0) {
      throw new Error('Product ID cannot be empty');
    }
  }
}