import { Caption, Heading, Stack } from '@/components';
import projects from '@/data/projects.json';
import Image from 'next/image';

export const Projects = () => {
  return (
    <Stack>
      <div className="my-6 space-y-6">
        {projects.map(
          ({ imageURL, title, description, repository, preview }, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3"
            >
              <div>
                <Heading
                  as="h6"
                  className="text-sm font-normal text-(--foreground-500) italic
                    sm:text-sm sm:font-normal"
                >
                  {title}
                </Heading>

                <Caption className="mb-1">{description}</Caption>

                <a
                  href={repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-(--foreground-500) underline italic"
                >
                  ver más...
                </a>
              </div>

              <a
                href={preview}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden h-[80px] w-[120px] shrink-0 hover:opacity-75
                  sm:block"
              >
                <Image
                  src={imageURL}
                  alt={'loli-bahia'}
                  width={80}
                  height={120}
                  className="h-full w-full object-cover"
                />
              </a>
            </div>
          )
        )}
      </div>
    </Stack>
  );
};
