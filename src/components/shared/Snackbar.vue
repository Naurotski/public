<template>
  <v-snackbar :color="colorSnackbar" :multi-line="true" :timeout="5000" :value="true">
    <router-link v-if="mustRegister" to="/login" tag="span" class="cursorPointer">{{
      error
    }}</router-link>
    <p v-else>{{ error }}</p>
    <template v-slot:action>
      <v-btn dark text @click="closeError">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Snackbar',
  computed: {
    ...mapState({
      error: state => state.shared.error
    }),
    mustRegister() {
      return (
        this.error ===
        'Вам необходимо зарегистрироваться. При регистрации вы получаете в подарок  10F(муравьедов)'
      )
    },
    colorSnackbar() {
      if (this.error === 'Сохранено' || this.error === 'УДАЛЕНО') {
        return 'green'
      } else {
        return 'error'
      }
    }
  },
  methods: {
    closeError() {
      this.$store.commit('clearError')
    }
  }
}
</script>

<style scoped />
