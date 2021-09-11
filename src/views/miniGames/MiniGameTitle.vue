<template>
  <v-container fluid>
    <mini-game :title-game="titleGame" />
  </v-container>
</template>

<script>
export default {
  name: 'MiniGameTitle',
  components: {
    MiniGame: () => import('../../components/miniGames/MiniGame')
  },
  props: {
    titleGame: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped></style>
