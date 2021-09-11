<template>
  <v-card class="my-7">
    <v-progress-linear :active="loading" :indeterminate="loading" absolute color="#FB8C00" />
    <v-card-actions class="ml-3">
      <v-avatar v-for="n in 5" :key="n" size="25" class="ml-n3">
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2Flogo.png?alt=media&token=ea4addb9-d4e1-474e-a73d-1db632798b1f"
        />
      </v-avatar>
      <v-card-title style="word-break: normal" class="ml-n2">
        Мои муравьеды:
        <span style="color: #FB8C00" class="ml-3 "> {{ anteaters }} </span>
      </v-card-title>
    </v-card-actions>
    <v-card-title>
      Мои студии:
    </v-card-title>
    <v-card-text>
      <router-link
        v-for="(studioUser, index) in listStudiosUser"
        :key="index"
        tag="span"
        class="cursorPointer d-flex"
        :to="`/studios/home/${studioUser.id}`"
        >{{ studioUser.studioName }}</router-link
      >
    </v-card-text>
    <v-card-title>
      Мои студии в группе:
    </v-card-title>
    <v-card-text>
      <router-link
        v-for="(studioUser, index) in listStudiosGroupUser"
        :key="index"
        tag="span"
        class="cursorPointer d-flex"
        :to="`/studios/group/${studioUser.id}`"
        >{{ studioUser.studioName }}</router-link
      >
    </v-card-text>

    <v-card-title>
      Мои календари:
    </v-card-title>
    <v-card-text>
      <router-link
        v-for="(calendarUser, index) in listCalendarsUser"
        :key="index"
        tag="span"
        class="cursorPointer d-flex"
        :to="`/calendar/${calendarUser.id}`"
        >{{ calendarUser.studioName }}</router-link
      >
    </v-card-text>

    <v-card-title>
      Арт-терапия:
    </v-card-title>
    <v-card-text>
      <router-link
        v-for="(artTherapy, index) in artTherapyListUser"
        :key="index"
        tag="span"
        class="cursorPointer d-flex"
        :to="`/artTherapyDescription/${artTherapy.id}`"
        >{{ artTherapy.studioName }}</router-link
      >
    </v-card-text>

    <v-card-title>
      Нейрографика:
    </v-card-title>
    <v-card-text>
      <router-link
        v-for="(neurographics, index) in listNeurographicsUser"
        :key="index"
        tag="span"
        class="cursorPointer d-flex"
        :to="path(neurographics)"
        >{{ neurographics.studioName }}</router-link
      >
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AnteatersStudiosProfile',
  computed: {
    ...mapState({
      user: state => state.user.user,
      loading: state => state.shared.loading,
      listStudios: state => state.studios.listStudios,
      listStudiosGroup: state => state.studios.listStudiosGroup,
      listCalendars: state => state.studios.listCalendars,
      artTherapyList: state => state.artTherapy.artTherapyList
    }),
    anteaters() {
      return +this.user.anteaters || ''
    },
    listStudiosUser() {
      const listStudiosUser = []
      if (this.user.studios && this.listStudios.length) {
        this.user.studios.forEach(studio => {
          listStudiosUser.push(this.listStudios.find(elem => elem.studioName === studio))
        })
      }
      return listStudiosUser
    },
    listStudiosGroupUser() {
      const listStudiosGroupUser = []
      if (this.user.studiosGroup && this.listStudiosGroup.length) {
        this.user.studiosGroup.forEach(studio => {
          listStudiosGroupUser.push(this.listStudiosGroup.find(elem => elem.studioName === studio))
        })
      }
      return listStudiosGroupUser
    },
    listCalendarsUser() {
      const listCalendarsUser = []
      if (this.user.calendars && this.listCalendars.length) {
        this.user.calendars.forEach(calendar => {
          listCalendarsUser.push(this.listCalendars.find(elem => elem.studioName === calendar))
        })
      }
      return listCalendarsUser
    },
    artTherapyListUser() {
      const artTherapyListUser = []
      if (this.user.artTherapy && this.artTherapyList.length) {
        this.user.artTherapy.forEach(artTherapy => {
          artTherapyListUser.push(this.artTherapyList.find(elem => elem.studioName === artTherapy))
        })
      }
      return artTherapyListUser
    },

    listNeurographicsUser() {
      const listNeurographicsUser = []
      if (
        this.user.neurographics &&
        this.user.neurographics.includes('Базовая нейрографика') &&
        this.listStudios.length
      ) {
        listNeurographicsUser.push(
          this.listStudios.find(elem => elem.studioName === 'Базовая нейрографика')
        )
      }
      if (this.user.neurographics && this.listCalendars.length) {
        this.user.neurographics.forEach(calendar => {
          let result = this.listCalendars.find(elem => elem.studioName === calendar)
          if (result) {
            listNeurographicsUser.push(result)
          }
        })
      }
      if (this.user.neurographics && this.artTherapyList.length) {
        this.user.neurographics.forEach(artTherapy => {
          let result = this.artTherapyList.find(elem => elem.studioName === artTherapy)
          if (result) {
            listNeurographicsUser.push(result)
          }
        })
      }
      return listNeurographicsUser
    }
  },
  created() {
    if (!this.listStudios.length) {
      this.$store.dispatch('getListStudios', 'studios')
    }
    if (!this.listStudiosGroup.length) {
      this.$store.dispatch('getListStudios', 'studiosGroup')
    }
    if (!this.listCalendars.length) {
      this.$store.dispatch('getListStudios', 'calendars')
    }
    if (!this.artTherapyList.length) {
      this.$store.dispatch('getArtTherapy')
    }
  },
  methods: {
    path(neurographics) {
      if (neurographics.id === 'neurography') {
        return `/studios/home/neurography`
      } else if (neurographics.artNeurographics) {
        return `/artTherapyDescription/${neurographics.id}`
      } else {
        return `/calendar/${neurographics.id}`
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.cursorPointer:hover{
  color #FB8C00
}
</style>
