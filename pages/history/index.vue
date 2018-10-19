<template>
  <div class="history">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="mb-0">Журнал тренировок</h2>
        </div>

        <div class="col-12 my-4">
          <nuxt-link
            v-for="(training, index) in trainings"
            :key="index"
            :to="{ name: 'training-id', params: { id: training._id } }"
            class="history__item shadow"
          >
            <div class="history__item-date">{{ training.date }}</div>
            <div class="history__item-time">{{ training.startTime }} <span>&mdash;</span> {{ training.endTime }}</div>
            <i class="fas fa-check-circle"></i>
          </nuxt-link>
        </div>

        <!--<div class="col-12 my-4">-->
          <!--<nuxt-link-->
            <!--v-for="(month, index) in getFormattedMonths"-->
            <!--:key="index"-->
            <!--:to="{ name: 'history-id', params: { id: month.substr() } }"-->
            <!--class="history__item shadow"-->
          <!--&gt;-->
            <!--<div class="history__item-date">{{ month }}</div>-->
            <!--<i class="fas fa-check-circle"></i>-->
          <!--</nuxt-link>-->
        <!--</div>-->

        <div class="col-12">
          <router-link class="history__btn btn btn-success" :to="'/'">
            <i class="fas fa-undo-alt"></i>&nbsp;&nbsp;На главную
          </router-link>
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
      months: []
    }),
    created () {
      moment.locale('ru')
    },
    mounted () {
      this.trainings = this.$store.getters.getTrainingsHistory
      // this.getTrainingMonths()
    },
    computed: {
      // getFormattedMonths () {
      //   return this.months.map(item => `${moment().month(item.substr(0, 2)).format('MMMM')} ${item.substr(3)}`)
      // }
    },
    methods: {
      getTrainingMonths () {
        this.trainings.forEach(item => {
          const date = moment(item.date).startOf('month').format('MM/YYYY')
          if (!this.months.includes(date)) {
            this.months.push(date)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
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
