<script lang="ts">
  let { color, onclick }: { color: string; onclick?: () => void } = $props();
</script>

<button
  {onclick}
  title={color}
  class="rounded w-5 h-5 bg-red-500 border border-gray-50"
  style:background-image={color === "transparent"
    ? `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==)`
    : "none"}
  style:background-color={color}
>
  <div class="hidden">{color}</div>
</button>
