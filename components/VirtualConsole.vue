<template>
  <div class="console">
    <div class="display-frame">
      <VirtualDisplay />
    </div>
    <div class="keyboard-frame">
      <VirtualKeyboard />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .console {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .display-frame {
      flex: 1;
      overflow: scroll;
    }

    //.keyboard-frame {
    //}
  }
</style>
