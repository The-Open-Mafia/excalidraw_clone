<script lang="ts">
  import { init } from "@excalidraw_clone/excalidraw";
  import { onMount } from "svelte";
  import ToolBar from "./lib/ToolBar.svelte";
  import OptionsBox from "./lib/OptionsBox.svelte";
  onMount(() => {
    const canvas = document.querySelector("canvas");
    canvas!.width = innerWidth;
    canvas!.height = innerHeight;
    init(canvas!);
  });
</script>

<main>
  <ToolBar />
  <OptionsBox/>
  <canvas></canvas>
</main>
