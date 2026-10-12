'use server';

import prisma from '@/lib/prisma';
import { ActionResult } from '@/types';
import { revalidatePath } from 'next/cache';

export const createPost = async (
  title: string,
  content: any
): Promise<ActionResult<string>> => {
  try {
    const post = await prisma.post.create({
      data: {
        content,
        title
      }
    });

    revalidatePath(`/blog`);
    revalidatePath(`/dashboard/posts`);

    return {
      ok: true,
      data: post.id
    };
  } catch {
    return {
      ok: false,
      message: 'Error creando el post'
    };
  }
};
