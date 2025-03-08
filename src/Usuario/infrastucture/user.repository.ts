import { User, UserRegister, UserUpdate, UserResponse } from '../Dominio/Model/user.model';

export interface IUserRepository {
    findById(id: number): Promise<UserResponse | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<UserResponse[]>;
    create(user: UserRegister): Promise<UserResponse>;
    update(id: number, user: UserUpdate): Promise<UserResponse>;
    delete(id: number): Promise<boolean>;
    validateCredentials(email: string, password: string): Promise<User | null>;
}