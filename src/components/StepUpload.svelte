<script>
  import { appStatus, setStatus, setChat } from "@/store";
  import Dropzone from "svelte-file-dropzone";

  let files = {
    accepted: [],
    rejected: [],
  };

  async function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;

    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];

    if (acceptedFiles.length === 0) {
      return;
    }
    setStatus("LOADING");

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      setStatus("ERROR");
      return;
    }

    const { id, url, pages } = await res.json();
    setStatus("CHAT_MODE");
    setChat(id, url, pages);
  }
</script>

{#if files.accepted.length === 0}
  <Dropzone
    accept="application/pdf"
    multiple={false}
    class="bg-zinc-800/50 p-10 inner-shadow text-center rounded-md shadow-lg transition duration-500 hover:scale-105 hover:outline hover:shadow-white/40"
    on:drop={handleFilesSelect}
  >
    <span class="">
      <span class="font-bold">Arrastra</span> archivos aquí o
      <span class="font-bold">haz click</span> y elige los archivos
    </span>
  </Dropzone>
{/if}
<ol>
  {#each files.accepted as item}
    <li>{item.name}</li>
  {/each}
</ol>
