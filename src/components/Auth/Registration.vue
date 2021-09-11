<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="blue lighten-4">
            <v-toolbar-title class="Underdog">Регистрация</v-toolbar-title>
            <v-progress-linear
              :active="loading"
              :indeterminate="loading"
              absolute
              bottom
              color="#FB8C00"
            />
            <v-spacer />
            <v-btn color="orange" dark icon @click="loginUserFacebook"
              ><v-icon>mdi-facebook</v-icon></v-btn
            >
            <v-btn color="orange" dark icon @click="loginUserGoogle"
              ><v-icon>mdi-google</v-icon></v-btn
            >
          </v-toolbar>
          <v-card-title class="title font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
            <v-avatar
              color="blue lighten-4"
              class="subheading white--text"
              size="24"
              v-text="step"
            />
          </v-card-title>
          <v-window v-model="step">
            <v-form ref="form" v-model="valid">
              <v-window-item :value="1">
                <v-card-text>
                  <v-text-field
                    v-model="email"
                    color="blue lighten-4"
                    prepend-icon="mdi-email"
                    name="email"
                    label="Email"
                    type="email"
                    :rules="emailRules"
                    counter
                  />
                  <i class="caption grey--text text--darken-1">
                    Это адрес электронной почты, который вы будете использовать для входа в свою
                    учетную запись MetaMarfosi.
                  </i>
                </v-card-text>
              </v-window-item>
              <v-window-item :value="2">
                <v-card-text>
                  <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    color="blue lighten-4"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    :type="show1 ? 'text' : 'password'"
                    counter
                    :rules="passwordRules"
                    @click:append="show1 = !show1"
                  />
                  <v-text-field
                    v-model="confirmPassword"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    color="blue lighten-4"
                    prepend-icon="mdi-lock-reset"
                    name="confirm-password"
                    label="Confirm Password"
                    :type="show2 ? 'text' : 'password'"
                    counter
                    :rules="confirmPasswordRules"
                    @click:append="show2 = !show2"
                  />
                  <i class="caption grey--text text--darken-1">
                    Пожалуйста, введите пароль для вашей учетной записи
                  </i>
                </v-card-text>
              </v-window-item>
              <v-window-item :value="3">
                <div class="pa-4 text-center">
                  <router-link to="/">
                    <v-img
                      class="mb-4"
                      contain
                      height="128"
                      src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/studios%2Flogo.png?alt=media&token=8970024e-0791-4e71-b31a-43b14791806a"
                    />
                  </router-link>
                  <h3 class="title font-weight-light mb-2">Добро пожаловать в MetaMarfosi</h3>
                  <span class="caption ">Спасибо за регистрацию!</span>
                  <br />
                  <span class="caption grey--text"
                    >На Вашу электронную почту отправлено письмо для подтверждения адреса.</span
                  >
                </div>
              </v-window-item>
            </v-form>
          </v-window>
          <v-divider />
          <v-card-actions>
            <v-btn
              :disabled="step === 1 || step === 3"
              text
              icon
              color="blue lighten-4"
              @click="step--"
            >
              <v-icon large>mdi-chevron-left</v-icon>
            </v-btn>
            <v-spacer />
            <v-btn
              :disabled="!valid || step === 3"
              text
              icon
              color="blue lighten-4"
              @click="step === 2 ? onSubmit() : step++"
            >
              <v-icon large>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Registration',
  metaInfo: {
    title: 'Регистрация'
  },
  data: function() {
    return {
      step: 1,
      email: '',
      password: '',
      valid: false,
      show1: false,
      show2: false,
      confirmPassword: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters',
        v => v.length < 31 || 'Password must not be more than 30 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid',
        v => v.length < 41 || 'Email must not be more than 40 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Password is required',
        v => v === this.password || 'Password should match'
      ]
    }
  },

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return 'Введите Email'
        case 2:
          return 'Создайте пароль'
        default:
          return 'Аккаунт создан'
      }
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('registerUser', {
            email: this.email,
            password: this.password
          })
          .then(() => this.$store.dispatch('sendEmailVerification'))
          .then(() => this.step++)
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

<style scoped />
