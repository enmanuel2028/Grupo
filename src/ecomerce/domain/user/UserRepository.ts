/**
 * @fileoverview Interfaz que define el contrato para el repositorio de usuarios.
 * Siguiendo el patrón de Puertos y Adaptadores (Arquitectura Hexagonal).
 */

import { Usuario } from './Usuario';

/**
 * Interfaz que define las operaciones disponibles para la persistencia de usuarios.
 * Actúa como un puerto en la arquitectura hexagonal.
 */
export interface RepositorioUsuarios {
  /**
   * Guarda un usuario en el repositorio.
   * @param usuario - El usuario a guardar
   */
  guardar(usuario: Usuario): Promise<void>;

  /**
   * Busca un usuario por su identificador.
   * @param id - El identificador del usuario
   * @returns El usuario encontrado o null si no existe
   */
  buscarPorId(id: string): Promise<Usuario | null>;

  /**
   * Busca un usuario por su correo electrónico.
   * @param correo - El correo electrónico del usuario
   * @returns El usuario encontrado o null si no existe
   */
  buscarPorCorreo(correo: string): Promise<Usuario | null>;

  /**
   * Actualiza un usuario existente.
   * @param usuario - El usuario con los datos actualizados
   */
  actualizar(usuario: Usuario): Promise<void>;

  /**
   * Elimina un usuario del repositorio.
   * @param id - El identificador del usuario a eliminar
   */
  eliminar(id: string): Promise<void>;

  /**
   * Obtiene todos los usuarios del repositorio.
   * @returns Lista de usuarios
   */
  obtenerTodos(): Promise<Usuario[]>;
}