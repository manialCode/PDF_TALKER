<script>
  import { appStatusInfo, setStatus } from "@/store";
  import { Label, Spinner } from "flowbite-svelte";

  const { url, pages, id } = $appStatusInfo;

  let loading = false;
  let answer = "";

  const numOfImagesToShow = Math.min(pages, 4);
  const images = Array.from({ length: numOfImagesToShow }, (_, i) => {
    const page = i + 1;
    return url
      .replace("/upload/", `/upload/w_400,h_540,c_fill,pg_${page}/`)
      .replace(".pdf", ".jpg");
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    answer = "";
    loading = true;
    const question = event.target.question.value;

    const searchParams = new URLSearchParams();
    searchParams.append("id", id);
    searchParams.append("question", question);

    try {
      const eventSource = new EventSource(
        `/api/ask?${searchParams.toString()}`
      );
      loading = false;
      const incomingData = JSON.parse(event.data);
      if (incomingData === "__END__") {
        eventSource.close();
        return;
      }
      anser += incomingData;
    } catch (e) {
      setStatus("ERROR");
      console.error(e);
    } finally {
      loading = false;
    }
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
  {#if answer}
    <div class="mt-8">
      <p class="font-medium">GTP:</p>
      <p>{answer}</p>
    </div>
  {/if}
</div>
