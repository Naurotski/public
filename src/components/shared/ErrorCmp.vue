<template>
  <v-container fluid class="d-flex align-center">
    <v-row>
      <v-col>
        <v-card-text lin class="my-4 text-center title">
          <h1 class="display-4 font-weight-bold" style="color: red">404</h1>
          <h3 class="display-4 font-weight-black " style="color: white">Page not found !</h3>
          <v-btn :x-small="$vuetify.breakpoint.xs" dark class="mt-7" to="/" text
            ><span class="headline font-weight-black"> GET ME OUT OF HERE</span>
          </v-btn>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ErrorCmp'
}
</script>

<style scoped lang="stylus">
  .d-flex{
    height 100%
    background-image url("https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2Fscream_edvard_munch.jpg?alt=media&token=f643098b-5efc-48b7-9356-ee2b77e82215")
    background-size cover
}
</style>
