<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="blue lighten-4">
            <v-toolbar-title class="Underdog">Погрузиться</v-toolbar-title>
            <v-spacer />
            <v-btn color="orange" dark icon @click="loginUserFacebook"
              ><v-icon>mdi-facebook</v-icon></v-btn
            >
            <v-btn color="orange" dark icon @click="loginUserGoogle"
              ><v-icon>mdi-google</v-icon></v-btn
            >
          </v-toolbar>
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-card-text>
                <v-form ref="form" v-model="valid" validation>
                  <v-text-field
                    v-model="email"
                    color="blue lighten-4"
                    label="Email"
                    name="email"
                    :rules="emailRules"
                    prepend-icon="mdi-email"
                    type="email"
                  />
                  <v-text-field
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    color="blue lighten-4"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock-question"
                    :type="show ? 'text' : 'password'"
                    counter
                    :rules="passwordRules"
                    @click:append="show = !show"
                  />
                </v-form>
              </v-card-text>
            </v-window-item>
            <v-window-item :value="2">
              <v-card-title style="word-break: normal" class="text-center">
                На Вашу электронную почту отправлено письмо для изменения пароля.
              </v-card-title>
            </v-window-item>
          </v-window>

          <v-card-actions>
            <v-btn v-if="step === 2" text icon color="blue lighten-4" @click="step = 1">
              <v-icon large>mdi-chevron-left</v-icon>
            </v-btn>

            <v-tooltip v-else bottom dark>
              <template v-slot:activator="{ on }">
                <v-btn color="blue lighten-2" x-small text v-on="on" @click="sendPasswordReset">
                  <i class="caption text--darken-1">
                    Забыли пароль?
                  </i>
                </v-btn>
              </template>
              <span style="word-break: normal">Введите email и нажмите на эту кнопку</span>
            </v-tooltip>
            <v-spacer />
            <v-btn color="blue lighten-2" x-small text to="/registration">
              <i class="caption text--darken-1">
                Регистрация
              </i>
            </v-btn>
            <v-spacer />
            <v-btn
              :loading="loading"
              :disabled="!valid"
              color="blue lighten-4"
              class="Underdog"
              @click="onSubmit"
              >Вход</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  metaInfo: {
    title: 'Погрузиться'
  },
  data: () => ({
    step: 1,
    email: '',
    password: '',
    valid: false,
    show: false,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
    ]
  }),
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  created() {
    if (this.$route.query['loginError']) {
      this.$store.commit('setError', 'Please log in to access this page.')
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store
          .dispatch('loginUser', user)
          .then(() => this.$router.push('/'))
          .catch(() => {})
      }
    },
    sendPasswordReset() {
      if (this.email.length !== 0 && /.+@.+\..+/.test(this.email)) {
        this.step = 2
        this.$store.dispatch('sendPasswordReset', this.email)
      }
    },
    loginUserGoogle() {
      this.$store.dispatch('loginUserGoogle').then(() => this.$router.push('/'))
    },
    loginUserFacebook() {
      this.$store.dispatch('loginUserFacebook').then(() => this.$router.push('/'))
    }
  }
}
</script>

<style lang="stylus" />
