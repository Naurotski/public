<template>
  <v-container>
    <v-row justify="center">
      <v-col md="10">
        <v-card :loading="loading">
          <v-card-text
            class="text-center title font-weight-bold"
            :class="{ 'subtitle-2 font-weight-bold': $vuetify.breakpoint.xs }"
            style="color: #FB8C00"
            ><h1 class="Underdog">Мини Игры</h1></v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col v-for="game in listGames" :key="game.id" cols="12" sm="6" md="4">
        <v-card class="mx-auto" max-width="400">
          <v-img max-height="200px" :src="game.imageSrc" />
          <v-card-actions>
            <v-spacer />
            <v-btn text color="orange" @click="createPath(game.id)">
              Играть
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MiniGamesList',
  computed: {
    ...mapState({
      listGames: state => state.games.listGames,
      loading: state => state.shared.loading
    })
  },
  created() {
    if (this.listGames.length === 0) {
      this.$store.dispatch('getListGames')
    }
  },
  methods: {
    createPath(id) {
      this.$router.push(`/miniGameTitle/${id}`)
    }
  }
}
</script>

<style scoped></style>
