<svelte:options accessors immutable={true} />

<script>
  import { Card } from "flowbite-svelte";

  export let id = "";
  export let letter;
  export let paired = "";
  export let verify = false;
  export let lesson = {};

  function getBase(p) {
    return p.replace("្", "");
  }

  /** 
   * @param {string} main
   * @param {string} picked 
   */
  function getCorrect(main, picked) {
    if ((main == "្ត" || main == "្ដ") && (picked == "ត" || picked == "ដ")) return true;

    return getBase(main) == getBase(picked);
  }
</script>

<Card
  {id}
  class="max-w-full overflow-hidden {verify && !getCorrect(letter, paired)
    ? 'border-red-400 dark:border-red-500'
    : verify && getCorrect(letter, paired)
      ? 'border-green-500 dark:border-green-500 opacity-40 blur-[1px]'
      : ''}"
  padding="none"
  horizontal
>
  <div
    class="main-letter {lesson.mainFont} text-[1.5rem] md:text-[2.5rem] text-center basis-1/2 p-4 leading-none bg-slate-200 select-none dark:text-gray-600"
  >
    {letter}
  </div>
  <button
    class="paired-letter {lesson.pickerFont} text-[1.5rem] md:text-[2.5rem] text-center basis-1/2 p-4 leading-none cursor-pointer text-black select-none dark:text-white dark:bg-gray-700"
    on:click
    class:text-red-500={verify && !getCorrect(letter, paired)}
  >
    {paired || "•"}
  </button>
</Card>
