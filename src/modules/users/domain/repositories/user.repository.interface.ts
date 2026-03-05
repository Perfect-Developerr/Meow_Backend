import { User } from '../entities/user.entity';

export abstract class IUserRepository {
    abstract save(user: User): Promise<User>;
    abstract findById(id: string): Promise<User | null>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findByUsername(username: string): Promise<User | null>;
    abstract update(id: string, data: Partial<User>): Promise<User>;
}
