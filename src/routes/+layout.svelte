<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/eyes.svg";
  import { technologiesStore } from "$lib/stores/technologiesStore";
  import { onMount } from "svelte";

  let { children } = $props();

  onMount(() => {
    technologiesStore.load();
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}