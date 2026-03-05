import { z } from 'zod';

export const CreateUserSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/),
    password: z.string().min(8),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
