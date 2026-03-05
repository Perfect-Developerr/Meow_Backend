import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';
import { User, UserRole } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async save(user: User): Promise<User> {
        const saved = await this.prisma.user.create({
            data: {
                email: user.email,
                username: user.username,
                password: user.password || '',
                role: user.role,
            },
        });

        return this.mapToDomain(saved);
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        return user ? this.mapToDomain(user) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        return user ? this.mapToDomain(user) : null;
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { username } });
        return user ? this.mapToDomain(user) : null;
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        const updated = await this.prisma.user.update({
            where: { id },
            data: {
                email: data.email,
                username: data.username,
            },
        });

        return this.mapToDomain(updated);
    }

    private mapToDomain(prismaUser: any): User {
        return new User({
            id: prismaUser.id,
            email: prismaUser.email,
            username: prismaUser.username,
            password: prismaUser.password,
            role: prismaUser.role as UserRole,
            createdAt: prismaUser.createdAt,
            updatedAt: prismaUser.updatedAt,
        });
    }
}
