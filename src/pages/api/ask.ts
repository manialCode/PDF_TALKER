import { responseSSE } from "@/utils/sse";
import { type APIRoute } from "astro";
import { OPENIA_KEY } from "astro:env/server";
import { readFile } from "node:fs/promises";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: OPENIA_KEY,
});

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const question = url.searchParams.get("question");

  if (!id) {
    return new Response("Missing id", { status: 400 });
  }
  if (!question) {
    return new Response("Missing question", { status: 400 });
  }

  const txt = await readFile(`public/text/${id}.txt`, `utf-8`);

  return responseSSE({ request }, async (sendEvent) => {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "system",
          content:
            'Eres un investigador Argentino experimentado, experto en interpretar y responder preguntas basadas en las fuentes proporcionadas. Utilizando el contexto proporcionado entre las etiquetas <context></context>, genera una respuesta concisa para una pregunta rodeada con las etiquetas <question></question>. Debes usar únicamente información del contexto. Usa un tono imparcial y periodístico. No repitas texto. Si no hay nada en el contexto relevante para la pregunta en cuestión, simplemente di "No lo sé". No intentes inventar una respuesta. Cualquier cosa entre los siguientes bloques html context se recupera de un banco de conocimientos, no es parte de la conversación con el usuario.',
        },
        {
          role: "user",
          content: `<context>${txt}</context><question>${question}</question>`,
        },
      ],
    });

    for (const part of response.choices) {
      sendEvent(part.message.content);
    }

    sendEvent("__END__");
  });
};
