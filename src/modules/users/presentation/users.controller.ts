import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { CreateUserSchema } from '../application/dtos/create-user.dto';
import type { CreateUserDto } from '../application/dtos/create-user.dto';
import { ZodValidationPipe } from '../../../core/pipes/zod-validation.pipe';

@Controller('users')
export class UsersController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) { }

    @Post('register')
    @UsePipes(new ZodValidationPipe(CreateUserSchema))
    async register(@Body() createUserDto: CreateUserDto) {
        return this.createUserUseCase.execute(createUserDto);
    }
}
