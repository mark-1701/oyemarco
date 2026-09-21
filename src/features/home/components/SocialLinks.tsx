import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';
import { IoLogoFacebook, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';

const socialNetworks = [
  {
    title: 'Facebook',
    icon: IoLogoFacebook,
    link: 'https://www.facebook.com/profile.php?id=100011420378485'
  },
  {
    title: 'X',
    icon: FaXTwitter
  },
  {
    title: 'Linkedin',
    icon: IoLogoLinkedin
  },
  {
    title: 'Github',
    icon: IoLogoGithub,
    link: 'https://github.com/mark-1701'
  }
];

export const SocialLinks = () => {
  return (
    <div className="flex gap-4">
      {socialNetworks.map(({ icon: Icon, title, link }) =>
        link ? (
          <Link
            key={title}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={title}
          >
            <Icon
              size={18}
              className="text-(--foreground-600) hover:cursor-pointer"
            />
          </Link>
        ) : (
          <Icon
            key={title}
            size={18}
            className="cursor-pointer text-(--foreground-600)"
            aria-label={title}
          />
        )
      )}
    </div>
  );
};
