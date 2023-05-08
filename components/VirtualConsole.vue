<template>
  <div class="console">
    <div class="display-frame">
      <slot name="display"></slot>
    </div>
    <div class="keyboard-frame">
      <slot name="keyboard"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .console {
    width: 100vw;

    .display-frame {
      box-sizing: border-box;
      min-height: 100vh;
      padding-bottom: 228px;
    }

    .keyboard-frame {
      width: 100%;
      position: fixed;
      bottom: 0;
      touch-action: none;
    }
  }

  /* The hack for Safari */
  @supports (-webkit-touch-callout: none) {
    .display-frame {
      height: -webkit-fill-available;
    }
  }
</style>
