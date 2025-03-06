import { AbstractProducto } from '../productos/AbstractProducto';
import { User } from '../user/User';

export class Favorito {
  constructor(
    private readonly id: string,
    private readonly user: User,
    private readonly producto: AbstractProducto,
    private readonly fechaAgregado: Date
  ) {}

  public getId(): string {
    return this.id;
  }

  public getUser(): User {
    return this.user;
  }

  public getProducto(): AbstractProducto {
    return this.producto;
  }

  public getFechaAgregado(): Date {
    return this.fechaAgregado;
  }

  public equals(other: Favorito): boolean {
    return this.id === other.id;
  }
}