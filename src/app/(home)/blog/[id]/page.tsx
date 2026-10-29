import { getPostById } from '@/actions';
import { Stack } from '@/components';
import { BlogPostContent, SocialShareLinks } from '@/features/blog';
import Link from 'next/link';
import { GoArrowLeft } from 'react-icons/go';

type BlogIdPage = {
  params: {
    id: string;
  };
};

const BlogPageId = async ({ params }: BlogIdPage) => {
  const { id } = await params;

  const resp = await getPostById(id);

  if (!resp.ok) return <p>No existe ese artículo</p>;

  return (
    <>
      {/* top-menu = 1.5 */}
      {/* blog-page = 3 rem */}
      {/* margin-top-mobile = 1rem */}
      {/* margin-top-desktop = 5rem */}

      {/* mobile = 1.5 + 3 + 1 */}
      {/* desktop = 1.5 + 3 + 5 */}
      <div
        className="min-h-[calc(100dvh-5.5rem)] sm:min-h-[calc(100dvh-9.5rem)]"
      >
        <Link
          className="mb-8 flex items-center gap-1 text-(--foreground-500)
            hover:cursor-pointer hover:underline"
          href="/blog"
        >
          <GoArrowLeft size={15} /> regresar
        </Link>
        <BlogPostContent post={resp.data} />
      </div>

      <div
        className="mt-12 mb-19 border-t border-b border-dashed
          border-(--border-strong)"
      >
        <Stack>
          <p className="mb-6 text-(--foreground-500) italic">
            Comparte este artículo en:
          </p>
          <SocialShareLinks />
        </Stack>
      </div>
    </>
  );
};

export default BlogPageId;
