import { Favorito } from '../../domain/favoritos/Favorito';
import { FavoritoRepository } from '../../domain/favoritos/FavoritoRepository';
import { User } from '../../domain/user/User';
import { AbstractProducto } from '../../domain/productos/AbstractProducto';

export class FavoritoService {
  constructor(private readonly favoritoRepository: FavoritoRepository) {}

  async agregarFavorito(user: User, producto: AbstractProducto): Promise<void> {
    const favorito = new Favorito(
      crypto.randomUUID(),
      user,
      producto,
      new Date()
    );
    await this.favoritoRepository.save(favorito);
  }

  async obtenerFavoritosPorUsuario(user: User): Promise<Favorito[]> {
    return await this.favoritoRepository.findByUser(user);
  }

  async eliminarFavorito(favorito: Favorito): Promise<void> {
    await this.favoritoRepository.delete(favorito);
  }

  async obtenerFavoritoPorId(id: string): Promise<Favorito | null> {
    return await this.favoritoRepository.findById(id);
  }
}