<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col sm="12">
        <v-card>
          <slot />
          <v-form ref="form" v-model="valid" validation>
            <v-card-text>
              <v-text-field
                v-model="userName"
                color="blue lighten-4"
                prepend-icon="mdi-account-outline"
                label="Ваше Имя"
                class="purple-input"
                type="text"
                counter
                :rules="userDataRules"
              />
              <v-text-field
                v-model="userEmail"
                color="blue lighten-4"
                prepend-icon="mdi-email"
                name="email"
                label="Ваш E-mail"
                type="email"
                :rules="emailRules"
                counter
              />
              <v-textarea
                v-model="subject"
                prepend-icon="mdi-comment-text-outline"
                auto-grow
                filled
                color="deep-purple"
                label="Тема сообщения"
                rows="1"
                counter
                :rules="userDataRules"
              />
              <v-textarea
                v-model="text"
                prepend-icon="mdi-comment-text-outline"
                auto-grow
                filled
                color="deep-purple"
                label="Ваше сообщение"
                rows="1"
                counter
                :rules="dialogRules"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                :disabled="!valid"
                :loading="loading"
                color="blue lighten-2"
                text
                @click="sendMessage"
              >
                <i class="caption text--darken-1">
                  Отправить
                </i>
              </v-btn>
            </v-card-actions>
          </v-form>
          <v-overlay :absolute="absolute" :opacity="opacity" :value="overlay">
            <v-btn text color="orange lighten-2" @click="overlay = false">
              Ваше письмо отправлено
            </v-btn>
          </v-overlay>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Feedback',
  props: {
    messageSubject: {
      type: String,
      required: true
    }
  },
  data: () => ({
    valid: false,
    userName: '',
    userEmail: '',
    subject: '',
    text: '',
    overlay: false,
    absolute: true,
    opacity: 0.8,
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'Email must be valid',
      v => v.length < 31 || 'Email must not be more than 30 characters'
    ],
    dialogRules: [
      v => !!v || 'Введите данные',
      v => (v && v.length >= 3) || 'Текст должен быть не менее 3 символов',
      v => (v && v.length <= 2000) || 'Текст должен быть не более 2000 символов'
    ],
    userDataRules: [v => !!v || 'Введите данные', v => v.length <= 30 || 'Hе более 30 символов']
  }),
  computed: {
    ...mapState({
      loading: state => state.shared.loading,
      user: state => state.user.user
    })
  },
  created() {
    if (this.user) {
      this.userEmail = this.user.email
      if (this.user.firstName && this.user.lastName) {
        this.userName = `${this.user.firstName} ${this.user.lastName}`
      } else {
        this.userName = ''
        this.userEmail = ''
      }
    }
    this.subject = this.messageSubject || ''
  },
  methods: {
    sendMessage() {
      if (this.valid) {
        this.$store
          .dispatch('nodeMailer', {
            userName: this.userName,
            userEmail: this.userEmail,
            subject: this.subject,
            text: this.text
          })
          .then(result => {
            if (result.data === 'Wrong token') {
              this.$store.commit(
                'setError',
                'Вам необходимо зарегистрироваться. При регистрации вы получаете в подарок  10F(муравьедов)'
              )
              setTimeout(() => this.$store.commit('clearError'), 5500)
            } else if (result.status === 200) {
              this.text = ''
              this.overlay = !this.overlay
            }
          })
      }
    }
  }
}
</script>

<style scoped />
