<template>
  <v-container
    v-if="dataCalendar"
    class="backgroundImage"
    :style="{ 'background-image': `url(${dataCalendar.backgroundSrc})` }"
    fluid
  >
    <progress-circular v-if="loading" />
    <template v-else>
      <v-container v-if="expired" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="10">
            <transition appear name="dialog">
              <v-card>
                <v-card-text
                  :class="{ headline: $vuetify.breakpoint.xs }"
                  style="color: white"
                  class="display-1 text-center font-weight-bold mb-1"
                  v-text="dataCalendar.studioName"
                />
                <v-card-text
                  style="color: white; white-space: pre-line"
                  :class="{ 'body-2': $vuetify.breakpoint.xs }"
                  class="headline font-weight-black text-justify "
                  v-text="dataCalendar.text"
                />
                <v-card-actions>
                  <v-btn to="/calendars" color="red" icon>
                    <v-icon large>mdi-chevron-left</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </transition>
          </v-col>
        </v-row>
        <v-row class="my-10" justify="center">
          <v-col cols="12" md="8">
            <transition appear name="dialog">
              <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
                <v-timeline-item v-for="dialog in studio" :key="dialog.id">
                  <template v-slot:icon>
                    <v-avatar v-show="dialog.done">
                      <v-img src="../../image/logo.png" />
                    </v-avatar>
                  </template>
                  <v-card elevation="15">
                    <v-card-title class="text-center" v-text="dialog.id" />
                    <v-card-text>{{ dialog.questions[0].question | trimLength }}</v-card-text>
                    <v-card-actions v-if="dataCalendar.checkNeurographics">
                      <v-img :src="dialog.questions[0].questionImg" />
                    </v-card-actions>
                    <v-card-actions>
                      <v-spacer />
                      <dialog-calendar
                        :id="dialog.id"
                        :title-studios="titleCalendar"
                        :check-neurographics="dataCalendar.checkNeurographics || false"
                      />
                    </v-card-actions>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </transition>
          </v-col>
        </v-row>

        <v-row align="center" justify="center">
          <v-col cols="12" md="10">
            <transition appear name="dialog">
              <v-card>
                <v-card-text
                  :class="{ 'body-2': $vuetify.breakpoint.xs }"
                  style="color: white; white-space: pre-line"
                  class="headline font-weight-black text-justify "
                  v-text="dataCalendar.finalText"
                />
                <v-card-actions>
                  <v-btn to="/calendars" color="red" icon>
                    <v-icon large>mdi-chevron-left</v-icon>
                  </v-btn>
                  <v-spacer />
                  <v-btn
                    :disabled="!valid"
                    :loading="loading"
                    dark
                    color="orange"
                    @click="changeNumberAnteaters"
                    >Результат</v-btn
                  >
                </v-card-actions>
              </v-card>
            </transition>
          </v-col>
        </v-row>
      </v-container>
      <date-release v-else :data-studio="dataCalendar" />
    </template>
  </v-container>
</template>

<script>
export default {
  name: 'CalendarTitle',
  metaInfo() {
    if (this.dataCalendar) {
      return {
        title: this.dataCalendar.studioName,
        titleTemplate: null
      }
    }
  },
  filters: {
    trimLength(val) {
      if (val.length < 300) {
        return val
      }
      return `${val.substring(0, 300)}...`
    }
  },
  components: {
    ProgressCircular: () => import('../../components/shared/ProgressCircular'),
    DateRelease: () => import('../../components/shared/DateRelease'),
    DialogCalendar: () => import('../../components/calendars/DialogCalendar')
  },
  props: {
    titleCalendar: {
      type: String,
      required: true
    }
  },
  data: () => ({
    expired: true
  }),
  computed: {
    dataCalendar() {
      return this.$store.getters.dataCalendar(this.titleCalendar)
    },
    user() {
      return this.$store.getters.user
    },
    loading() {
      return this.$store.getters.loading
    },
    finishedStudios() {
      return this.user.finishedStudios && this.user.finishedStudios.includes(this.titleCalendar)
    },
    studio() {
      return this.$store.getters.studio
    },
    valid() {
      return this.studio.every(elem => elem.done)
    }
  },
  watch: {
    dataCalendar: {
      deep: true,
      handler() {
        if (
          this.dataCalendar.studioOpeningDate &&
          +new Date(this.dataCalendar.studioOpeningDate) - +new Date() > 0
        ) {
          this.expired = false
        }
      }
    }
  },
  created() {
    if (!this.dataCalendar) {
      this.$store.dispatch('getListStudios', 'calendars').then(() => {
        if (
          !this.user.calendars ||
          (!this.user.calendars.includes(this.dataCalendar.studioName) &&
            !this.dataCalendar.checkNeurographics)
        ) {
          this.$store.dispatch('changeDataUser', { calendars: this.dataCalendar.studioName })
        }
        if (
          !this.user.neurographics ||
          (!this.user.neurographics.includes(this.dataCalendar.studioName) &&
            this.dataCalendar.checkNeurographics)
        ) {
          this.$store.dispatch('changeDataUser', { neurographics: this.dataCalendar.studioName })
        }
        if (+new Date(this.dataCalendar.studioOpeningDate) - +new Date() >= 0) {
          this.expired = false
        } else {
          if (!this.user[this.titleCalendar]) {
            this.$store
              .dispatch('createStudioUser', {
                titleStudios: this.titleCalendar,
                typeExercise: 'calendars'
              })
              .then(() => {
                const label = {}
                label[this.titleCalendar] = true
                this.$store.dispatch('changeDataUser', { ...label })
                this.$store.dispatch('fetchStudio', {
                  titleStudios: this.titleCalendar,
                  typeExercise: 'calendars'
                })
              })
          } else {
            this.$store.dispatch('fetchStudio', {
              titleStudios: this.titleCalendar,
              typeExercise: 'calendars'
            })
          }
        }
      })
    } else {
      if (
        !this.user.calendars ||
        (!this.user.calendars.includes(this.dataCalendar.studioName) &&
          !this.dataCalendar.checkNeurographics)
      ) {
        this.$store.dispatch('changeDataUser', { calendars: this.dataCalendar.studioName })
      }
      if (
        !this.user.neurographics ||
        (!this.user.neurographics.includes(this.dataCalendar.studioName) &&
          this.dataCalendar.checkNeurographics)
      ) {
        this.$store.dispatch('changeDataUser', { neurographics: this.dataCalendar.studioName })
      }
      if (+new Date(this.dataCalendar.studioOpeningDate) - +new Date() >= 0) {
        this.expired = false
      } else {
        if (!this.user[this.titleCalendar]) {
          this.$store
            .dispatch('createStudioUser', {
              titleStudios: this.titleCalendar,
              typeExercise: 'calendars'
            })
            .then(() => {
              const label = {}
              label[this.titleCalendar] = true
              this.$store.dispatch('changeDataUser', { ...label })
              this.$store.dispatch('fetchStudio', {
                titleStudios: this.titleCalendar,
                typeExercise: 'calendars'
              })
            })
        } else {
          this.$store.dispatch('fetchStudio', {
            titleStudios: this.titleCalendar,
            typeExercise: 'calendars'
          })
        }
      }
    }
    this.$store.dispatch('fetchImageBlocksSrc', {
      titleStudio: this.titleCalendar,
      typeExercise: 'calendars'
    })
  },
  beforeDestroy() {
    this.$store.commit('clearImageBlocksSrc')
  },
  methods: {
    changeNumberAnteaters() {
      if (!this.finishedStudios && this.dataCalendar.numberAnteaters) {
        this.$store
          .dispatch('changeDataUser', {
            finishedStudios: this.titleCalendar,
            anteaters: this.dataCalendar.numberAnteaters
          })
          .then(() => this.$router.push(`/calendar/result/${this.titleCalendar}`))
      } else {
        this.$router.push(`/calendar/result/${this.titleCalendar}`)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.backgroundImage{
  background-size cover
  height 100%
  background-attachment: fixed
}
.v-card{
  background: rgba(189, 189, 189, 0.9) !important;
  padding: 10px
}
.dialog-enter, .dialog-leave-to  {
  opacity: 0;
}
.dialog-enter-active, .dialog-leave-active  {
  transition: opacity 1s;
}
</style>
