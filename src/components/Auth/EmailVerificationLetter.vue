<template>
  <v-dialog v-model="dialog" persistent max-width="370">
    <template v-slot:activator="{ on }">
      <slot name="button" :on="on">
        <v-btn x-small text v-on="on" @click="sendEmailVerification">
          <i class="caption red--text text--darken-1">
            Подтвердить Адрес
          </i>
        </v-btn>
      </slot>
    </template>
    <v-card color="blue lighten-4">
      <slot>
        <v-card-title style="word-break: normal" class="headline">
          На Вашу электронную почту отправлено письмо для подтверждения адреса.
        </v-card-title>
      </slot>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#FB8C00" text @click="dialog = false">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EmailVerificationLetter',
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    sendEmailVerification() {
      this.$store.dispatch('sendEmailVerification')
    }
  }
}
</script>

<style scoped></style>
