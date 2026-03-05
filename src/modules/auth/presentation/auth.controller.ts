import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { LoginUseCase } from '../application/use-cases/login.usecase';
import { LoginSchema } from '../application/dtos/login.dto';
import type { LoginDto } from '../application/dtos/login.dto';
import { ZodValidationPipe } from '../../../core/pipes/zod-validation.pipe';

@Controller('auth')
export class AuthController {
    constructor(private readonly loginUseCase: LoginUseCase) { }

    @Post('login')
    @UsePipes(new ZodValidationPipe(LoginSchema))
    async login(@Body() loginDto: LoginDto) {
        return this.loginUseCase.execute(loginDto);
    }
}
