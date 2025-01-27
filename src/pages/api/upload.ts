import type { APIRoute } from "astro";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { API_KEY } from "astro:env/client";
import { API_SECRET } from "astro:env/server";

cloudinary.config({ 
    cloud_name: 'dxlpfq4n1', 
    api_key: API_KEY, 
    api_secret: API_SECRET 
});

/**
 * Sube un archivo a Cloudinary usando un stream.
 * @param buffer - El buffer del archivo a subir.
 * @param options - Las opciones de subida.
 * @returns Una promesa que resuelve con la respuesta de la subida.
 */
const uploadStream = async (buffer: Uint8Array, options: { folder: string }): Promise<UploadApiResponse> => {
    return new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream(options, (error, result) => {
            if (result) return resolve(result);
            reject(error);      
        }).end(buffer);
    });
}

/**
 * Maneja la solicitud POST para subir un archivo.
 * @param request - La solicitud entrante que contiene el archivo.
 * @returns Una respuesta indicando el resultado de la operación de subida.
 */
export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return new Response('No file uploaded', { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const result = await uploadStream(uint8Array, {
        folder: 'pdf'
    });

    const { asset_id: id, secure_url: url, pages } = result;

    return new Response(JSON.stringify({ id, url, pages }));
}