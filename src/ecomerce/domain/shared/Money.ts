/**
 * Represents a monetary value with amount and currency.
 * Implements value object pattern for handling money in the domain.
 */
export class Money {
  private constructor(private readonly amount: number, private readonly currency: string = 'USD') {
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }
  }

  /**
   * Creates a new Money instance.
   * @param amount - The monetary amount
   * @param currency - The currency code (default: 'USD')
   */
  static of(amount: number, currency: string = 'USD'): Money {
    return new Money(amount, currency);
  }

  /**
   * Gets the monetary amount.
   */
  getAmount(): number {
    return this.amount;
  }

  /**
   * Gets the currency code.
   */
  getCurrency(): string {
    return this.currency;
  }

  /**
   * Adds another monetary value.
   * @param other - The money to add
   * @throws Error if currencies don't match
   */
  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add different currencies');
    }
    return Money.of(this.amount + other.amount, this.currency);
  }

  /**
   * Multiplies the monetary value by a factor.
   * @param factor - The multiplication factor
   */
  multiply(factor: number): Money {
    return Money.of(this.amount * factor, this.currency);
  }

  /**
   * Checks if two monetary values are equal.
   * @param other - The money to compare with
   */
  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  /**
   * Returns a string representation of the monetary value.
   */
  toString(): string {
    return `${this.amount} ${this.currency}`;
  }
}