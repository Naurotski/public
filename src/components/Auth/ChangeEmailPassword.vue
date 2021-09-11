<template>
  <v-card>
    <v-card-text>
      <v-form ref="form" v-model="validEmail">
        <v-text-field
          v-model="email"
          color="blue lighten-4"
          label="Email"
          class="purple-input"
          type="email"
          :rules="emailRules"
          counter
        />
      </v-form>
    </v-card-text>
    <v-card-actions class="mt-n4">
      <email-verification-letter v-if="!user.emailVerified" />
      <v-spacer />
      <email-change-letter :valid-email="validEmail" :email="email" @changeEmail="updateEmail" />
    </v-card-actions>
    <v-card-actions class="mt-n4">
      <v-spacer />
      <email-verification-letter>
        <template #button="{on}">
          <v-btn x-small text v-on="on" @click="sendPasswordReset">
            <i class="caption green--text text--darken-1">
              Изменить Пароль
            </i>
          </v-btn>
        </template>
        <template>
          <v-card-title style="word-break: normal" class="headline">
            На Вашу электронную почту отправлено письмо для изменения пароля.
          </v-card-title>
        </template>
      </email-verification-letter>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ChangeEmailPassword',
  components: {
    EmailVerificationLetter: () => import('./EmailVerificationLetter'),
    EmailChangeLetter: () => import('./EmailChangeLetter')
  },
  data: () => ({
    email: '',
    validEmail: false,
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'Email must be valid',
      v => v.length < 31 || 'Email must not be more than 30 characters'
    ]
  }),
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  watch: {
    user: {
      deep: true,
      handler() {
        this.email = this.user.email || ''
      }
    }
  },
  created() {
    this.email = this.user.email || ''
  },
  methods: {
    updateEmail() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('updateEmailUser', this.email)
          .then(() => this.$store.dispatch('sendEmailVerification'))
      }
    },
    sendPasswordReset() {
      this.$store.dispatch('sendPasswordReset', this.email)
    }
  }
}
</script>

<style scoped></style>
