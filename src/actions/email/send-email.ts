'use server';

import { sendEmailInputSchema } from '@/schemas';
import { sendContactEmail } from '@/services/email/resend';
import { ActionResult } from '@/types';
import { z } from 'zod';

type SendEmailInput = z.infer<typeof sendEmailInputSchema>;

export const sendEmail = async ({
  name,
  email,
  message
}: SendEmailInput): Promise<ActionResult<null>> => {
  try {
    const result = sendEmailInputSchema.safeParse({
      name,
      email,
      message
    });

    if (!result.success) {
      return {
        ok: false,
        message: 'Los datos proporcionados no son válidos'
      };
    }

    await sendContactEmail(result.data);

    return {
      ok: true,
      data: null
    };
  } catch {
    return {
      ok: false,
      message: 'Error tratando de enviar el correo'
    };
  }
};
