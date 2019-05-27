<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card class="elevation-12">
          <v-toolbar dark color="secondary">
            <v-toolbar-title>Авторизация</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
              v-model="isFormValid"
              lazy-validation
              ref="form"
              @submit.prevent="onSubmit"
            >
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                color="secondary"
                prepend-icon="fas fa-user"
                label="Имя пользователя"
                name="login"
                type="text"
              />
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                color="secondary"
                prepend-icon="fas fa-lock"
                label="Пароль"
                name="password"
                type="password"
              />
            </v-form>
            <p>Нет аккаунта? Регистрация <nuxt-link to="/register">здесь.</nuxt-link></p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="secondary"
              dark
              @click="onSubmit"
            >Войти</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: 'Login',
    data: () => ({
      isFormValid: true,
      username: '',
      password: '',
      usernameRules: [
        username => !!username || 'Введите имя',
        username => username.length >= 3 || 'Имя не может быть короче 3 символов'
      ],
      passwordRules: [
        password => !!password || 'Введите пароль',
        password => password.length >= 6 || 'Пароль не может быть короче 6 символов'
      ],
    }),
    created() {
      if (process.browser) {
        const token = localStorage.getItem('workout-token');
        const userId = localStorage.getItem('workout-userId');

        if (token && userId) {
          this.authUserById(userId);
        }
      }
    },
    methods: {
      ...mapActions('user', ['authUserById', 'loginUser']),
      onSubmit() {
        if (this.$refs.form.validate()) {
          this.loginUser({
            username: this.username,
            password: this.password
          })
            .then(() => this.$router.push('/'))
            .catch(error => console.error(error));
        }
      }
    }
  }
</script>
