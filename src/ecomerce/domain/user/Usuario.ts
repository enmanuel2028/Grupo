/**
 * @fileoverview Clase que representa un usuario en el dominio.
 * Implementa el patrón Aggregate Root para la gestión de usuarios.
 */

/**
 * Clase que representa un usuario en el sistema.
 * Actúa como Aggregate Root para la gestión de usuarios.
 */
export class Usuario {
  private readonly id: string;
  private correo: string;
  private contrasena: string;
  private nombre: string;
  private readonly fechaCreacion: Date;
  private fechaActualizacion: Date;

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
    this.validarCorreo(correo);
    this.validarContrasena(contrasena);
    this.validarNombre(nombre);

    this.id = id;
    this.correo = correo;
    this.contrasena = contrasena;
    this.nombre = nombre;
    this.fechaCreacion = new Date();
    this.fechaActualizacion = new Date();
  }

  /**
   * Obtiene el identificador del usuario.
   * @returns El identificador único del usuario.
   */
  public obtenerId(): string {
    return this.id;
  }

  /**
   * Obtiene el correo electrónico del usuario.
   * @returns El correo electrónico.
   */
  public obtenerCorreo(): string {
    return this.correo;
  }

  /**
   * Actualiza el correo electrónico del usuario.
   * @param correo - Nuevo correo electrónico.
   */
  public establecerCorreo(correo: string): void {
    this.validarCorreo(correo);
    this.correo = correo;
    this.actualizarFechaModificacion();
  }

  /**
   * Obtiene el nombre del usuario.
   * @returns El nombre completo del usuario.
   */
  public obtenerNombre(): string {
    return this.nombre;
  }

  /**
   * Actualiza el nombre del usuario.
   * @param nombre - Nuevo nombre.
   */
  public establecerNombre(nombre: string): void {
    this.validarNombre(nombre);
    this.nombre = nombre;
    this.actualizarFechaModificacion();
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
    this.validarContrasena(contrasena);
    this.contrasena = contrasena;
    this.actualizarFechaModificacion();
  }

  /**
   * Obtiene la fecha de creación del usuario.
   * @returns La fecha de creación.
   */
  public obtenerFechaCreacion(): Date {
    return new Date(this.fechaCreacion.getTime());
  }

  /**
   * Obtiene la fecha de última modificación del usuario.
   * @returns La fecha de última modificación.
   */
  public obtenerFechaActualizacion(): Date {
    return new Date(this.fechaActualizacion.getTime());
  }

  /**
   * Valida el formato del correo electrónico.
   * @param correo - Correo electrónico a validar.
   * @throws Error si el correo electrónico no es válido.
   */
  private validarCorreo(correo: string): void {
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
  private validarContrasena(contrasena: string): void {
    if (!contrasena || contrasena.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
  }

  /**
   * Valida el nombre del usuario.
   * @param nombre - Nombre a validar.
   * @throws Error si el nombre no es válido.
   */
  private validarNombre(nombre: string): void {
    if (!nombre || nombre.trim().length === 0) {
      throw new Error('El nombre no puede estar vacío');
    }
  }

  /**
   * Actualiza la fecha de modificación al momento actual.
   */
  private actualizarFechaModificacion(): void {
    this.fechaActualizacion = new Date();
  }

  /**
   * Convierte el usuario a un objeto plano.
   * @returns Un objeto con los datos del usuario.
   */
  public aPrimitivos(): any {
    return {
      id: this.id,
      correo: this.correo,
      nombre: this.nombre,
      fechaCreacion: this.fechaCreacion,
      fechaActualizacion: this.fechaActualizacion
    };
  }
}