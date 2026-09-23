import { z } from 'zod';

export const sendEmailInputSchema = z.object({
  name: z.string().min(1).max(45),
  email: z.email().max(200),
  message: z.string().min(1).max(2000)
});
