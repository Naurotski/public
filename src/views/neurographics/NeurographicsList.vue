<template>
  <list-component title="Нейрографика" :list="allList" @createPath="createPath">
    <v-col key="a" cols="12" sm="6" md="4">
      <v-card class="mx-auto" max-width="400">
        <v-img
          max-height="200px"
          src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2Fnejro_algorutmy_500_v2.jpg?alt=media&token=601a5b97-c0be-4970-8987-bcc556f7d40d"
        />
        <v-card-text class="text-justify">Отдельные видео-уроки нейрографики</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="orange" to="/separateVideosList">
            Погрузиться
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </list-component>
</template>

<script>
export default {
  name: 'NeurographicsList',
  metaInfo: {
    title: 'Нейрографика',
    titleTemplate: null,
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: `Нейрографика это эффективный инструмент для решения задач, достижения целей и исполнения желаний.`
      }
    ]
  },
  components: {
    ListComponent: () => import('@/components/shared/ListComponent')
  },
  computed: {
    listStudios() {
      return this.$store.getters.listStudios.filter(
        studio => !studio.draft && studio.id === 'neurography'
      )
    },
    listCalendars() {
      return this.$store.getters.listCalendars.filter(
        calendar => !calendar.draft && calendar.checkNeurographics
      )
    },
    allList() {
      return [...this.listStudios, ...this.listCalendars]
    },
    user() {
      return this.$store.getters.user
    }
  },
  created() {
    if (this.listStudios.length === 0) {
      this.$store.dispatch('getListStudios', 'studios').then(() => {
        if (this.listCalendars.length === 0) {
          this.$store.dispatch('getListStudios', 'calendars')
        }
      })
    } else {
      if (this.listCalendars.length === 0) {
        this.$store.dispatch('getListStudios', 'calendars')
      }
    }
  },
  methods: {
    createPath(value) {
      if (this.user.payments && this.user.payments[value]) {
        if (value === 'neurography') {
          this.$router.push(`/studios/home/${value}`)
        } else {
          this.$router.push(`/calendar/${value}`)
        }
      } else {
        if (value === 'neurography') {
          this.$router.push(`/studios/preview/${value}`)
        } else {
          this.$router.push(`/calendar/preview/${value}`)
        }
      }
    }
  }
}
</script>

<style scoped />
