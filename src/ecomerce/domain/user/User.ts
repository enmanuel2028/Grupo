export class User {
  constructor(private id: string) {}

  getId(): string {
    return this.id;
  }

  equals(other: User): boolean {
    return this.id === other.id;
  }
}