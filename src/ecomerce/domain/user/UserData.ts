/**
 * @fileoverview Clase que representa los datos básicos de un usuario.
 */

export class UserData {
  private readonly fechaCreacion: Date;
  private fechaActualizacion: Date;

  constructor(
    private readonly id: string,
    private correo: string,
    private nombre: string
  ) {
    this.fechaCreacion = new Date();
    this.fechaActualizacion = new Date();
  }

  public obtenerId(): string {
    return this.id;
  }

  public obtenerCorreo(): string {
    return this.correo;
  }

  public establecerCorreo(correo: string): void {
    this.correo = correo;
    this.actualizarFechaModificacion();
  }

  public obtenerNombre(): string {
    return this.nombre;
  }

  public establecerNombre(nombre: string): void {
    this.nombre = nombre;
    this.actualizarFechaModificacion();
  }

  public obtenerFechaCreacion(): Date {
    return new Date(this.fechaCreacion.getTime());
  }

  public obtenerFechaActualizacion(): Date {
    return new Date(this.fechaActualizacion.getTime());
  }

  private actualizarFechaModificacion(): void {
    this.fechaActualizacion = new Date();
  }

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