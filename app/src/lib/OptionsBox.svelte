<script lang="ts">
  import {
    Shape,
    updateSelectedShape,
    useEmitter,
  } from "@excalidraw_clone/excalidraw";
  import ColorPickerButton from "./ColorPickerButton.svelte";
  import { config } from "@excalidraw_clone/excalidraw";

  const strokeColors = ["#1e1e1e", "#e03131", "#2f9e44", "#1971c2", "#f08c00"];
  const fillColors = ["transparent", "#ffc9c9", "#b2f2bb", "#a5d8ff", "#ffec99"];

  let isShapeSelected = $state(false);
  let selectedStrokeColor = $state(strokeColors[0]);
  let selectedFillColor = $state(strokeColors[0]);
  let selectedShape: Shape;
  const { on } = useEmitter();

  on("shapeSelected", (shape) => {
    isShapeSelected = !!shape;
    if (!shape) return;

    selectedShape = shape;
    selectedStrokeColor = selectedShape.options.strokeStyle;
    selectedFillColor = selectedShape.options.fillColor;
  });

  function handleChangeStrokeColor(color: string) {
    selectedStrokeColor = color;
    config.strokeStyle = color;
    updateSelectedShape(selectedShape.id, { strokeStyle: color });
  }

  function handleChangeFillColor(color: string) {
    selectedFillColor = color;
    config.fillColor = color;
    updateSelectedShape(selectedShape.id, { fillColor: color });
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
          <ColorPickerButton
            onclick={() => handleChangeStrokeColor(color)}
            {color}
          />
        {/each}
        <div class="h-4 w-px bg-gray-300 self-center"></div>
        <ColorPickerButton color={selectedStrokeColor} />
      </div>
    </div>
    <div>
      <h3 class="mb-1">Fill color</h3>
      <div class="grid py-1 grid-cols-7 gap-0.5">
        {#each fillColors as color}
          <ColorPickerButton
            onclick={() => handleChangeFillColor(color)}
            {color}
          />
        {/each}
        <div class="h-4 w-px bg-gray-300 self-center"></div>
        <ColorPickerButton color={selectedFillColor} />
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
