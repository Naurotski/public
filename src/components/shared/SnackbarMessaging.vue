<template>
  <v-snackbar v-model="snackbar" light top right multi-line timeout="-1">
    <a style="text-decoration: none; color: black" :href="dataMessage.link">{{
      dataMessage.title
    }}</a>
    <template v-slot:action="{ attrs }">
      <v-btn v-bind="attrs" small text icon color="red" @click="snackbar = false"
        ><v-icon>mdi-close</v-icon></v-btn
      >
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SnackbarMessaging',
  data: () => ({
    snackbar: false
  }),
  computed: {
    ...mapState({
      dataMessage: state => state.messages.dataMessage
    })
  },
  watch: {
    dataMessage: {
      deep: true,
      handler() {
        this.snackbar = true
      }
    }
  }
}
</script>

<style scoped></style>
