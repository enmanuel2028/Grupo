/**
 * @fileoverview Evento de dominio que representa la creación de un usuario.
 * Se emite cuando un nuevo usuario es creado en el sistema.
 */

import { DomainEvent } from './DomainEvent';

/**
 * Evento que se emite cuando se crea un nuevo usuario.
 * Contiene la información relevante del usuario creado.
 */
export class UserCreatedEvent implements DomainEvent {
  private readonly timestamp: Date;

  constructor(
    private readonly userId: string,
    private readonly email: string,
    private readonly name: string
  ) {
    this.timestamp = new Date();
  }

  /**
   * Obtiene el identificador del usuario creado.
   * @returns El ID del usuario
   */
  public getUserId(): string {
    return this.userId;
  }

  /**
   * Obtiene el correo electrónico del usuario creado.
   * @returns El correo electrónico
   */
  public getEmail(): string {
    return this.email;
  }

  /**
   * Obtiene el nombre del usuario creado.
   * @returns El nombre completo
   */
  public getUserName(): string {
    return this.name;
  }

  /**
   * Obtiene la marca de tiempo del evento.
   * @returns La fecha y hora de creación
   */
  public getTimestamp(): Date {
    return new Date(this.timestamp.getTime());
  }

  /**
   * Obtiene la fecha y hora en que ocurrió el evento.
   * @returns La fecha y hora del evento.
   */
  public getDateTime(): Date {
    return new Date(this.timestamp.getTime());
  }

  /**
   * Obtiene el nombre del evento.
   * @returns El nombre del evento
   */
  public getName(): string {
    return 'user.created';
  }

  /**
   * Obtiene los datos del evento en formato JSON.
   * @returns Un objeto con los datos del evento.
   */
  public toJSON(): object {
    return {
      userId: this.userId,
      email: this.email,
      name: this.name,
      timestamp: this.timestamp
    };
  }

  /**
   * Convierte el evento a un objeto plano.
   * @returns Un objeto con los datos del evento
   */
  public toPrimitives(): any {
    return {
      userId: this.userId,
      email: this.email,
      name: this.name,
      timestamp: this.timestamp
    };
  }

  /**
   * Crea una representación en cadena del evento.
   */
  public toString(): string {
    return `UserCreatedEvent [userId=${this.userId}, email=${this.email}, name=${this.name}, timestamp=${this.timestamp.toISOString()}]`;
  }
}