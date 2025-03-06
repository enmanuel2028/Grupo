import { Favorito } from './Favorito';
import { User } from '../user/User';

export interface FavoritoRepository {
  save(favorito: Favorito): Promise<void>;
  findByUser(user: User): Promise<Favorito[]>;
  delete(favorito: Favorito): Promise<void>;
  findById(id: string): Promise<Favorito | null>;
}