'use client';

import { Paragraph, Stack } from '@/components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { sendEmail } from '@/actions/email/send-email';

type Inputs = {
  name: string;
  email: string;
  message: string;
};

export const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const resp = await sendEmail(data);

    if (!resp.ok) {
      toast.error('Ocurrió un error trantando de envíar el correo');
    } else {
      toast.success('Correo enviado exitosamente');
    }

    reset();
  };

  return (
    <Stack>
      <Paragraph>
        Estoy abierto a nuevos proyectos y oportunidades. Si tienes una
        propuesta o quieres hablar sobre una idea, puedes escribirme a través de
        este formulario.
      </Paragraph>

      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <InputForm>
          <input
            type="text"
            id="name"
            placeholder="nombre"
            className="rounded-xd h-9 bg-(--foreground) p-2 text-black
              placeholder:text-zinc-500"
            {...register('name', { required: true })}
          />
          {errors.name && (
            <span className="font-bold">* El nombre es obligatorio</span>
          )}
        </InputForm>

        <InputForm>
          <input
            type="email"
            id="email"
            placeholder="email"
            className="rounded-xd h-9 bg-(--foreground) p-2 text-black
              placeholder:text-zinc-500"
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Ingresa un email válido'
              }
            })}
          />
          {errors.email && (
            <span className="font-bold">* {errors.email.message}</span>
          )}
        </InputForm>

        <InputForm>
          <textarea
            id="message"
            placeholder="escribe tu mensaje..."
            className="rounded-xd h-20 bg-(--foreground) p-2 text-black
              placeholder:text-zinc-500"
            {...register('message', {
              required: 'El mensaje es obligatorio',
              maxLength: {
                value: 1500,
                message: 'El mensaje no puede tener más de 1500 carácteres'
              }
            })}
          ></textarea>
          {errors.message && (
            <span className="font-bold">* {errors.message.message}</span>
          )}
        </InputForm>

        <input
          type="submit"
          value="Envíar"
          disabled={isSubmitting}
          className="w-20 cursor-pointer self-end bg-(--foreground) p-1
            text-black disabled:opacity-50"
        />
      </form>
    </Stack>
  );
};

const InputForm = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">{children}</div>
);
