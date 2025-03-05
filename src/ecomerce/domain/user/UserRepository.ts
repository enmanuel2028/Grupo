/**
 * @fileoverview Interfaz que define el contrato para el repositorio de usuarios.
 * Siguiendo el patrón de Ports and Adapters (Arquitectura Hexagonal).
 */

import { User } from './User';

/**
 * Interfaz que define las operaciones disponibles para la persistencia de usuarios.
 * Actúa como un puerto en la arquitectura hexagonal.
 */
export interface UserRepository {
  /**
   * Guarda un usuario en el repositorio.
   * @param user - El usuario a guardar
   */
  save(user: User): Promise<void>;

  /**
   * Busca un usuario por su identificador.
   * @param id - El identificador del usuario
   * @returns El usuario encontrado o null si no existe
   */
  findById(id: string): Promise<User | null>;

  /**
   * Busca un usuario por su correo electrónico.
   * @param email - El correo electrónico del usuario
   * @returns El usuario encontrado o null si no existe
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Actualiza un usuario existente.
   * @param user - El usuario con los datos actualizados
   */
  update(user: User): Promise<void>;

  /**
   * Elimina un usuario del repositorio.
   * @param id - El identificador del usuario a eliminar
   */
  delete(id: string): Promise<void>;

  /**
   * Obtiene todos los usuarios del repositorio.
   * @returns Lista de usuarios
   */
  findAll(): Promise<User[]>;
}