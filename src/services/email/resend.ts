import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { data, error } = await resend.emails.send({
      from: 'oyemarco <contacto@oyemarco.com>',
      to: ['mv.muralles@gmail.com'],
      subject: 'Nuevo mensaje de contacto',
      html: `
        <div>
          <h3>Nuevo mensaje de formulario de contacto:</h3>
          <ul>
            <li><b>Nombre:</b> ${name}</li>
            <li><b>Email:</b> ${email}</li>
            <li><b>Mensaje:</b> ${message}</li>
          </ul>
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
