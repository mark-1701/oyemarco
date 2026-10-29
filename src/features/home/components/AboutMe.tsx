import { Caption, Paragraph, Stack } from '@/components';
import Image from 'next/image';

export const AboutMe = () => {
  return (
    <Stack className='my-8'>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <Image
            src={'/pixel.png'}
            alt="Foto de perfil"
            width={80}
            height={80}
            // className='grayscale'
          />
          <div>
            <h1
              className="font-serif text-lg font-bold text-(--foreground)
                uppercase sm:text-2xl "
            >
              marco muralles
            </h1>
            <Caption className="mb-0">Desarrollador web fullstack</Caption>
          </div>
        </div>

        <Paragraph className="mb-0 sm:mb-0">
          Ingeniero de software orientado a la simplicidad y la eficiencia.
          Escribo código limpio, firme y sostenible, sin soluciones a medias ni
          consumo innecesario de recursos computacionales.
        </Paragraph>
      </div>
    </Stack>
  );
};
