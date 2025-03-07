/**
 * @fileoverview Clase que representa un usuario en el dominio.
 * Implementa el patrón Aggregate Root para la gestión de usuarios.
 */

import { UserData } from './UserData';
import { UserValidations } from './UserValidations';

/**
 * Clase que representa un usuario en el sistema.
 * Actúa como Aggregate Root para la gestión de usuarios.
 */
export class Usuario {
  private readonly userData: UserData;
  private contrasena: string;

  /**
   * @param id - Identificador único del usuario
   * @param correo - Correo electrónico del usuario
   * @param contrasena - Contraseña del usuario (debe estar hasheada)
   * @param nombre - Nombre completo del usuario
   */
  constructor(
    id: string,
    correo: string,
    contrasena: string,
    nombre: string
  ) {
    UserValidations.validarCorreo(correo);
    UserValidations.validarContrasena(contrasena);
    UserValidations.validarNombre(nombre);

    this.userData = new UserData(id, correo, nombre);
    this.contrasena = contrasena;
  }

  /**
   * Obtiene el identificador del usuario.
   * @returns El identificador único del usuario.
   */
  public obtenerId(): string {
    return this.userData.obtenerId();
  }

  /**
   * Obtiene el correo electrónico del usuario.
   * @returns El correo electrónico.
   */
  public obtenerCorreo(): string {
    return this.userData.obtenerCorreo();
  }

  /**
   * Actualiza el correo electrónico del usuario.
   * @param correo - Nuevo correo electrónico.
   */
  public establecerCorreo(correo: string): void {
    UserValidations.validarCorreo(correo);
    this.userData.establecerCorreo(correo);
  }

  /**
   * Obtiene el nombre del usuario.
   * @returns El nombre completo del usuario.
   */
  public obtenerNombre(): string {
    return this.userData.obtenerNombre();
  }

  /**
   * Actualiza el nombre del usuario.
   * @param nombre - Nuevo nombre.
   */
  public establecerNombre(nombre: string): void {
    UserValidations.validarNombre(nombre);
    this.userData.establecerNombre(nombre);
  }

  /**
   * Verifica si la contraseña proporcionada coincide con la almacenada.
   * @param contrasena - Contraseña a verificar.
   * @returns true si la contraseña coincide, false en caso contrario.
   */
  public verificarContrasena(contrasena: string): boolean {
    // En una implementación real, aquí se compararía el hash de la contraseña
    return this.contrasena === contrasena;
  }

  /**
   * Actualiza la contraseña del usuario.
   * @param contrasena - Nueva contraseña (debe estar hasheada).
   */
  public establecerContrasena(contrasena: string): void {
    UserValidations.validarContrasena(contrasena);
    this.contrasena = contrasena;
  }

  /**
   * Obtiene la fecha de creación del usuario.
   * @returns La fecha de creación.
   */
  public obtenerFechaCreacion(): Date {
    return this.userData.obtenerFechaCreacion();
  }

  /**
   * Obtiene la fecha de última modificación del usuario.
   * @returns La fecha de última modificación.
   */
  public obtenerFechaActualizacion(): Date {
    return this.userData.obtenerFechaActualizacion();
  }

  /**
   * Convierte el usuario a un objeto plano.
   * @returns Un objeto con los datos del usuario.
   */
  public aPrimitivos(): any {
    return {
      ...this.userData.aPrimitivos()
    };
  }
}