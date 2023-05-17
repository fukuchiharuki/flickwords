<template>
  <div class="result animate__animated animate__fadeInUp">
    <strong>STATISTICS (L{{ wordLength }})</strong>
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
    <strong>GUESS DISTRIBUTION</strong>
    <div class="guess-distribution">
      <div v-for="(item, index) in guessDistribution" :key="index" class="item">
        <div class="round">{{ index }}</div>
        <div class="count">
          <div
            class="bar"
            :class="{
              highlight: item.lastResult,
              [`ratio${item.ratio}`]: true
            }"
          >
            {{ item.count }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Score, {
    statisticsOf,
    guessDistributionOf
  } from '../repositories/Score'

  const props = defineProps<{
    wordLength: number
    result: { score: Score; emojiTiles: string[] }
  }>()

  const statistics = computed(() => statisticsOf(props.result.score))
  const guessDistribution = computed(() =>
    guessDistributionOf(props.result.score)
  )
</script>

<style lang="scss" scoped>
  .result {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    background-color: white;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 32px 16px;

    &.animate__fadeInUp {
      --animate-duration: 0.4s;
    }
  }

  strong {
    font-size: small;
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

  .guess-distribution {
    padding: 12px 0;
    width: 96%;

    .item {
      display: flex;
      font-size: x-small;
      font-weight: bold;

      &:first-child {
        display: none;
      }

      & + .item {
        margin-top: 4px;
      }

      .round {
        width: 20px;
        text-align: center;
        box-sizing: border-box;
      }

      .count {
        flex: 1;

        .bar {
          text-align: right;
          min-width: 6%;
          box-sizing: border-box;
          padding-right: 4px;
          color: white;
          background-color: #86888a;

          &.highlight {
            background-color: #6aaa64;
          }

          &.ratio0 {
            width: 0%;
          }
          &.ratio1 {
            width: 1%;
          }
          &.ratio2 {
            width: 2%;
          }
          &.ratio3 {
            width: 3%;
          }
          &.ratio4 {
            width: 4%;
          }
          &.ratio5 {
            width: 5%;
          }
          &.ratio6 {
            width: 6%;
          }
          &.ratio7 {
            width: 7%;
          }
          &.ratio8 {
            width: 8%;
          }
          &.ratio9 {
            width: 9%;
          }
          &.ratio10 {
            width: 10%;
          }
          &.ratio11 {
            width: 11%;
          }
          &.ratio12 {
            width: 12%;
          }
          &.ratio13 {
            width: 13%;
          }
          &.ratio14 {
            width: 14%;
          }
          &.ratio15 {
            width: 15%;
          }
          &.ratio16 {
            width: 16%;
          }
          &.ratio17 {
            width: 17%;
          }
          &.ratio18 {
            width: 18%;
          }
          &.ratio19 {
            width: 19%;
          }
          &.ratio20 {
            width: 20%;
          }
          &.ratio21 {
            width: 21%;
          }
          &.ratio22 {
            width: 22%;
          }
          &.ratio23 {
            width: 23%;
          }
          &.ratio24 {
            width: 24%;
          }
          &.ratio25 {
            width: 25%;
          }
          &.ratio26 {
            width: 26%;
          }
          &.ratio27 {
            width: 27%;
          }
          &.ratio28 {
            width: 28%;
          }
          &.ratio29 {
            width: 29%;
          }
          &.ratio30 {
            width: 30%;
          }
          &.ratio31 {
            width: 31%;
          }
          &.ratio32 {
            width: 32%;
          }
          &.ratio33 {
            width: 33%;
          }
          &.ratio34 {
            width: 34%;
          }
          &.ratio35 {
            width: 35%;
          }
          &.ratio36 {
            width: 36%;
          }
          &.ratio37 {
            width: 37%;
          }
          &.ratio38 {
            width: 38%;
          }
          &.ratio39 {
            width: 39%;
          }
          &.ratio40 {
            width: 40%;
          }
          &.ratio41 {
            width: 41%;
          }
          &.ratio42 {
            width: 42%;
          }
          &.ratio43 {
            width: 43%;
          }
          &.ratio44 {
            width: 44%;
          }
          &.ratio45 {
            width: 45%;
          }
          &.ratio46 {
            width: 46%;
          }
          &.ratio47 {
            width: 47%;
          }
          &.ratio48 {
            width: 48%;
          }
          &.ratio49 {
            width: 49%;
          }
          &.ratio50 {
            width: 50%;
          }
          &.ratio51 {
            width: 51%;
          }
          &.ratio52 {
            width: 52%;
          }
          &.ratio53 {
            width: 53%;
          }
          &.ratio54 {
            width: 54%;
          }
          &.ratio55 {
            width: 55%;
          }
          &.ratio56 {
            width: 56%;
          }
          &.ratio57 {
            width: 57%;
          }
          &.ratio58 {
            width: 58%;
          }
          &.ratio59 {
            width: 59%;
          }
          &.ratio60 {
            width: 60%;
          }
          &.ratio61 {
            width: 61%;
          }
          &.ratio62 {
            width: 62%;
          }
          &.ratio63 {
            width: 63%;
          }
          &.ratio64 {
            width: 64%;
          }
          &.ratio65 {
            width: 65%;
          }
          &.ratio66 {
            width: 66%;
          }
          &.ratio67 {
            width: 67%;
          }
          &.ratio68 {
            width: 68%;
          }
          &.ratio69 {
            width: 69%;
          }
          &.ratio70 {
            width: 70%;
          }
          &.ratio71 {
            width: 71%;
          }
          &.ratio72 {
            width: 72%;
          }
          &.ratio73 {
            width: 73%;
          }
          &.ratio74 {
            width: 74%;
          }
          &.ratio75 {
            width: 75%;
          }
          &.ratio76 {
            width: 76%;
          }
          &.ratio77 {
            width: 77%;
          }
          &.ratio78 {
            width: 78%;
          }
          &.ratio79 {
            width: 79%;
          }
          &.ratio80 {
            width: 80%;
          }
          &.ratio81 {
            width: 81%;
          }
          &.ratio82 {
            width: 82%;
          }
          &.ratio83 {
            width: 83%;
          }
          &.ratio84 {
            width: 84%;
          }
          &.ratio85 {
            width: 85%;
          }
          &.ratio86 {
            width: 86%;
          }
          &.ratio87 {
            width: 87%;
          }
          &.ratio88 {
            width: 88%;
          }
          &.ratio89 {
            width: 89%;
          }
          &.ratio90 {
            width: 90%;
          }
          &.ratio91 {
            width: 91%;
          }
          &.ratio92 {
            width: 92%;
          }
          &.ratio93 {
            width: 93%;
          }
          &.ratio94 {
            width: 94%;
          }
          &.ratio95 {
            width: 95%;
          }
          &.ratio96 {
            width: 96%;
          }
          &.ratio97 {
            width: 97%;
          }
          &.ratio98 {
            width: 98%;
          }
          &.ratio99 {
            width: 99%;
          }
          &.ratio100 {
            width: 100%;
          }
        }
      }
    }
  }
</style>
