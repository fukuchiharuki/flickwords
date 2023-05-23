<template>
  <div class="floating-window help animate__animated animate__fadeInUp">
    <strong class="title">How To Play</strong>
    <p>Guess the Flickwords in 6 tries.</p>
    <p></p>
    <ul>
      <li>Each guess must be a valid {{ wordLength }}-letter word.</li>
      <li>
        The color of the tiles will change to show how close your guess was to
        the word.
      </li>
    </ul>

    <strong>Examples</strong>

    <div class="tiles">
      <div class="item">
        <div class="tile correct"><div class="char">あ</div></div>
      </div>
      <div class="item">
        <div class="tile"><div class="char">い</div></div>
      </div>
      <div class="item">
        <div class="tile"><div class="char">う</div></div>
      </div>
      <div class="item">
        <div class="tile"><div class="char">え</div></div>
      </div>
      <div class="item">
        <div class="tile"><div class="char">お</div></div>
      </div>
    </div>
    <p><b>あ</b> is in the word and in the correct spot.</p>

    <div class="tiles">
      <div class="item">
        <div class="tile"><div class="char">か</div></div>
      </div>
      <div class="item">
        <div class="tile present"><div class="char">き</div></div>
      </div>
      <div class="item">
        <div class="tile"><div class="char">く</div></div>
      </div>
      <div class="item">
        <div class="tile"><div class="char">け</div></div>
      </div>
      <div class="item">
        <div class="tile"><div class="char">こ</div></div>
      </div>
    </div>
    <p><b>き</b> is in the word but in the wrong spot.</p>

    <div class="tiles">
      <div class="item">
        <div class="tile"><div class="char">さ</div></div>
      </div>
      <div class="item">
        <div class="tile"><div class="char">し</div></div>
      </div>
      <div class="item">
        <div class="tile absent"><div class="char">す</div></div>
      </div>
      <div class="item">
        <div class="tile"><div class="char">せ</div></div>
      </div>
      <div class="item">
        <div class="tile"><div class="char">そ</div></div>
      </div>
    </div>
    <p><b>す</b> is not in the word in any spot.</p>

    <div class="tiles">
      <div class="item">
        <div class="tile"><div class="char">た</div></div>
      </div>
      <div class="item">
        <div class="tile"><div class="char">ち</div></div>
      </div>
      <div class="item">
        <div class="tile"><div class="char">つ</div></div>
      </div>
      <div class="item">
        <div class="tile absent vowel"><div class="char">て</div></div>
      </div>
      <div class="item">
        <div class="tile"><div class="char">と</div></div>
      </div>
    </div>
    <p>
      <b>て</b> has the same vowel as the correct letter in the spot.<br />
      e.g.: え, け, せ, て, ね, ...
    </p>

    <div class="tiles">
      <div class="item">
        <div class="tile"><div class="char">な</div></div>
      </div>
      <div class="item">
        <div class="tile"><div class="char">に</div></div>
      </div>
      <div class="item">
        <div class="tile"><div class="char">ぬ</div></div>
      </div>
      <div class="item">
        <div class="tile"><div class="char">ね</div></div>
      </div>
      <div class="item">
        <div class="tile absent consonant"><div class="char">の</div></div>
      </div>
    </div>
    <p>
      <b>の</b> has the same consonant as the correct letter in the spot.<br />
      e.g.: な, に, ぬ, ね, の
    </p>

    <strong>Particular Mention</strong>

    <div class="tiles">
      <div class="item">
        <div class="tile correct"><div class="char">は</div></div>
      </div>
      <div class="item">
        <div class="tile no-border"><div class="char">＝</div></div>
      </div>
      <div class="item">
        <div class="tile correct"><div class="char">ば</div></div>
      </div>
      <div class="item">
        <div class="tile no-border"><div class="char">＝</div></div>
      </div>
      <div class="item">
        <div class="tile correct"><div class="char">ぱ</div></div>
      </div>
    </div>
    <p>Muddled and semi-muddled marks are ignored.</p>

    <div class="tiles">
      <div class="item">
        <div class="tile correct"><div class="char">つ</div></div>
      </div>
      <div class="item">
        <div class="tile no-border"><div class="char">＝</div></div>
      </div>
      <div class="item">
        <div class="tile correct"><div class="char">っ</div></div>
      </div>
      <div class="item">
        <div class="tile no-border"><div class="char">＝</div></div>
      </div>
      <div class="item">
        <div class="tile correct"><div class="char">づ</div></div>
      </div>
    </div>
    <p>Small letters are evaluated the same as normal letters.</p>

    <hr />
    <div class="navi">
      <button @click="$emit('close')">OK, I got it!</button>
    </div>
    <div class="close" @click="$emit('close')">✕️</div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    wordLength: number
  }>()

  defineEmits<{
    (e: 'close'): void
  }>()
</script>

<style lang="scss" scoped>
  .help {
    .navi {
      text-align: center;
    }
  }

  p + .tiles {
    margin-top: 16px;
  }

  .tiles {
    margin: 4px 2px;
    .item {
      display: inline-block;
      width: 32px;
      height: 32px;

      & + .item {
        margin-left: 4px;
      }
    }

    & + p {
      margin-top: 4px;
    }

    .tile {
      &.no-border {
        border: 0;
      }
    }
  }
</style>
