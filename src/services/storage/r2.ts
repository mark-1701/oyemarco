'use server';

import {
  DeleteObjectsCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Instancia al cliente S3
const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
  }
});

// Crear URL para subir el archivo
export const createPresignedUpload = async ({
  key,
  fileType
}: {
  key: string;
  fileType: string;
}) => {
  try {
    const uploadUrl = await getSignedUrl(
      S3,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        ContentType: fileType
      }),
      { expiresIn: 3600 }
    );

    const publicUrl = `${process.env.R2_PUBLIC_URL_BASE}/${key}`;

    return { publicUrl, uploadUrl };
  } catch {
    throw new Error('Error creando la URL de subida');
  }
};

// Subir archivos al servicio storage
export const uploadImageToStorage = async (file: File, key: string) => {
  try {
    const { publicUrl, uploadUrl } = await createPresignedUpload({
      key,
      fileType: file.type
    });

    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type }
    });

    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    return publicUrl;
  } catch {
    throw new Error('Error en el servicio r2 subiendo la imagen');
  }
};

export const deleteFromStorage = async (keys: string[]) => {
  try {
    const resp = await S3.send(
      new DeleteObjectsCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Delete: {
          Objects: keys.map(key => ({ Key: key }))
        }
      })
    );

    const deletedMediaKeys =
      resp.Deleted?.filter(item => item.Key !== undefined).map(
        item => item.Key!
      ) ?? [];

    return deletedMediaKeys;
  } catch {
    throw new Error('Error en el servicio r2 eliminando los archivos');
  }
};
