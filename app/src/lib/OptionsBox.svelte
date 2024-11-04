<script lang="ts">
  import { useEmitter } from "@excalidraw_clone/excalidraw";
  import ColorPickerButton from "./ColorPickerButton.svelte";

  let isShapeSelected = $state(true);
  const { on } = useEmitter();

  on("shapeSelected", (shape) => {
    isShapeSelected = !!shape;
  });
</script>

{#if isShapeSelected}
  <div
    class="absolute top-1/2 -translate-y-1/2 rounded-lg bg-white flex-col p-3 left-5 options"
  >
    <div>
      <h3 class="mb-1">Stroke</h3>
      <div class="grid py-1">
        <ColorPickerButton />
      </div>
    </div>
  </div>
{/if}

<style>
  .options {
    box-shadow:
      0px 0px 0.9310142993927002px 0px rgba(0, 0, 0, 0.17),
      0px 0px 3.1270833015441895px 0px rgba(0, 0, 0, 0.08),
      0px 7px 14px 0px rgba(0, 0, 0, 0.05);
  }
</style>
