import { Resend } from 'resend';

type SendContactEmailInput = {
  name: string;
  email: string;
  message: string;
};

export const sendContactEmail = async ({
  name,
  email,
  message
}: SendContactEmailInput) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'oyemarco <contacto@oyemarco.com>',
      to: ['mv.muralles@gmail.com'],
      replyTo: email,
      subject: `Nuevo mensaje de contacto - ${name}`,
      html: `
        <div>
          <h2>Nuevo mensaje de formulario de contacto:</h2>
          <p><strong>Nombre:</strong><br>${name}</p> 
          <p><strong>Email:</strong><br>${email}</p>
          <p><strong>Mensaje:</strong><br>${message}</p>
        </div>
      `
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new Error('Error en el servicio resend enviando el correo');
  }
};
