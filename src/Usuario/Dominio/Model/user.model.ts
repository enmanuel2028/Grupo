export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'user';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister extends Omit<User, 'id' | 'role' | 'createdAt' | 'updatedAt'> {}

export interface UserResponse extends Omit<User, 'password'> {}

export interface UserUpdate extends Partial<UserRegister> {}