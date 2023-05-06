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

    .display-frame {
      min-height: 100vh;
    }

    .keyboard-frame {
      width: 100%;
      //position: fixed;
      bottom: 0;
      //touch-action: none;
    }
  }
</style>
