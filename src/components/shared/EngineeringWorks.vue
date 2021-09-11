<template>
  <v-container fluid class="align-center">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="backgroundCard">
          <v-card-text
            v-if="id"
            style="color: white"
            class="text-center display-3 font-weight-bold"
            :class="{ 'headline font-weight-bold': $vuetify.breakpoint.xs }"
            v-text="id"
          />
          <v-card-text
            v-else
            style="color: white"
            class="text-center display-3 font-weight-bold"
            :class="{ 'headline font-weight-bold': $vuetify.breakpoint.xs }"
            >Извините идут технические работы</v-card-text
          >
          <v-card-actions>
            <v-spacer />
            <v-btn :x-small="$vuetify.breakpoint.xs" dark class="mt-7" to="/" text
              >продолжить</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'EngineeringWorks',
  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="stylus">
.backgroundCard{
  background: rgba(176, 190, 197, 0.3) !important
  padding: 10px
}
.align-center{
  height 100%
  background-image url("https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/paintinds%2F-LwVOg9q51_BOpzHItPl?alt=media&token=e1a37521-725c-43f4-bc46-6650bc1a4911")
  background-size cover
}
</style>
