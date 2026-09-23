'use server';

import prisma from '@/lib/prisma';
import { ActionResult } from '@/types';

export const checkDraftPost = async (): Promise<
  ActionResult<string | null>
> => {
  try {
    const post = await prisma.post.findFirst({
      where: {
        AND: [{ status: 'DRAFT' }, { deletedAt: null }]
      }
    });

    return {
      ok: true,
      data: post?.id ?? null
    };
  } catch {
    return {
      ok: false,
      message: 'Error cheackeando si hay algún post pendiente'
    };
  }
};
