<template>
  <v-app style="background: #FAFAFA;">
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-toolbar color="primary" dark>
        <template v-if="isAuth">
          <v-icon>fas fa-user</v-icon>
          <h3 class="ml-3 mt-1 text-uppercase">
            {{ username }}
          </h3>
        </template>

        <template v-else>
          <h3 class="text-uppercase">Меню</h3>
        </template>
      </v-toolbar>

      <v-list>
        <v-list-tile
          v-for="item in menuLinks"
          :key="item.link"
        >
          <v-list-tile-action>
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <nuxt-link :to="item.link" class="link">
                {{ item.text }}
              </nuxt-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <template v-if="isAuth">
          <v-list-tile @click="logout">
            <v-list-tile-action>
              <v-icon color="primary">
                fas fa-sign-out-alt
              </v-icon>
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
      <v-btn icon @click="handleClick">
        <v-icon>{{ toolbarIcon }}</v-icon>
      </v-btn>
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <nuxt />
    </v-content>
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
      ...mapGetters('toolbar', ['title', 'icon', 'targetComponent']),
      menuLinks() {
        const links = [];

        if (this.isAuth) {
          links.push(
            {text: 'Добавить тренировку', icon: 'fas fa-edit', link: '/create'},
            {text: 'Журнал тренировок', icon: 'fas fa-list-ul', link: '/history'},
            {text: 'Профиль', icon: 'fas fa-user-cog', link: ''}
          );
        } else {
          links.push(
            {text: 'Регистрация', icon: 'fas fa-user-plus', link: '/register'},
            {text: 'Вход', icon: 'fas fa-sign-out-alt', link: '/login'}
          );
        }

        return links;
      },
      toolbarIcon() {
        return this.targetComponent ? 'arrow_back' : 'menu';
      }
    },
    methods: {
      ...mapActions('user', ['logoutUser']),
      handleClick() {
        if (this.targetComponent) {
          this.$router.push({name: this.targetComponent});
        } else {
          this.drawer = !this.drawer;
        }
      },
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
