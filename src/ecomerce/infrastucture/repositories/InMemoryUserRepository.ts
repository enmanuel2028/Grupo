/**
 * @fileoverview Implementación en memoria del repositorio de usuarios.
 * Implementa el puerto UserRepository para pruebas y desarrollo.
 */

import { User } from '../../domain/user/User';
import { UserRepository } from '../../domain/user/UserRepository';

/**
 * Implementación en memoria del repositorio de usuarios.
 * Útil para pruebas y desarrollo.
 */
export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map<string, User>();
  }

  /**
   * Guarda un usuario en el repositorio.
   * @param user - El usuario a guardar
   */
  public async save(user: User): Promise<void> {
    this.users.set(user.getId(), user);
  }

  /**
   * Busca un usuario por su identificador.
   * @param id - El identificador del usuario
   * @returns El usuario encontrado o null si no existe
   */
  public async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  /**
   * Busca un usuario por su correo electrónico.
   * @param email - El correo electrónico del usuario
   * @returns El usuario encontrado o null si no existe
   */
  public async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.getEmail() === email) {
        return user;
      }
    }
    return null;
  }

  /**
   * Actualiza un usuario existente.
   * @param user - El usuario con los datos actualizados
   */
  public async update(user: User): Promise<void> {
    if (!this.users.has(user.getId())) {
      throw new Error('Usuario no encontrado');
    }
    this.users.set(user.getId(), user);
  }

  /**
   * Elimina un usuario del repositorio.
   * @param id - El identificador del usuario a eliminar
   */
  public async delete(id: string): Promise<void> {
    if (!this.users.has(id)) {
      throw new Error('Usuario no encontrado');
    }
    this.users.delete(id);
  }

  /**
   * Obtiene todos los usuarios del repositorio.
   * @returns Lista de usuarios
   */
  public async findAll(): Promise<User[]> {
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