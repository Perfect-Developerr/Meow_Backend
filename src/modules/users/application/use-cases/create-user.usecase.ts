import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class CreateUserUseCase {
    constructor(private readonly userRepo: IUserRepository) { }

    async execute(dto: CreateUserDto) {
        // 1. Validar si el email o username ya existen
        const existingEmail = await this.userRepo.findByEmail(dto.email);
        if (existingEmail) throw new ConflictException('Email already in use');

        const existingUsername = await this.userRepo.findByUsername(dto.username);
        if (existingUsername) throw new ConflictException('Username already in use');

        // 2. Hashear password
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // 3. Crear entidad de dominio
        const user = new User({
            email: dto.email,
            username: dto.username,
            password: hashedPassword,
        });

        // 4. Guardar
        const saved = await this.userRepo.save(user);

        return saved.toJSON();
    }
}
