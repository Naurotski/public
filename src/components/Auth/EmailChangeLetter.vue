<template>
  <v-dialog v-model="dialog" persistent max-width="370">
    <template v-slot:activator="{ on }">
      <v-btn
        :disabled="!validEmail || user.email === email"
        x-small
        text
        v-on="on"
        @click="changeEmail"
      >
        <i class="caption green--text text--darken-1">
          Изменить Адрес
        </i>
      </v-btn>
    </template>
    <v-card color="blue lighten-4">
      <v-card-title v-if="!error" style="word-break: normal" class="headline text-center">
        <span class="red--text mx-auto">Внимание!!</span>
        Ваш адрес электронной почты был изменен
      </v-card-title>
      <v-card-title v-else style="word-break: normal" class="headline text-center">
        <span class="red--text mx-auto">Внимание!!</span>
        {{ text }}
      </v-card-title>
      <v-card-text v-if="!error" class="text-center">
        Вам отправлено письмо для подтверждения адреса.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="logoutUser">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EmailChangeLetter',
  props: {
    validEmail: {
      type: Boolean,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      text: null
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error() {
      this.text = this.error
    }
  },
  methods: {
    changeEmail() {
      this.$emit('changeEmail')
    },
    logoutUser() {
      if (this.error) {
        this.dialog = false
        this.$store.commit('clearError')
      } else {
        this.$router.push('/')
        this.$store.dispatch('logoutUser')
      }
    }
  }
}
</script>

<style scoped></style>
