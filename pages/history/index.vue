<template>
  <v-container fill-height>
    <v-layout row wrap>
      <v-flex xs12>
        <v-flex xs12 class="back">
          <v-btn icon nuxt to="/" exact>
            <v-icon>fas fa-chevron-left</v-icon>
          </v-btn>
        </v-flex>

        <v-flex xs12 mb-4 class="position-relative">
          <h2>Журнал тренировок</h2>
        </v-flex>

        <template v-if="loading">
          <v-flex
            xs12
            d-flex
            align-center
            justify-center
            style="margin-top: 100px;"
          >
            <v-progress-circular
              indeterminate
              color="primary"
              :size="56"
              :width="5"
            />
          </v-flex>
        </template>

        <template v-else>
          <template v-if="getFormattedMonths.length">
            <v-flex
              xs12
              v-for="(item, index) in getFormattedMonths"
              :key="index"
              :class="{
            'mb-3': index !== getFormattedMonths.length - 1,
            'mb-4': index === getFormattedMonths.length - 1
          }"
            >
              <nuxt-link
                :to="{ name: 'history-id', params: { id: `${item.year}-${formatMonth(item.month)}` } }"
                class="history__item elevation-4"
              >
                <div class="history__item-date">{{ item.month }} {{ item.year }}</div>
                <i class="fas fa-check-circle"></i>
              </nuxt-link>
            </v-flex>
          </template>

          <template v-else>
            <v-layout row justify-center align-center class="history__empty">
              <v-flex xs12 text-xs-center>
                <p>У Вас еще нет тренировок.</p>
                <v-btn color="primary" nuxt to="/add" exact>
                  <v-icon left small>fas fa-plus-circle</v-icon>
                  Добавить
                </v-btn>
              </v-flex>
            </v-layout>
          </template>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'History',
    data: () => ({
      dates: []
    }),
    mounted() {
      this.fetchTrainings(this.userId)
        .then(() => this.setLoading(false))
        .catch(error => console.error(error));

      this.getTrainingMonths()
    },
    computed: {
      ...mapGetters('user', ['isAuth', 'userId']),
      ...mapGetters('history', ['trainings']),
      ...mapGetters(['loading']),
      getFormattedMonths() {
        return this.dates.map(item => {
          return {
            month: this.$moment().month(Number(item.month) - 1).format('MMMM'),
            year: item.year
          }
        })
      }
    },
    watch: {
      trainings() {
        this.getTrainingMonths();
      }
    },
    methods: {
      ...mapActions('history', ['fetchTrainings']),
      ...mapActions(['setLoading']),
      getTrainingMonths() {
        for (let i = 0; i < this.trainings.length; i++) {
          const training = this.trainings[i];
          const {month, year} = training;
          const dateExists = this.dates.some(el => {
            return el.month === month && el.year === year;
          });

          if (!dateExists) {
            this.dates.push({month, year});
          }
        }
      },
      formatMonth(month) {
        return this.$moment().month(month).format('MM');
      }
    }
  }
</script>

<style lang="scss">
  .history {
    &__item {
      position: relative;
      display: flex;
      justify-content: flex-start;
      border: 1px solid #ddd;
      border-radius: .5rem;
      padding: 16px 32px 16px 16px;
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
        color: #18BA60;
      }

      &-date {
        width: 150px;
      }
    }

    &__empty {
      height: calc(100% - 72px);
    }
  }
</style>
