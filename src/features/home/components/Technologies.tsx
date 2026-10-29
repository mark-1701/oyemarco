import { Stack } from '@/components';
import clsx from 'clsx';

const skills: { title: string; icon: string }[] = [
  { title: 'HTML5', icon: 'html5' },
  { title: 'CSS3', icon: 'css3' },
  { title: 'JavaScript', icon: 'javascript' },
  { title: 'TypeScript', icon: 'typescript' },
  { title: 'Node.js', icon: 'nodejs' },
  { title: 'NEXT.js', icon: 'nextjs' },
  { title: 'C#/.NET', icon: 'dot-net' },
  { title: 'Java/Android', icon: 'androidstudio' },
  { title: 'SQL Server', icon: 'microsoftsqlserver' },
  { title: 'MySQL', icon: 'mysql' },
  { title: 'MongoDB', icon: 'mongodb' },
  { title: 'Docker', icon: 'docker' },
  { title: 'Git', icon: 'git' }
];

export const Technologies = () => {
  return (
    <Stack>
      <div className="my-8 grid grid-cols-5 gap-8 sm:grid-cols-6 sm:gap-12">
        {skills.map(({ title, icon }) => (
          <Technology key={title} title={title} icon={icon} />
        ))}
      </div>
    </Stack>
  );
};

const Technology = ({ title, icon }: { title: string; icon?: string }) => {
  return (
    <figure className="flex flex-col items-center gap-3">
      <i
        className={clsx(
          'text-[24px] text-(--foreground-500) sm:text-[36px]',
          `devicon-${icon}-plain`
        )}
      ></i>
      <figcaption className="text-center text-xs">{title}</figcaption>
    </figure>
  );
};
