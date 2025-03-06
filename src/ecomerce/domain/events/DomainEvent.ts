/**
 * @fileoverview Interfaz base para todos los eventos de dominio.
 * Define el contrato común que deben implementar todos los eventos.
 */

/**
 * Interfaz que define la estructura básica de un evento de dominio.
 */
export interface DomainEvent {
  /**
   * Obtiene el nombre del evento.
   * @returns El nombre del evento.
   */
  getName(): string;

  /**
   * Obtiene la fecha y hora en que ocurrió el evento.
   * @returns La fecha y hora del evento.
   */
  getDateTime(): Date;

  /**
   * Obtiene los datos del evento en formato JSON.
   * @returns Un objeto con los datos del evento.
   */
  toJSON(): object;

  /**
   * Crea una representación en cadena del evento.
   * @returns Una cadena que describe el evento.
   */
  toString(): string;
}