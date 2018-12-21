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
          v-for="(training, index) in history"
          :key="index"
          :class="{
            'mb-3': index !== history.length - 1,
            'mb-4': index === history.length - 1
          }"
        >
          <nuxt-link
            :to="{ name: 'training-id', params: { id: training._id } }"
            class="history__item elevation-4"
          >
            <div class="history__item-date">{{ getFormattedTrainingDate(training.date) }}</div>
            <div class="history__item-time">{{ training.startTime }} <span>&mdash;</span> {{ training.endTime }}</div>
            <i class="fas fa-check-circle"></i>
          </nuxt-link>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'HistoryByMonth',
    created() {
      if (!this.user) {
        this.$router.push('/')
      }

      return this.$store.dispatch('fetchTrainingsByDate', this.$route.params.id)
    },
    methods: {
      capitalizeFirstLetter(string) {
        if (typeof string === 'string') return string.charAt(0).toUpperCase() + string.slice(1)
      },
      getFormattedTrainingDate(date) {
        return this.$moment(date).format('DD MMMM');
      }
    },
    computed: {
      ...mapGetters(['user', 'history']),
      getFormattedDate() {
        const [year, month] = this.$route.params.id.split('-');
        return `${this.capitalizeFirstLetter(this.$moment().month(+month - 1).format('MMMM'))} ${year}`;
      }
    }
  }
</script>
