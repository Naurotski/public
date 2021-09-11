<template>
  <v-container class="studios" fluid>
    <v-row justify="center">
      <v-col md="10">
        <v-card :loading="loading">
          <v-card-text
            class="text-center title font-weight-bold"
            :class="{ 'subtitle-2 font-weight-bold': $vuetify.breakpoint.xs }"
            style="color: #FB8C00"
            ><h1>Календарь Голубого муравьеда</h1></v-card-text
          >
          <v-card-text
            style="color: black; white-space: pre-line"
            :class="{ 'body-2': $vuetify.breakpoint.xs }"
            class=" headline text-justify "
            ><span
              >Для того, чтобы раскрыть и проработать актуальную тему, не всегда нужна терапия или
              серьезные задания. В каждом календаре Голубого муравьеда вы найдете набор простых
              игровых упражнений. которые помогут вам по-новому взглянуть на проблему. Выбирайте
              тему!</span
            ></v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
    <transition-group class="row align-center justify-center" appear name="fadeGroup">
      <v-col v-for="(calendar, index) in listCalendars" :key="index" cols="12" sm="6" md="4">
        <v-card class="mx-auto" max-width="400">
          <v-img max-height="400px" :src="calendar.imageSrc" />
          <v-card-text
            v-if="calendar.shortDescription"
            class="text-justify"
            v-text="calendar.shortDescription"
          />
          <v-card-actions>
            <v-spacer />
            <v-btn text color="orange" @click="createPath(calendar.id)">
              Погрузиться
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </transition-group>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CalendarList',
  metaInfo: {
    title: 'Календарь Голубого муравьеда | MetaMorfosi',
    titleTemplate: null
  },
  computed: {
    ...mapState({
      loading: state => state.shared.loading,
      user: state => state.user.user
    }),
    listCalendars() {
      return this.$store.getters.listCalendars.filter(
        calendar => !calendar.draft && !calendar.checkNeurographics
      )
    }
  },
  created() {
    if (this.listCalendars.length === 0) {
      this.$store.dispatch('getListStudios', 'calendars')
    }
    if (this.$route.query['calendarError']) {
      this.$store.commit(
        'setError',
        'Пожалуйста, оплатите календарь, чтобы получить доступ к этой странице'
      )
    }
  },
  methods: {
    createPath(value) {
      if (this.user.payments && this.user.payments[value]) {
        this.$router.push(`/calendar/${value}`)
      } else {
        this.$router.push(`/calendar/preview/${value}`)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .studios{
    background-color #FFB300
  }
.fadeGroup-enter-active, .fadeGroup-leave-active {
  transition: opacity 2s;
}
.fadeGroup-enter, .fadeGroup-leave-to {
  opacity: 0;
}
</style>
