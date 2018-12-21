<template>
  <v-app style="background: #FBFEF9;">
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <template v-if="user">
          <v-list-tile @click="logout">
            <v-list-tile-action>
              <v-icon>fas fa-sign-out-alt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Выйти</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title @click="$router.push('/')">Nuxt Workout</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <nuxt />
    </v-content>

    <v-footer color="primary" class="px-3">
      <span class="white--text">&copy; {{new Date().getFullYear()}}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'Layout',
    data: () => ({
      drawer: false
    }),
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      logout() {
        this.drawer = false;
        this.$store.dispatch('logoutUser')
          .then(() => this.$router.push('/login'))
      }
    }
  }
</script>

<style src="../assets/scss/style.scss" lang="scss">
</style>
