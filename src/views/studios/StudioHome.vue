<template>
  <v-container
    v-if="dataStudio"
    class="backgroundImage"
    :style="{ 'background-image': `url(${dataStudio.backgroundSrc})` }"
    fluid
  >
    <progress-circular v-if="loading" />
    <template v-else>
      <v-row v-if="expired" align="center" justify="center">
        <v-col cols="12" sm="10" md="7">
          <transition appear name="dialog">
            <v-card>
              <v-card-text
                :class="{ headline: $vuetify.breakpoint.xs }"
                style="color: white"
                class="display-1 text-center font-weight-bold mb-1"
                v-text="dataStudio.studioName"
              />
              <v-card-text
                style="color: white; white-space: pre-line"
                :class="{ 'body-2': $vuetify.breakpoint.xs }"
                class="headline font-weight-black text-justify "
                v-text="dataStudio.text"
              />
              <v-card-actions>
                <v-btn to="/studios" color="red" icon>
                  <v-icon large>mdi-chevron-left</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn :loading="loading" dark color="orange" @click="createStudioUser"
                  >Погрузиться</v-btn
                >
              </v-card-actions>
            </v-card>
          </transition>
        </v-col>
      </v-row>
      <date-release v-else :data-studio="dataStudio" />
    </template>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'StudioHome',
  metaInfo() {
    if (this.dataStudio) {
      return {
        title: `${this.dataStudio.studioName} | Описание психологической студии`,
        titleTemplate: null,
        meta: [
          {
            vmid: 'description',
            name: 'description',
            content: `${this.metaInfoDescription}`
          }
        ]
      }
    }
  },
  components: {
    ProgressCircular: () => import('../../components/shared/ProgressCircular'),
    DateRelease: () => import('../../components/shared/DateRelease')
  },
  data: () => ({
    expired: true
  }),
  computed: {
    ...mapState({
      user: state => state.user.user,
      loading: state => state.shared.loading
    }),
    titleStudios() {
      return this.$route.params.titleStudios
    },
    dataStudio() {
      return this.$store.getters.dataStudio(this.titleStudios)
    },
    metaInfoDescription() {
      return this.dataStudio.shortDescription
        ? this.dataStudio.shortDescription
        : 'Студии - это игровое пространство для самостоятельного решения психологических проблем'
    }
  },
  watch: {
    dataStudio: {
      deep: true,
      handler() {
        if (
          this.dataStudio.studioOpeningDate &&
          +new Date(this.dataStudio.studioOpeningDate) - +new Date() > 0
        ) {
          this.expired = false
        }
      }
    }
  },
  created() {
    if (!this.dataStudio) {
      this.$store.dispatch('getListStudios', 'studios').then(() => {
        if (
          !this.user.neurographics ||
          (!this.user.neurographics.includes(this.dataStudio.studioName) &&
            this.dataStudio.id === 'neurography')
        ) {
          this.$store.dispatch('changeDataUser', { neurographics: this.dataStudio.studioName })
        }
        if (
          !this.user.studios ||
          (!this.user.studios.includes(this.dataStudio.studioName) &&
            this.dataStudio.id !== 'neurography')
        ) {
          this.$store.dispatch('changeDataUser', { studios: this.dataStudio.studioName })
        }
      })
    } else {
      if (
        !this.user.neurographics ||
        (!this.user.neurographics.includes(this.dataStudio.studioName) &&
          this.dataStudio.id === 'neurography')
      ) {
        this.$store.dispatch('changeDataUser', { neurographics: this.dataStudio.studioName })
      }
      if (
        !this.user.studios ||
        (!this.user.studios.includes(this.dataStudio.studioName) &&
          this.dataStudio.id !== 'neurography')
      ) {
        this.$store.dispatch('changeDataUser', { studios: this.dataStudio.studioName })
      }
    }

    if (
      this.dataStudio &&
      this.dataStudio.studioOpeningDate &&
      +new Date(this.dataStudio.studioOpeningDate) - +new Date() >= 0
    ) {
      this.expired = false
    }
  },
  methods: {
    createStudioUser() {
      if (!this.user[this.titleStudios]) {
        this.$store
          .dispatch('createStudioUser', {
            titleStudios: this.titleStudios,
            typeExercise: 'studios'
          })
          .then(() => {
            const label = {}
            label[this.titleStudios] = true
            this.$store.dispatch('changeDataUser', { ...label })
          })
      }
      this.$router.push(`/studio/${this.titleStudios}/1`)
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
  background: rgba(255, 143, 0, 0.7) !important;
  padding: 10px
  color: #fff
}
.dialog-enter, .dialog-leave-to  {
  opacity: 0;
}
.dialog-enter-active, .dialog-leave-active  {
  transition: opacity 1s;
}
</style>
