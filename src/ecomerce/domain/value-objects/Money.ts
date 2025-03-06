/**
 * @fileoverview Value object representing money in the domain.
 * Implements immutable money operations with currency support.
 */

export class Money {
  private constructor(
    private readonly amount: number,
    private readonly currency: string = 'USD'
  ) {
    this.validateAmount(amount);
    this.validateCurrency(currency);
  }

  /**
   * Creates a new Money instance with the specified amount and currency.
   * @param amount - The monetary amount
   * @param currency - The currency code (default: USD)
   */
  public static fromValue(amount: number, currency: string = 'COP'): Money {
    return new Money(amount, currency);
  }

  /**
   * Creates a Money instance representing zero amount.
   */
  public static zero(currency: string = 'COP'): Money {
    return new Money(0, currency);
  }

  /**
   * Creates a new Money instance from a number value.
   * @param amount - The monetary amount
   */
  public static of(amount: number): Money {
    return new Money(amount);
  }

  /**
   * Gets the monetary amount.
   */
  public getAmount(): number {
    return this.amount;
  }

  /**
   * Gets the currency code.
   */
  public getCurrency(): string {
    return this.currency;
  }

  /**
   * Adds another Money value to this one.
   * @param other - The Money to add
   * @throws Error if currencies don't match
   */
  public add(other: Money): Money {
    this.validateSameCurrency(other);
    return new Money(this.amount + other.amount, this.currency);
  }

  /**
   * Subtracts another Money value from this one.
   * @param other - The Money to subtract
   * @throws Error if currencies don't match
   */
  public subtract(other: Money): Money {
    this.validateSameCurrency(other);
    return new Money(this.amount - other.amount, this.currency);
  }

  /**
   * Multiplies the monetary amount by a factor.
   * @param factor - The multiplication factor
   */
  public multiply(factor: number): Money {
    return new Money(this.amount * factor, this.currency);
  }

  /**
   * Applies a discount percentage to the amount.
   * @param discountPercentage - The discount percentage (0-100)
   */
  public applyDiscount(discountPercentage: number): Money {
    if (discountPercentage < 0 || discountPercentage > 100) {
      throw new Error('Discount percentage must be between 0 and 100');
    }
    const discountFactor = 1 - (discountPercentage / 100);
    return this.multiply(discountFactor);
  }

  /**
   * Checks if this Money value equals another.
   * @param other - The Money to compare with
   */
  public equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  /**
   * Checks if this Money value is greater than another.
   * @param other - The Money to compare with
   * @throws Error if currencies don't match
   */
  public greaterThan(other: Money): boolean {
    this.validateSameCurrency(other);
    return this.amount > other.amount;
  }

  /**
   * Checks if this Money value is less than another.
   * @param other - The Money to compare with
   * @throws Error if currencies don't match
   */
  public lessThan(other: Money): boolean {
    this.validateSameCurrency(other);
    return this.amount < other.amount;
  }

  /**
   * Creates a string representation of the Money value.
   */
  public toString(): string {
    return `${this.amount.toFixed(2)} ${this.currency}`;
  }

  private validateAmount(amount: number): void {
    if (typeof amount !== 'number' || isNaN(amount)) {
      throw new Error('Amount must be a valid number');
    }
  }

  private validateCurrency(currency: string): void {
    if (!currency || currency.trim().length !== 3) {
      throw new Error('Currency must be a valid 3-letter code');
    }
  }

  private validateSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error('Cannot operate on Money with different currencies');
    }
  }
}