<template>
  <div class="result animate__animated animate__fadeInUp">
    <strong>STATISTICS</strong>
    <div class="statistics">
      <div class="item">
        <div class="value">{{ statistics.played }}</div>
        <div class="name">Played</div>
      </div>
      <div class="item">
        <div class="value">{{ statistics.winAverage }}</div>
        <div class="name">Win %</div>
      </div>
      <div class="item">
        <div class="value">{{ statistics.currentStreak }}</div>
        <div class="name">Current Streak</div>
      </div>
      <div class="item">
        <div class="value">{{ statistics.maxStreak }}</div>
        <div class="name">Max Streak</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Score, { statisticsOf } from '../repositories/Score'

  const props = defineProps<{
    result: { score: Score; emojiTiles: string[] }
  }>()

  const statistics = computed(() => statisticsOf(props.result.score))
</script>

<style lang="scss" scoped>
  .result {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: white;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 32px 16px;

    &.animate__fadeInUp {
      --animate-duration: 0.2s;
    }
  }

  .statistics {
    display: flex;
    .item {
      flex: 1;
      text-align: center;
      padding: 16px 0;

      .value {
        font-size: large;
      }

      .name {
        margin-top: 4px;
        font-size: xx-small;
      }
    }
  }
</style>
