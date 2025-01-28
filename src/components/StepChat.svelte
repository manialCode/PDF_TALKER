<script>
  import { appStatusInfo } from "@/store";
  import { Input, Label, Spinner } from "flowbite-svelte";

  const { url, pages, id } = $appStatusInfo;

  let loading = false;

  const numOfImagesToShow = Math.min(pages, 4);
  const images = Array.from({ length: numOfImagesToShow }, (_, i) => {
    const page = i + 1;
    return url
      .replace("/upload/", `/upload/w_400,h_540,c_fill,pg_${page}/`)
      .replace(".pdf", ".jpg");
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    loading = true;
    const question = event.target.question.value;

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        question,
      }),
    });

    if (!res.ok) {
      console.error("Error al preguntar");
      return;
    }

    const { answer } = await res.json();
  };
</script>

<div class="flex flex-col">
  <div class="grid grid-cols-4 gap-2">
    {#each images as image}
      <img
        src={image}
        alt={`PDF page`}
        class="rounded w-full h-auto aspect-[400/540]"
      />
    {/each}
  </div>

  <form class="mt-10 w-full" on:submit={handleSubmit}>
    <Label for="question" class="block mb-2 text-slate-100 text-xl "
      >Alguna duda?</Label
    >
    <input
      id="question"
      class="text-md bg-zinc-600/50 text-white shadow-lg w-full px-5 py-4 rounded-lg focus:outline-primary-600 focus:shadow-primary-500/50"
      required
      placeholder="Haz tu pregunta"
      autocomplete="false"
    />
  </form>

  {#if loading}
    <div class="flex justify-center items-center flex-col gap-y-2">
      <Spinner color="purple" />
    </div>
  {/if}
</div>
