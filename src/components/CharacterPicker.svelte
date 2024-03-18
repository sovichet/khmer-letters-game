<script>
  import { Popover } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  export let open;
  export let list = [];
  export let pickedList = [];
  export let pickerFont = {};

  const dispatch = createEventDispatcher();

  function pick(e) {
    dispatch("picked", e.target.dataset.char);
  }
</script>

<Popover
  trigger="click"
  type="custom"
  placement="bottom"
  triggeredBy="[id^='char-'] .paired-letter"
  class="bg-white z-20"
  bind:open
  on:show={(e) => {
    open = e.detail;
  }}
>
  <div class="pick-list grid grid-cols-5 gap-2 justify-between">
    {#each list as char, i}
      <button
        class="{pickerFont} hover:bg-primary-500 hover:text-white text-center w-[52px] h-[52px] p-2 rounded-full text-2xl leading-none cursor-pointer {pickedList.find(
          (c) => c == char
        )
          ? 'text-gray-400'
          : 'text-primary-600'}"
        on:click={pick}
        data-char={char}
      >
        {char}
      </button>
    {/each}
  </div>
</Popover>
