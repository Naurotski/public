<template>
  <v-fab-transition>
    <v-btn
      v-show="visible"
      tr
      color="red"
      dark
      fab
      fixed
      style="right: 30px; bottom: 30px"
      @click="scrollTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  name: 'FloatingButton',
  data: () => ({
    visible: false
  }),
  mounted() {
    window.addEventListener('scroll', this.scrollListener)
  },
  methods: {
    scrollListener() {
      this.visible = window.scrollY > 700
    },
    scrollTop() {
      let intervalId = setInterval(() => {
        if (window.pageYOffset === 0) {
          clearInterval(intervalId)
        }
        window.scroll(0, window.pageYOffset - 80)
      }, 10)
    }
  }
}
</script>

<style scoped />
