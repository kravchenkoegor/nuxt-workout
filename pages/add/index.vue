<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-flex xs12 class="back">
          <v-btn icon nuxt to="/" exact>
            <v-icon>fas fa-chevron-left</v-icon>
          </v-btn>
        </v-flex>

        <v-flex xs12 class="position-relative">
          <h2>Добавить тренировку</h2>
        </v-flex>

        <v-flex xs12 my-4>
          <nuxt-link to="/create">
            <v-card class="card elevation-4">
              <v-responsive>
                <img class="card__image" src="/images/own-program.jpg" alt="">
              </v-responsive>

              <v-card-title class="card__title text-uppercase">
                Своя программа
              </v-card-title>
            </v-card>
          </nuxt-link>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'Add',
    created () {
      if(!this.isAuth) {
        this.$router.push('/login')
      }
    },
    computed: {
      ...mapGetters('user', ['isAuth'])
    }
  }
</script>
