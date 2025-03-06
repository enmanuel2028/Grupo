import { Favorito } from '../../domain/favoritos/Favorito';
import { FavoritoRepository } from '../../domain/favoritos/FavoritoRepository';
import { User } from '../../domain/user/User';

export class InMemoryFavoritoRepository implements FavoritoRepository {
  private favoritos: Favorito[] = [];

  async save(favorito: Favorito): Promise<void> {
    const index = this.favoritos.findIndex(f => f.equals(favorito));
    if (index >= 0) {
      this.favoritos[index] = favorito;
    } else {
      this.favoritos.push(favorito);
    }
  }

  async findByUser(user: User): Promise<Favorito[]> {
    return this.favoritos.filter(f => f.getUser().getId() === user.getId());
  }

  async delete(favorito: Favorito): Promise<void> {
    this.favoritos = this.favoritos.filter(f => !f.equals(favorito));
  }

  async findById(id: string): Promise<Favorito | null> {
    const favorito = this.favoritos.find(f => f.getId() === id);
    return favorito || null;
  }
}