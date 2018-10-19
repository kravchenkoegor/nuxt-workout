<template>
  <div class="weight">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="mb-0">График веса на {{ today }}</h2>
        </div>

        <div class="col-12 my-4">
          <weight-chart :height="200" :cssClasses="'overflow-hidden'" :data="datacollection"></weight-chart>
        </div>

        <div class="col-12">
          <div class="weight__title shadow">
            <div class="yesterday"
                 :class="lostWeightToday ? 'good' : 'bad'"
            >
              <span>Вчера:</span>{{ deltaYesterday }} кг
            </div>

            <span class="current">{{ currentWeight }} кг</span>

            <div class="start"
                 :class="lostWeightFromStart ? 'good' : 'bad'"
            >
              <span>С начала:</span>{{ deltaStart }} кг
            </div>
          </div>
        </div>

        <div class="col-12 mt-4">
          <button class="weight__btn weight__btn_save btn btn-success" type="button" @click="dialog = !dialog">
            <i class="fas fa-pen"></i>&nbsp;&nbsp;Записать вес
          </button>
        </div>

        <div class="col-12 mt-4">
          <router-link class="weight__btn btn btn-success" :to="'/'">
            <i class="fas fa-undo-alt"></i>&nbsp;&nbsp;На главную
          </router-link>
        </div>

        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline" primary-title>Записать вес</v-card-title>

            <v-card-text>
              <v-text-field
                v-model="newWeight"
                type="number"
                label="Текущий вес"
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <button class="btn btn-success" type="button" @click="addNewWeight">Записать</button>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import WeightChart from '../components/WeightChart.vue'

  export default {
    name: 'Weight',
    components: {WeightChart},
    data: () => ({
      loading: false,
      error: false,
      dialog: false,
      today: null,
      chartLabels: [],
      chartData: [],
      initialWeight: null,
      currentWeight: null,
      newWeight: null,
      deltaYesterday: null,
      deltaStart: null,
      datacollection: {
        datasets: [
          {
            label: 'Мой вес',
            backgroundColor: '#18ba60',
            borderColor: '#149a50',
            pointRadius: 0
          }
        ]
      }
    }),
    async fetch ({app, store}) {
      let result = await app.$axios.$get('/weight')
      if (result) {
        store.dispatch('setWeightChart', result)
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        const weightData = this.$store.getters.getWeightChart

        weightData.forEach(el => {
          this.chartLabels.push(el.date)
          this.chartData.push(el.weight)
        })
        this.datacollection.labels = this.chartLabels
        this.datacollection.datasets[0].data = this.chartData
        this.currentWeight = this.chartData[this.chartData.length - 1].toFixed(1)
        this.deltaYesterday = weightData[weightData.length - 1].deltaYesterday.toFixed(1)
        this.initialWeight = weightData[0].weight.toFixed(1)
        this.deltaStart = (this.currentWeight - this.initialWeight).toFixed(1)
        this.today = weightData[weightData.length - 1].date
      },
      addNewWeight () {
        this.$axios.$post('/save-weight', {
          date: new Date(),
          weight: this.newWeight,
          deltaYesterday: (+this.newWeight - this.currentWeight).toFixed(1),
          deltaStart: this.newWeight - this.initialWeight
        })
          .then(async () => {
            const weight = await this.$axios.$get('/weight')
            if (weight) {
              this.$store.dispatch('setWeightChart', weight)
              this.init()
              this.dialog = !this.dialog
            }
          })
          .catch(error => console.log(error))
      }
    },
    computed: {
      lostWeightToday () {
        return this.deltaYesterday < 0
      },
      lostWeightFromStart () {
        return this.deltaStart < 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .weight {
    &__btn {
      display: inline-block;
      width: 100%;
      text-transform: uppercase;
      padding-left: 1rem;
      padding-right: 1rem;
      line-height: 24px;

      &_save {
        background-color: #192A51 !important;
        border-color: #192A51 !important;

        &.focus,
        &:focus,
        &.active,
        &:active {
          box-shadow: none !important;
        }
      }
    }

    &__title {
      font-size: 32px;
      font-weight: 700;
      text-align: center;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border: 1px solid #ddd;
      border-radius: .5rem;

      .current {
        max-width: 150px;
      }

      .yesterday,
      .start {
        font-size: 18px;
        font-weight: 400;
        flex-grow: 1;
        position: relative;
        max-width: 89px;

        span {
          display: block;
          width: 100%;
          font-size: 14px;
        }

        &.good {
          color: $green;

          &:before {
            content: '';
            display: none;
            position: absolute;
            background-color: transparent;
            border: 8px solid transparent;
            border-top: 12px solid $green;
            top: 28px;
            left: 4px;
          }
        }

        &.bad {
          color: $red-2;

          &:before {
            content: '';
            display: none;
            position: absolute;
            background-color: transparent;
            border: 8px solid transparent;
            border-bottom: 12px solid $red-2;
            top: 22px;
            left: 0;
          }
        }
      }

      .start {
        &.good {
          padding-left: 0;

          &:before {
            left: auto;
            right: 4px;
          }
        }
      }

      span {
        flex-grow: 1;
      }
    }
  }

  .v-dialog {
    .v-card__text {
      padding-bottom: 0 !important;
    }

    .btn {
      line-height: 24px;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      margin: 0 auto;
      text-transform: uppercase;
      background-color: #192A51 !important;
      border-color: #192A51 !important;

      &.focus, &:focus,
      &.active, &:active {
        box-shadow: none !important;
      }
    }
  }

  .overflow-hidden {
    overflow: hidden !important;
  }
</style>
