'use client';

import { Post } from '@/app/generated/prisma/browser';
import { createHTML } from '@/features/post/utils';
import { formatDateShort } from '@/utils';
import { useEffect, useState } from 'react';

type BlogPostContentProps = {
  post: Post;
};

export const BlogPostContent = ({ post }: BlogPostContentProps) => {
  const [html, setHtml] = useState('');

  useEffect(() => setHtml(createHTML(post.content)), [post.content]);

  return (
    <>
      <div>
        <div className="mb-6">
          {post.title && (
            <h1
              className="mb-1 font-serif text-xl font-bold text-(--foreground)"
            >
              {post.title}
            </h1>
          )}
          <p className="text-(--foreground-400)">{`by marco | ${formatDateShort(post.createdAt)}`}</p>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="choco-article"
        />
      </div>
    </>
  );
};
