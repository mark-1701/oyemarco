'use server';

import prisma from '@/lib/prisma';
import { ActionResult } from '@/types';
import { revalidatePath } from 'next/cache';

export const deletePost = async (id: string): Promise<ActionResult<null>> => {
  try {
    await prisma.post.update({
      where: { id },
      data: {
        deletedAt: new Date()
      }
    });

    revalidatePath(`/blog`);
    revalidatePath(`/dashboard/posts`);

    return {
      ok: true,
      data: null
    };
  } catch {
    return {
      ok: false,
      message: 'Error eliminando el post'
    };
  }
};
