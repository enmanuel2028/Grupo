/**
 * Representa un valor monetario con monto y moneda.
 * Implementa el patrón de objeto de valor para manejar dinero en el dominio.
 */
export class Money {
  private constructor(private readonly amount: number, private readonly currency: string = 'COP') {
    if (amount < 0) {
      throw new Error('El monto no puede ser negativo');
    }
  }

  /**
   * Crea una nueva instancia de Money.
   * @param amount - El monto monetario
   * @param currency - El código de la moneda (por defecto: 'COP')
   */
  static of(amount: number, currency: string = 'COP'): Money {
    return new Money(amount, currency);
  }

  /**
   * Obtiene el monto monetario.
   */
  getAmount(): number {
    return this.amount;
  }

  /**
   * Obtiene el código de la moneda.
   */
  getCurrency(): string {
    return this.currency;
  }

  /**
   * Suma otro valor monetario.
   * @param other - El dinero a sumar
   * @throws Error si las monedas no coinciden
   */
  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('No se pueden sumar diferentes monedas');
    }
    return Money.of(this.amount + other.amount, this.currency);
  }

  /**
   * Multiplica el valor monetario por un factor.
   * @param factor - El factor de multiplicación
   */
  multiply(factor: number): Money {
    return Money.of(this.amount * factor, this.currency);
  }

  /**
   * Verifica si dos valores monetarios son iguales.
   * @param other - El dinero a comparar
   */
  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  /**
   * Devuelve una representación en cadena del valor monetario.
   */
  toString(): string {
    return `${this.amount} ${this.currency}`;
  }
}