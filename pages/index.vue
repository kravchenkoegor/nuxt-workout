<template>
  <v-container v-if="user">
    <v-layout row wrap>
      <v-flex
        v-for="(card, index) in cards"
        :key="index"
        xs12
      >
        <nuxt-link :to="card.link">
          <v-card
            :class="{'mb-3': index !== cards.length - 1}"
            class="card elevation-4"
          >
            <v-responsive>
              <img class="card__image" :src="card.image" alt="">
            </v-responsive>

            <v-card-title class="card__title text-uppercase">
              {{card.title}}
            </v-card-title>
          </v-card>
        </nuxt-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'Home',
    data: () => ({
      cards: [
        // {title: 'График веса', image: '/images/weight-chart.jpg', link: '/weight'},
        {title: 'Журнал тренировок', image: '/images/history.jpg', link: '/history'},
        {title: 'Добавить тренировку', image: '/images/create.jpg', link: '/add'}
      ]
    }),
    created() {
      if (!this.user) {
        if (process.browser) {
          const token = localStorage.getItem('workout-token');
          const userId = localStorage.getItem('workout-userId');

          if (token && userId) {
            return this.$store.dispatch('authUserById', userId);
          } else {
            this.$router.push('/login');
          }
        }
      }
    },
    computed: {
      ...mapGetters(['user'])
    }
  }
</script>
