/**
 * @fileoverview Clase que representa un usuario en el dominio.
 * Implementa el patrón Aggregate Root para la gestión de usuarios.
 */

import { DomainEvent } from '../events/DomainEvent';

/**
 * Clase que representa un usuario en el sistema.
 * Actúa como Aggregate Root para la gestión de usuarios.
 */
export class User {
  private readonly id: string;
  private email: string;
  private password: string;
  private name: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  /**
   * @param id - Identificador único del usuario
   * @param email - Correo electrónico del usuario
   * @param password - Contraseña del usuario (debe estar hasheada)
   * @param name - Nombre completo del usuario
   */
  constructor(
    id: string,
    email: string,
    password: string,
    name: string
  ) {
    this.validateEmail(email);
    this.validatePassword(password);
    this.validateName(name);

    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Obtiene el identificador del usuario.
   * @returns El identificador único del usuario.
   */
  public getId(): string {
    return this.id;
  }

  /**
   * Obtiene el correo electrónico del usuario.
   * @returns El correo electrónico.
   */
  public getEmail(): string {
    return this.email;
  }

  /**
   * Actualiza el correo electrónico del usuario.
   * @param email - Nuevo correo electrónico.
   */
  public setEmail(email: string): void {
    this.validateEmail(email);
    this.email = email;
    this.updateModificationDate();
  }

  /**
   * Obtiene el nombre del usuario.
   * @returns El nombre completo del usuario.
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Actualiza el nombre del usuario.
   * @param name - Nuevo nombre.
   */
  public setName(name: string): void {
    this.validateName(name);
    this.name = name;
    this.updateModificationDate();
  }

  /**
   * Verifica si la contraseña proporcionada coincide con la almacenada.
   * @param password - Contraseña a verificar.
   * @returns true si la contraseña coincide, false en caso contrario.
   */
  public checkPassword(password: string): boolean {
    // En una implementación real, aquí se compararía el hash de la contraseña
    return this.password === password;
  }

  /**
   * Actualiza la contraseña del usuario.
   * @param password - Nueva contraseña (debe estar hasheada).
   */
  public setPassword(password: string): void {
    this.validatePassword(password);
    this.password = password;
    this.updateModificationDate();
  }

  /**
   * Obtiene la fecha de creación del usuario.
   * @returns La fecha de creación.
   */
  public getCreatedAt(): Date {
    return new Date(this.createdAt.getTime());
  }

  /**
   * Obtiene la fecha de última modificación del usuario.
   * @returns La fecha de última modificación.
   */
  public getUpdatedAt(): Date {
    return new Date(this.updatedAt.getTime());
  }

  /**
   * Valida el formato del correo electrónico.
   * @param email - Correo electrónico a validar.
   * @throws Error si el correo electrónico no es válido.
   */
  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new Error('El correo electrónico no es válido');
    }
  }

  /**
   * Valida la contraseña.
   * @param password - Contraseña a validar.
   * @throws Error si la contraseña no cumple con los requisitos.
   */
  private validatePassword(password: string): void {
    if (!password || password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
  }

  /**
   * Valida el nombre del usuario.
   * @param name - Nombre a validar.
   * @throws Error si el nombre no es válido.
   */
  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('El nombre no puede estar vacío');
    }
  }

  /**
   * Actualiza la fecha de modificación al momento actual.
   */
  private updateModificationDate(): void {
    this.updatedAt = new Date();
  }

  /**
   * Convierte el usuario a un objeto plano.
   * @returns Un objeto con los datos del usuario.
   */
  public toPrimitives(): any {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}