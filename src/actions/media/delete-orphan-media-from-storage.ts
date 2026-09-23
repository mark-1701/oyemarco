'use server';

import { deleteFromStorage } from '@/services/storage/r2';
import { ActionResult } from '@/types';

export const deleteOrphanMediaFromStorage = async (
  keys: string[]
): Promise<ActionResult<string[]>> => {
  try {
    const deletedKeys = await deleteFromStorage(keys);
    return { ok: true, data: deletedKeys };
  } catch {
    // Otra forma para evaluar errores
    // const message =
    //   error instanceof Error
    //     ? error.message
    //     : 'Error eliminando archivos del storage';
    // return { ok: false, message };

    return {
      ok: false,
      message: 'Error eliminando archivos del storage'
    };
  }
};
