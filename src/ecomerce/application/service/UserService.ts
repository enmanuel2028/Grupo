/**
 * @fileoverview Servicio de aplicación para la gestión de usuarios.
 * Implementa los casos de uso relacionados con usuarios.
 */

import { User } from '../../domain/user/User';
import { UserRepository } from '../../domain/user/UserRepository';
import { UserCreatedEvent } from '../../domain/events/UserCreatedEvent';
import { ProductoEventEmitter } from '../../domain/events/ProductoEventEmitter';

/**
 * Servicio que implementa la lógica de negocio relacionada con usuarios.
 */
export class UserService {
  private readonly eventEmitter: ProductoEventEmitter;

  /**
   * @param userRepository - Repositorio de usuarios
   */
  constructor(
    private readonly userRepository: UserRepository
  ) {
    this.eventEmitter = ProductoEventEmitter.getInstance();
  }

  /**
   * Crea un nuevo usuario.
   * @param id - Identificador único del usuario
   * @param email - Correo electrónico
   * @param password - Contraseña (debe estar hasheada)
   * @param name - Nombre completo
   * @returns El usuario creado
   * @throws Error si el correo ya está registrado
   */
  public async createUser(
    id: string,
    email: string,
    password: string,
    name: string
  ): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('El correo electrónico ya está registrado');
    }

    const user = new User(id, email, password, name);
    await this.userRepository.save(user);

    // Emitir evento de usuario creado
    this.eventEmitter.emit(
      new UserCreatedEvent(user.getId(), user.getEmail(), user.getName())
    );

    return user;
  }

  /**
   * Actualiza los datos de un usuario existente.
   * @param id - Identificador del usuario
   * @param email - Nuevo correo electrónico (opcional)
   * @param name - Nuevo nombre (opcional)
   * @returns El usuario actualizado
   * @throws Error si el usuario no existe
   */
  public async updateUser(
    id: string,
    email?: string,
    name?: string
  ): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (email) {
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser && existingUser.getId() !== id) {
        throw new Error('El correo electrónico ya está registrado');
      }
      user.setEmail(email);
    }

    if (name) {
      user.setName(name);
    }

    await this.userRepository.update(user);
    return user;
  }

  /**
   * Cambia la contraseña de un usuario.
   * @param id - Identificador del usuario
   * @param currentPassword - Contraseña actual
   * @param newPassword - Nueva contraseña
   * @throws Error si el usuario no existe o la contraseña actual es incorrecta
   */
  public async changePassword(
    id: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (!user.checkPassword(currentPassword)) {
      throw new Error('La contraseña actual es incorrecta');
    }

    user.setPassword(newPassword);
    await this.userRepository.update(user);
  }

  /**
   * Elimina un usuario del sistema.
   * @param id - Identificador del usuario
   * @throws Error si el usuario no existe
   */
  public async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    await this.userRepository.delete(id);
  }

  /**
   * Busca un usuario por su identificador.
   * @param id - Identificador del usuario
   * @returns El usuario encontrado o null si no existe
   */
  public async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  /**
   * Busca un usuario por su correo electrónico.
   * @param email - Correo electrónico del usuario
   * @returns El usuario encontrado o null si no existe
   */
  public async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  /**
   * Obtiene todos los usuarios del sistema.
   * @returns Lista de usuarios
   */
  public async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}