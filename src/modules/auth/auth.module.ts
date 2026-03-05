import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './presentation/auth.controller';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { UsersModule } from '../../modules/users/users.module';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: (configService.get<string>('JWT_EXPIRES_IN') || '7d') as any,
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [LoginUseCase, JwtStrategy],
    exports: [LoginUseCase],
})
export class AuthModule { }
