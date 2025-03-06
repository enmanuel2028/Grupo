/**
 * @fileoverview Implementación en memoria del repositorio de usuarios.
 * Implementa el puerto UserRepository para pruebas y desarrollo.
 */

import { Usuario } from '../../domain/user/Usuario';
import { RepositorioUsuarios } from '../../domain/user/UserRepository';

/**
 * Implementación en memoria del repositorio de usuarios.
 * Útil para pruebas y desarrollo.
 */
export class InMemoryUserRepository implements RepositorioUsuarios {
  private users: Map<string, Usuario>;

  constructor() {
    this.users = new Map<string, Usuario>();
  }

  /**
   * Guarda un usuario en el repositorio.
   * @param usuario - El usuario a guardar
   */
  public async guardar(usuario: Usuario): Promise<void> {
    this.users.set(usuario.obtenerId(), usuario);
  }

  /**
   * Busca un usuario por su identificador.
   * @param id - El identificador del usuario
   * @returns El usuario encontrado o null si no existe
   */
  public async buscarPorId(id: string): Promise<Usuario | null> {
    return this.users.get(id) || null;
  }

  /**
   * Busca un usuario por su correo electrónico.
   * @param correo - El correo electrónico del usuario
   * @returns El usuario encontrado o null si no existe
   */
  public async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    for (const usuario of this.users.values()) {
      if (usuario.obtenerCorreo() === correo) {
        return usuario;
      }
    }
    return null;
  }

  /**
   * Actualiza un usuario existente.
   * @param usuario - El usuario con los datos actualizados
   */
  public async actualizar(usuario: Usuario): Promise<void> {
    if (!this.users.has(usuario.obtenerId())) {
      throw new Error('Usuario no encontrado');
    }
    this.users.set(usuario.obtenerId(), usuario);
  }

  /**
   * Elimina un usuario del repositorio.
   * @param id - El identificador del usuario a eliminar
   */
  public async eliminar(id: string): Promise<void> {
    if (!this.users.has(id)) {
      throw new Error('Usuario no encontrado');
    }
    this.users.delete(id);
  }

  /**
   * Obtiene todos los usuarios del repositorio.
   * @returns Lista de usuarios
   */
  public async obtenerTodos(): Promise<Usuario[]> {
    return Array.from(this.users.values());
  }

  /**
   * Limpia todos los usuarios del repositorio.
   * Útil para pruebas.
   */
  public clear(): void {
    this.users.clear();
  }
}