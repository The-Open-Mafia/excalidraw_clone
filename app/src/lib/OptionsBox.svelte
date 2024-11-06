<script lang="ts">
  import {
    Shape,
    updateSelectedShape,
    useEmitter,
  } from "@excalidraw_clone/excalidraw";
  import ColorPickerButton from "./ColorPickerButton.svelte";
  import { config } from "@excalidraw_clone/excalidraw";

  const strokeColors = ["#1e1e1e", "#e03131", "#2f9e44", "#1971c2", "#f08c00"];

  let isShapeSelected = $state(false);
  let selectedStokeColor = $state(strokeColors[0]);
  let selectedShape: Shape;
  const { on } = useEmitter();

  on("shapeSelected", (shape) => {
    isShapeSelected = !!shape;
    if (!shape) return;
    
    selectedShape = shape;
    selectedStokeColor = selectedShape.options.strokeStyle
  });

  function handleChangeStrokeColor(color: string) {
    selectedStokeColor = color;
    config.strokeStyle = color;
    updateSelectedShape(selectedShape.id, { strokeStyle: color });
  }
</script>

{#if isShapeSelected}
  <div
    class="absolute top-1/2 -translate-y-1/2 rounded-lg bg-white flex-col p-3 left-5 options"
  >
    <div>
      <h3 class="mb-1">Stroke</h3>
      <div class="grid py-1 grid-cols-7 gap-0.5">
        {#each strokeColors as color}
          <button onclick={() => handleChangeStrokeColor(color)}>
            <ColorPickerButton {color} />
          </button>
        {/each}
        <div class="h-4 w-px bg-gray-300 self-center"></div>
        <ColorPickerButton color={selectedStokeColor} />
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
