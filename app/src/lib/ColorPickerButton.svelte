<script lang="ts">
  let { color }: { color: string } = $props();
</script>

<button title="{color}"
  class="rounded w-5 h-5 bg-red-500 border border-gray-50"
  style:background-color={color}
>
  <div class="hidden">{color}</div>
</button>
