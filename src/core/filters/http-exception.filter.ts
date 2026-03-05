import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const requestId = (request as any).id || uuidv4();

        const message =
            exception instanceof HttpException
                ? exception.getResponse()
                : 'Internal server error';

        const errorResponse = {
            success: false,
            error: {
                code: status === HttpStatus.INTERNAL_SERVER_ERROR ? 'INTERNAL_ERROR' : (message as any).error || 'BAD_REQUEST',
                message: typeof message === 'string' ? message : (message as any).message || message,
                requestId,
                timestamp: new Date().toISOString(),
                path: request.url,
            },
        };

        // Note: In a real app, we'd use Pino here to log the error with the requestId
        console.error(`[${requestId}] ${status} ${request.method} ${request.url}`, exception);

        response.status(status).json(errorResponse);
    }
}
