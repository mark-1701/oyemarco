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
            {...register('name', {
              required: 'El nombre es obligatorio',
              maxLength: {
                value: 45,
                message: 'El nombre no puedoe tener más de 45 carácteres'
              }
            })}
          />
          {errors.name && (
            <SpanErrorMessage>{errors.name.message}</SpanErrorMessage>
          )}
        </InputForm>

        <InputForm>
          <input
            type="email"
            id="email"
            placeholder="tu email"
            className="rounded-xd h-9 bg-(--foreground) p-2 text-black
              placeholder:text-zinc-500"
            {...register('email', {
              required: 'El email es obligatorio',
              maxLength: {
                value: 200, 
                message: 'El correo no puede tener más de 200 carácteres'
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Ingresa un email válido'
              }
            })}
          />
          {errors.email && (
            <SpanErrorMessage>{errors.email.message}</SpanErrorMessage>
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
                value: 2000,
                message: 'El mensaje no puede tener más de 2000 carácteres'
              }
            })}
          ></textarea>
          {errors.message && (
            <SpanErrorMessage>{errors.message.message}</SpanErrorMessage>
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

const SpanErrorMessage = ({ children }: { children: React.ReactNode }) => (
  <span className="text-xs font-bold text-(--foreground)">* {children}</span>
);
