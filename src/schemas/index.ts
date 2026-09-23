import { z } from 'zod';

export const sendEmailInputSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  message: z.string().min(1).max(2000)
});
