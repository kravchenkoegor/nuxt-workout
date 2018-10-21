<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h2 class="mb-0">{{ getFormattedDate }}</h2>
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

      <div class="col-12">
        <nuxt-link class="history__btn btn btn-success" :to="'history'">
          <i class="fas fa-undo-alt"></i>&nbsp;&nbsp;Назад
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'HistoryByMonth',
    async fetch ({ app, store, params }) {
      let trainings = await app.$axios.$get('/history/' + params.id)
      if (trainings) {
        store.dispatch('setTrainingsHistory', trainings)
      }
    },
    data: () => ({
      trainings: null
    }),
    created () {
      this.trainings = this.$store.getters.getTrainingsHistory
    },
    methods: {
      async deleteTraining () {
        const result = await this.$axios.$get('/delete/' + this.$route.params.id)
        if (result) {
          this.$router.push({ name: 'history' })
        }
      },
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }
    },
    computed: {
      getFormattedDate () {
        const [year, month] = this.$route.params.id.split('-')
        return `${this.capitalizeFirstLetter(moment().month(+month - 1).format('MMMM'))} ${year}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .workout {
    &__header {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 1em;
      position: relative;
    }

    &__btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;

      a {
        text-transform: uppercase;
        padding: .5rem 1rem;
      }
    }

    &__exercise {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: .5rem;

      & + & {
        margin-top: 1.5rem;
      }
    }

    &__title {
      display: block;
      width: 100%;
      font-size: 14px !important;
      font-weight: 700;
      line-height: 25px !important;
      position: relative;
      padding: .5rem 50px .75rem 0;

      span {
        &.muscle-group {
          position: absolute;
          top: 7px;
          right: 0;
          padding: .25rem .5rem;
          color: #ffffff;
          background-color: #192A51;
          border-radius: .25rem;
          font-size: 12px;
          line-height: 18px !important;
        }
      }
    }

    &__sets {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid rgba(#1a1a1a, .4);
      padding-top: .75rem;

      p {
        margin-bottom: 0;
        position: relative;
        width: 100%;
        flex-grow: 1;
        text-align: center;

        & + p {

          &:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 1px;
            background-color: #cccccc;
          }
        }
      }

      &__repeats {
        padding-right: .25rem;
      }

      &__weight {
        padding-left: .25rem;
      }
    }
  }

  button {
    &.btn {
      margin-top: 1.5rem;
      padding: .5rem 2rem;
      text-transform: uppercase;
      width: 100%;

      & + & {
        margin-left: 1rem;
      }
    }
  }
</style>
