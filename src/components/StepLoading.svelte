<script>
  import { Spinner, Button } from "flowbite-svelte";
</script>

<div class="flex flex-wrap items-center gap-2">
  <Button outline color="dark" class="cursor-none focus:outline-none">
    <Spinner class="me-3" color="purple" size={8} />
    Subiendo archivo
  </Button>
</div>
