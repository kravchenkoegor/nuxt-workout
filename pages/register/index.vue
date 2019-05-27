<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card class="elevation-12">
          <v-toolbar dark color="secondary">
            <v-toolbar-title>Регистрация</v-toolbar-title>
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
                autocomplete="new-password"
              />
              <v-text-field
                v-model="email"
                :rules="emailRules"
                color="secondary"
                prepend-icon="fas fa-envelope"
                label="Эл. почта"
                name="email"
                type="text"
                autocomplete="new-password"
              />
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                color="secondary"
                prepend-icon="fas fa-lock"
                label="Пароль"
                name="password"
                type="password"
                autocomplete="new-password"
              />
            </v-form>
            <p>Уже зарегистрировались? <nuxt-link to="/login">Вам сюда.</nuxt-link></p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="secondary"
              dark
              @click="onSubmit"
            >Регистрация</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: 'Register',
    data: () => ({
      isFormValid: true,
      username: '',
      email: '',
      password: '',
      usernameRules: [
        username => !!username || 'Введите имя',
        username => username.length >= 3 || 'Имя не может быть короче 3 символов'
      ],
      emailRules: [
        email => !!email || 'Введите адрес эл. почты',
        email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) || 'Введите корректный адрес'
      ],
      passwordRules: [
        password => !!password || 'Введите пароль',
        password => password.length >= 6 || 'Пароль не может быть короче 6 символов'
      ],
    }),
    watch: {
      user(value) {
        if (value) {
          this.$router.push('/');
        }
      }
    },
    methods: {
      ...mapActions(['registerUser']),
      onSubmit() {
        if (this.$refs.form.validate()) {
          this.registerUser({
            username: this.username,
            email: this.email,
            password: this.password
          })
            .then(() => this.$router.push('/'))
            .catch(error => console.error(error))
        }
      }
    }
  }
</script>
