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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'History',
    data: () => ({
      dates: []
    }),
    created() {
      if (!this.user) this.$router.push('/login')
      else this.$store.dispatch('fetchTrainingsHistory', this.user._id);
    },
    computed: {
      ...mapGetters(['user', 'history']),
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
      history() {
        this.getTrainingMonths();
      }
    },
    methods: {
      getTrainingMonths() {
        this.history.forEach(training => {
          const {month, year} = training;
          if (!this.dates.some(el => el.month === month && el.year === year)) {
            this.dates.push({month, year});
          }
        })
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
