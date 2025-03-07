import { Favoritos } from './Favoritos';

/**
 * Puerto del repositorio de favoritos.
 * Define las operaciones disponibles para persistir y recuperar favoritos.
 */
export interface FavoritosRepository {
  /**
   * Guarda una lista de favoritos.
   * @param favoritos - Los favoritos a guardar
   */
  guardar(favoritos: Favoritos): Promise<void>;

  /**
   * Busca una lista de favoritos por su identificador.
   * @param id - El identificador de la lista de favoritos
   */
  buscarPorId(id: string): Promise<Favoritos | null>;

  /**
   * Busca la lista de favoritos de un usuario.
   * @param usuarioId - El identificador del usuario
   */
  buscarPorUsuario(usuarioId: string): Promise<Favoritos | null>;

  /**
   * Actualiza una lista de favoritos existente.
   * @param favoritos - La lista de favoritos con los datos actualizados
   */
  actualizar(favoritos: Favoritos): Promise<void>;

  /**
   * Elimina una lista de favoritos.
   * @param id - El identificador de la lista de favoritos
   */
  eliminar(id: string): Promise<void>;
}