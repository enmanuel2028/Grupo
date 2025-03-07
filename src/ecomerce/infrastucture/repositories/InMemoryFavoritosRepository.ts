import { Favoritos } from '../../domain/favoritos/Favoritos';
import { FavoritosRepository } from '../../domain/favoritos/FavoritosRepository';

/**
 * Implementación en memoria del repositorio de favoritos.
 * Útil para pruebas y desarrollo.
 */
export class InMemoryFavoritosRepository implements FavoritosRepository {
  private favoritos: Map<string, Favoritos>;

  constructor() {
    this.favoritos = new Map<string, Favoritos>();
  }

  /**
   * Guarda una lista de favoritos en el repositorio.
   * @param favoritos - Los favoritos a guardar
   */
  public async guardar(favoritos: Favoritos): Promise<void> {
    this.favoritos.set(favoritos.obtenerId(), favoritos);
  }

  /**
   * Busca una lista de favoritos por su identificador.
   * @param id - El identificador de la lista de favoritos
   * @returns La lista de favoritos encontrada o null si no existe
   */
  public async buscarPorId(id: string): Promise<Favoritos | null> {
    return this.favoritos.get(id) || null;
  }

  /**
   * Busca la lista de favoritos de un usuario.
   * @param usuarioId - El identificador del usuario
   * @returns La lista de favoritos del usuario o null si no existe
   */
  public async buscarPorUsuario(usuarioId: string): Promise<Favoritos | null> {
    for (const favoritos of this.favoritos.values()) {
      if (favoritos.obtenerUsuario().obtenerId() === usuarioId) {
        return favoritos;
      }
    }
    return null;
  }

  /**
   * Actualiza una lista de favoritos existente.
   * @param favoritos - La lista de favoritos con los datos actualizados
   */
  public async actualizar(favoritos: Favoritos): Promise<void> {
    if (!this.favoritos.has(favoritos.obtenerId())) {
      throw new Error('Lista de favoritos no encontrada');
    }
    this.favoritos.set(favoritos.obtenerId(), favoritos);
  }

  /**
   * Elimina una lista de favoritos del repositorio.
   * @param id - El identificador de la lista de favoritos a eliminar
   */
  public async eliminar(id: string): Promise<void> {
    if (!this.favoritos.has(id)) {
      throw new Error('Lista de favoritos no encontrada');
    }
    this.favoritos.delete(id);
  }

  /**
   * Limpia todas las listas de favoritos del repositorio.
   * Útil para pruebas.
   */
  public clear(): void {
    this.favoritos.clear();
  }
}