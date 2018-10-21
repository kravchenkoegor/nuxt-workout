<template>
  <div class="history">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="mb-0">Журнал тренировок</h2>
        </div>

        <div class="col-12 my-4">
          <nuxt-link
            v-for="(item, index) in getFormattedMonths"
            :key="index"
            :to="{ name: 'history-id', params: { id: `${item.year}-${formatMonth(item.month)}` } }"
            class="history__item shadow"
          >
            <div class="history__item-date">{{ item.month }} {{ item.year }}</div>
            <i class="fas fa-check-circle"></i>
          </nuxt-link>
        </div>

        <div class="col-12">
          <nuxt-link class="history__btn btn btn-success" :to="'/'">
            <i class="fas fa-undo-alt"></i>&nbsp;&nbsp;На главную
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'History',
    async fetch ({ app, store }) {
      let trainings = await app.$axios.$get('/history')
      if (trainings) {
        store.dispatch('setTrainingsHistory', trainings)
      }
    },
    data: () => ({
      trainings: null,
      dates: []
    }),
    created () {
      moment.locale('ru')
    },
    mounted () {
      this.trainings = this.$store.getters.getTrainingsHistory
      this.getTrainingMonths()
    },
    computed: {
      getFormattedMonths () {
        return this.dates.map(item => {
          return {
            month: moment().month(+item.month - 1).format('MMMM'),
            year: item.year
          }
        })
      }
    },
    methods: {
      getTrainingMonths () {
        this.trainings.forEach(training => {
          const { month, year } = training
          if (!this.dates.some(el => el.month === month && el.year === year)) {
            this.dates.push({ month, year })
          }
        })
      },
      formatMonth (month) {
        return moment().month(month).format('MM')
      }
    }
  }
</script>

<style lang="scss">
  .container {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .history {
    &__item {
      position: relative;
      display: flex;
      justify-content: flex-start;
      border: 1px solid #ddd;
      border-radius: .5rem;
      padding: 1rem;
      color: #1a1a1a;
      font-weight: 700;
      line-height: 20px;

      & + & {
        margin-top: 1.5rem;
      }

      i {
        position: absolute;
        right: 14px;
        align-self: center;
        font-size: 18px;
        height: 18px;
        color: $green;
      }

      &-date {
        width: 170px;
      }
    }

    &__btn {
      display: inline-block;
      width: 100%;
      text-transform: uppercase;
      padding-left: 1rem;
      padding-right: 1rem;
      margin-top: 2rem;
      line-height: 24px;
    }
  }
</style>
