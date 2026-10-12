'use client';

import { authClient } from '@/lib/auth-client';
import { useState } from 'react';
import { toast } from 'react-toastify';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const { error } = await authClient.signIn.email(
      {
        /**
         * The user email
         */
        email,
        /**
         * The user password
         */
        password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: '/dashboard',
        /**
         * remember the user session after the browser is closed.
         * @default true
         */
        rememberMe: false
      },
      {
        //callbacks
      }
    );

    if (error) {
      toast.error('Ocurrió algún error iniciando sesión');
    }
  };

  return (
    <div className="flex h-dvh w-dvw items-center justify-center">
      <div className="w-80 rounded border border-gray-300 bg-white p-4 px-8">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <p className="mx-auto font-medium">Autenticación</p>

          <input
            type="text"
            name="email"
            id="email"
            placeholder="Ingresa el email"
            className="rounded border border-gray-200 p-1"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Ingresa la contraseña"
            className="mb-4 rounded border border-gray-200 p-1 font-[Arial]"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <input
            type="submit"
            value="Iniciar Sesión"
            className="cursor-pointer bg-gray-200 p-0.5 text-black"
          />
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
