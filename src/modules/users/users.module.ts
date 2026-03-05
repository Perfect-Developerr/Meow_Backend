import { Module } from '@nestjs/common';
import { UsersController } from './presentation/users.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { PrismaUserRepository } from './infrastructure/repositories/user.prisma.repository';
import { IUserRepository } from './domain/repositories/user.repository.interface';
import { PrismaService } from '../../core/database/prisma.service';
import { ZodValidationPipe } from '../../core/pipes/zod-validation.pipe';

@Module({
    controllers: [UsersController],
    providers: [
        PrismaService,
        CreateUserUseCase,
        {
            provide: IUserRepository,
            useClass: PrismaUserRepository,
        },
    ],
    exports: [IUserRepository],
})
export class UsersModule { }
