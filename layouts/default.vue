<template>
  <v-app style="background: #FBFEF9;">
    <v-navigation-drawer v-model="drawer" fixed app>
      <h3>{{ username }}</h3>
      <v-list>
        <v-list-tile
          v-for="item in menuLinks"
          :key="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <nuxt-link :to="item.link">
                {{ item.text }}
              </nuxt-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <template v-if="isAuth">
          <v-list-tile @click="logout">
            <v-list-tile-action>
              <v-icon>fas fa-sign-out-alt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title @click="logout">
                Выйти
              </v-list-tile-title>
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
      <span class="white--text">&copy; 2018 - {{new Date().getFullYear()}}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'Layout',
    data: () => ({
      drawer: false
    }),
    computed: {
      ...mapGetters('user', ['isAuth', 'username']),
      menuLinks() {
        const links = [];

        if (this.isAuth) {
          links.push(
            {text: 'Добавить тренировку', icon: 'fas fa-edit', link: '/create'},
            {text: 'Журнал тренировок', icon: 'fas fa-list-ul', link: '/history'}
          );
        } else {
          links.push(
            {text: 'Войти', icon: 'fas fa-sign-out-alt', link: '/login'}
          );
        }

        return links;
      }
    },
    methods: {
      ...mapActions('user', ['logoutUser']),
      logout() {
        this.drawer = false;
        this.logoutUser()
          .then(() => this.$router.push('/login'))
          .catch(error => console.log(error))
      }
    }
  }
</script>

<style src="../assets/scss/style.scss" lang="scss">
</style>
