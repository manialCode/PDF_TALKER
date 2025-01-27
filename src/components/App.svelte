<script>
  import { Alert } from "flowbite-svelte";
  import { APP_STATUS, appStatus } from "@/store";
  import StepUpload from "./StepUpload.svelte";
  import StepLoading from "./StepLoading.svelte";
  import StepChat from "./StepChat.svelte";
</script>

<!-- Para acceder al valor de una store es suscribir el valor con el símbolo "$" + storeName -->
<div class="w-full flex justify-center items-center">
  {#if $appStatus === APP_STATUS.INIT}
    <StepUpload />
  {:else if $appStatus === APP_STATUS.LOADING}
    <StepLoading />
  {:else if $appStatus === APP_STATUS.ERROR}
    <div class="p-8">
      <Alert>
        <span class="font-bold"> Que rompiste?</span>
        Error interno
      </Alert>
    </div>
  {:else if $appStatus === APP_STATUS.CHAT_MODE}
    <StepChat />
  {:else}
    <Alert>
      <span class="font-bold">Acción no reconocida</span>
      Este estado no se encuentra registrado
    </Alert>
  {/if}
</div>
