<script>
  // @ts-nocheck

  import { Heading, Tooltip, DarkMode, Button, Modal, P, A, Select } from "flowbite-svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
  import lessons from "./lib/lessons";
  import CharacterBox from "./components/CharacterBox.svelte";
  import CharacterPicker from "./components/CharacterPicker.svelte";

  let selectedLesson = 0;
  let currentLesson = lessons.getLesson(0);
  let mainLetters = currentLesson.main;
  let pickerList = currentLesson.picker;
  let popoverOpen = false;
  let verify = false;
  let currentBox = false;
  let refsBox = {};
  let pickedLetters = [];
  let infoModal = false;

  function restart(e) {
    if (e) {
      e.target.blur();
    }

    verify = false;
    mainLetters = [...currentLesson.main].sort(() => (Math.random() > 0.5 ? 1 : -1));

    for (const [key, thisBox] of Object.entries(refsBox)) {
      if (thisBox) {
        thisBox.paired = "";
        pickedLetters = [];
        currentBox = false;
      }
    }
  }

  function handlePicked(e) {
    currentBox.paired = e.detail;
    popoverOpen = !popoverOpen;

    let _tmp = [];

    for (const [key, thisBox] of Object.entries(refsBox)) {
      if (thisBox && thisBox != currentBox && thisBox.paired == currentBox.paired) {
        thisBox.paired = "";
        _tmp = [...pickedLetters];
        break;
      } else {
       if (thisBox) {
        _tmp.push(thisBox.paired);
       }
      }
    }

    pickedLetters = [..._tmp];
  }

  function onSpaceBarPressed(e) {
    if (e.keyCode == 32) {
      e.preventDefault();
      verify = !verify;
    }
  }

  function getBoxKey(t) {
    t = t.replace("្", "");
    return t.charCodeAt(0);
  }

  function handleChangeLesson() {
    currentLesson = lessons.getLesson(selectedLesson);
    restart();
  }
</script>

<svelte:window on:keypress={onSpaceBarPressed} />

<div class="container max-w-screen-xl mx-auto p-5">
  <Modal title="Hello there! 👋" bind:open={infoModal} autoclose outsideclose>
    <P>This small game is designed to teach those who want to learn Khmer letters, such as type designers and language learners. The primary focus of this game is to help users become familiar with Khmer consonants and subconsonants, particularly between Chhor and Moul style variations.</P>

    <P>The game was inspired by the <A href="https://www.fontpad.co.uk/seafontworkshop2019/">Southeast Asian Font Workshops</A> that I conducted with <A href="https://fontpad.co.uk">Ben Mitchell</A>. This game is particularly useful for such workshops, both online and offline.</P>

    <P size="sm">
      <b>Fonts used on the website:</b><br />
      Instrument Sans, Khmer OS Battambang, Khmer OS Muol.
    </P>
    <P size="sm">
      <b>Contact me:</b><br />
      Sovichet Tep<br />
      <A href="https://anagata.design">Studio</A> /
      <A href="https://sovichet.com">Blog</A> /
      <A href="https://khmertypography.com">Khmer Typography</A>
    </P>
  </Modal>

  <div class="flex flex-row justify-between items-center mb-2">
    <Heading tag="h1" customSize="text-xl xl:text-3xl font-medium">Khmer Letters Matching Game</Heading>

    <div class="flex flex-row gap-2">
      <DarkMode />
      <Button pill class="!p-2.5" on:click={() => (infoModal = true)}>
        <InfoCircleSolid class="w-5 h-5" />
      </Button>
    </div>
  </div>

  <div class="flex flex-row gap-2 sticky top-0 z-10 bg-white dark:bg-gray-900 py-4">
    <Select class="max-w-60" items={lessons.getList()} bind:value={selectedLesson} placeholder={false} on:change={handleChangeLesson} />

    <Button
      class="focus-within:ring-0"
      size="sm"
      on:click={() => {
        verify = !verify;
      }}
    >
      {#if verify}
        Return
      {:else}
        Check
      {/if}
    </Button>
    <Tooltip placement="bottom" class="z-50" defaultClass="py-2 px-3 text-xs font-medium hidden xl:block">
      Shortcut:
      <code>Spacebar</code>
    </Tooltip>

    <Button class="focus-within:ring-0" size="sm" color="alternative" on:click={restart}>Restart</Button>
  </div>

  <section class="relative">
    {#if verify}
      <div class="absolute w-full h-full bg-opacity-0 cursor-not-allowed z-50"></div>
    {/if}
    <div class="grid grid-cols-4 md:grid-cols-4 xl:grid-cols-5 gap-6 mt-5">
      {#each mainLetters as letter (getBoxKey(letter))}
        {#if letter != "្ឡ"}
          <CharacterBox
            bind:lesson={currentLesson}
            bind:this={refsBox["char-" + getBoxKey(letter)]}
            id="char-{getBoxKey(letter)}"
            {letter}
            {verify}
            on:click={(e) => {
              currentBox = refsBox[e.target.parentNode.id];
            }}
          />
        {/if}
      {/each}
    </div>
  </section>

  <CharacterPicker bind:pickerFont={currentLesson.pickerFont} bind:pickedList={pickedLetters} list={pickerList} bind:open={popoverOpen} on:picked={handlePicked} />
</div>

<style>
</style>
