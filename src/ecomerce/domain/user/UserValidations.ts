/**
 * @fileoverview Clase que maneja las validaciones relacionadas con los usuarios.
 */

export class UserValidations {
  /**
   * Valida el formato del correo electrónico.
   * @param correo - Correo electrónico a validar.
   * @throws Error si el correo electrónico no es válido.
   */
  public static validarCorreo(correo: string): void {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !regexCorreo.test(correo)) {
      throw new Error('El correo electrónico no es válido');
    }
  }

  /**
   * Valida la contraseña.
   * @param contrasena - Contraseña a validar.
   * @throws Error si la contraseña no cumple con los requisitos.
   */
  public static validarContrasena(contrasena: string): void {
    if (!contrasena || contrasena.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
  }

  /**
   * Valida el nombre del usuario.
   * @param nombre - Nombre a validar.
   * @throws Error si el nombre no es válido.
   */
  public static validarNombre(nombre: string): void {
    if (!nombre || nombre.trim().length === 0) {
      throw new Error('El nombre no puede estar vacío');
    }
  }
}