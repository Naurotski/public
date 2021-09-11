<template>
  <v-container fluid>
    <h1>{{ +new Date(user.club.creationTime) }}</h1>
    <h1>{{ dateTest }}</h1>
    <h1>{{ days }}дней-{{ hours }}часов-{{ minutes }}минут-{{ seconds }}секунд</h1>
    <v-btn color="pink" dark fab fixed>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TestPage',
  data: () => ({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    interval: ''
  }),
  computed: {
    ...mapState({
      user: state => state.user.user
    }),
    dateTest() {
      return new Date(
        new Date(this.user.club.creationTime).setFullYear(
          new Date(this.user.club.creationTime).getFullYear() + 1
        )
      )
        .toISOString()
        .substr(0, 10)
    }
  }
  // created() {
  //   if (
  //     this.user.club &&
  //     new Date(this.user.club.creationTime).setFullYear(
  //       new Date(this.user.club.creationTime).getFullYear() + 1
  //     ) -
  //       +new Date() >
  //       0
  //   ) {
  //     this.interval = setInterval(() => {
  //       let diff =
  //         new Date(this.user.club.creationTime).setFullYear(
  //           new Date(this.user.club.creationTime).getFullYear() + 1
  //         ) - +new Date()
  //       this.tdays = Math.floor(diff / (1000 * 60 * 60 * 24))
  //       this.thours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  //       this.tminutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  //       this.tseconds = Math.floor((diff % (1000 * 60)) / 1000)
  //       this.days = this.tdays < 10 ? '0' + this.tdays : this.tdays
  //       this.hours = this.thours < 10 ? '0' + this.thours : this.thours
  //       this.minutes = this.tminutes < 10 ? '0' + this.tminutes : this.tminutes
  //       this.seconds = this.tseconds < 10 ? '0' + this.tseconds : this.tseconds
  //       if (diff < 0) {
  //         clearInterval(this.interval)
  //         this.expired = true
  //       }
  //     }, 1000)
  //   }
  // },
  // beforeDestroy() {
  //   clearInterval(this.interval)
  // }
}
</script>

<style scoped />
