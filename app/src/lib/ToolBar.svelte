<script lang="ts">
  import { Action } from "@excalidraw_clone/excalidraw";
  import { Minus, Pencil, Square } from "lucide-svelte";

  interface Tool {
    title: string;
    icon: typeof Square;
    value: Action;
  }
  const tools: Tool[] = [
    {
      title: "Rectangle",
      icon: Square,
      value: Action.RECTANGLE,
    },
    {
      title: "Line",
      icon: Minus,
      value: Action.LINE,
    },
    {
      title: "Pencil",
      icon: Pencil,
      value: Action.FREEDRAW,
    },
  ];
  let selectedTool: Tool = $state(tools[0]);

  function handleChangeAction(tool: Tool) {
    window.action = tool.value;
    selectedTool = tool;
  }
</script>

<ul
  class="absolute left-1/2 -translate-x-1/2 rounded-lg bg-white flex p-1 top-5 tools"
>
  {#each tools as tool, index}
    <button onclick={() => handleChangeAction(tool)}>
      <li
        class="tool"
        title={tool.title}
        class:bg-purple-200={selectedTool.value === tool.value}
      >
        <!-- svelte-ignore svelte_component_deprecated -->
        <svelte:component this={tool.icon} size={16} />
      </li>
    </button>
  {/each}
</ul>

<style>
  .tools {
    box-shadow:
      0px 0px 0.9310142993927002px 0px rgba(0, 0, 0, 0.17),
      0px 0px 3.1270833015441895px 0px rgba(0, 0, 0, 0.08),
      0px 7px 14px 0px rgba(0, 0, 0, 0.05);
  }
  .tool {
    @apply w-9 h-9 cursor-pointer rounded-lg flex justify-center items-center p-1;
  }
</style>
