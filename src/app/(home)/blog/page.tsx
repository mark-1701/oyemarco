import { getPosts } from '@/actions';
import { Heading } from '@/components';
import { formatDateShort } from '@/utils';
import Link from 'next/link';

const BlogPage = async () => {
  const resp = await getPosts();

  if (!resp.ok) return <div>error consultando los artículos</div>;

  return (
    <div>
      <Heading as="h5" className="mb-6 text-(--foreground) sm:mb-6">
        Todos los artículos
      </Heading>

      {!resp.data.length && <p>No hay artículos disponibles</p>}

      <ul className="divide-y-1 divide-(--border)">
        {resp.data.map(post => (
          <li key={post.id} className="py-2">
            <div className="flex justify-between gap-4">
              <Link
                href={`/blog/${post.id}`}
                className="truncate hover:cursor-pointer
                  hover:text-(--foreground)"
              >
                {post.title ?? 'Sin título'}
              </Link>
              <p className="shrink-0 text-(--foreground-400)">
                {formatDateShort(post.createdAt)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
