import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from '../../../users/domain/repositories/user.repository.interface';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly userRepo: IUserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async execute(dto: LoginDto) {
        // 1. Buscar usuario
        const user = await this.userRepo.findByEmail(dto.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        // 2. Validar password
        const isPasswordValid = await bcrypt.compare(dto.password, user.password || '');
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        // 3. Generar tokens
        const payload = { sub: user.id, email: user.email, role: user.role };

        return {
            user: user.toJSON(),
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
