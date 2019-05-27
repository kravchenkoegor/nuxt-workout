<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-flex xs12 class="back">
          <v-btn icon nuxt to="/history" exact>
            <v-icon>fas fa-chevron-left</v-icon>
          </v-btn>
        </v-flex>

        <v-flex xs12 mb-4 class="position-relative">
          <h2>{{ getFormattedDate }}</h2>
        </v-flex>

        <v-flex
          xs12
          v-for="(training, index) in getTrainings"
          :key="index"
          :class="{
            'mb-3': index !== trainings.length - 1,
            'mb-4': index === trainings.length - 1
          }"
        >
          <nuxt-link
            :to="{ name: 'training-id', params: { id: training._id } }"
            class="history__item elevation-4"
          >
            <div class="history__item-date">
              {{ getFormattedTrainingDate(training.date) }}
            </div>
            <div class="history__item-time">
              {{ training.startTime }} <span>&mdash;</span> {{ training.endTime }}
            </div>
            <i class="fas fa-check-circle"></i>
          </nuxt-link>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'HistoryByMonth',
    created() {
      if (!this.isAuth) {
        this.$router.push('/');
      }
    },
    methods: {
      ...mapActions('history', ['fetchTrainingsByMonth']),
      capitalizeFirstLetter(string) {
        if (typeof string === 'string') {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }
      },
      getFormattedTrainingDate(date) {
        return this.$moment(date).format('DD MMMM');
      }
    },
    computed: {
      ...mapGetters('user', ['isAuth']),
      ...mapGetters('history', ['trainings']),
      getFormattedDate() {
        let [year, month] = this.$route.params.id.split('-');
        month = this.$moment().month(Number(month) - 1).format('MMMM');
        return `${this.capitalizeFirstLetter(month)} ${year}`;
      },
      getTrainings() {
        const [year, month] = this.$route.params.id.split('-');
        return this.trainings
          .filter(training => {
            return training.year === year
              && training.month === month
          })
          .sort((a, b) => {
            if (a.day > b.day) {
              return 1;
            }

            if (a.day < b.day) {
              return -1;
            }

            return 0;
        });
      }
    }
  }
</script>
