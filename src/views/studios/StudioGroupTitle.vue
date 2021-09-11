<template>
  <v-container
    v-if="dataStudio && studioModel"
    class="backgroundImage"
    :style="{ 'background-image': `url(${dataStudio.backgroundSrc})` }"
    fluid
  >
    <v-container v-if="expired" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="10">
          <transition appear name="dialog">
            <v-card :loading="loading" class="grayBackground">
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
            </v-card>
          </transition>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="8" class="text-center">
          <v-card class="orangeBackground">
            <v-card-actions>
              <v-spacer />
              <v-btn color="red" icon @click="previousPage">
                <v-icon large>mdi-chevron-up</v-icon>
              </v-btn>
              <v-btn color="red" icon @click="nextPage"
                ><v-icon large>mdi-chevron-down</v-icon>
              </v-btn>
              <v-spacer />
            </v-card-actions>
            <v-row v-if="studioModel && studioModel.length !== 0" justify="center">
              <v-col v-for="(step, index) in paginationArray" :key="index" cols="11" class="mx-n2">
                <template v-if="step.id">
                  <transition appear name="dialog">
                    <v-card>
                      <v-card-title v-text="` Шаг ${step.id}`" />
                      <v-card-text
                        v-if="step.stepAccepted"
                        class="text-justify "
                        style="color: green"
                        >Задание принято</v-card-text
                      >
                      <v-card-text class="text-justify ">{{
                        step.questions[0].question | trimLength
                      }}</v-card-text>
                      <v-spacer />
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          :x-small="$vuetify.breakpoint.xs"
                          :disabled="admin ? false : !step.stepOpen"
                          :to="`/studios/group/${titleStudios}/${step.id}`"
                          >открыть</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </transition>
                </template>

                <v-card-actions v-else>
                  <v-spacer />
                  <v-btn color="red" icon @click="previousPage">
                    <v-icon large>mdi-chevron-up</v-icon>
                  </v-btn>
                  <h1>&#183;&#183;&#183;</h1>
                  <v-btn color="red" icon @click="nextPage"
                    ><v-icon large>mdi-chevron-down</v-icon>
                  </v-btn>
                  <v-spacer />
                </v-card-actions>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer />
              <v-btn color="red" icon @click="previousPage">
                <v-icon large>mdi-chevron-up</v-icon>
              </v-btn>
              <v-btn color="red" icon @click="nextPage"
                ><v-icon large>mdi-chevron-down</v-icon>
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row
        v-if="answersStudioGroupUser.length === studioModel.length"
        align="center"
        justify="center"
      >
        <v-col cols="12" md="10">
          <transition appear name="dialog">
            <v-card class="grayBackground">
              <v-card-text
                :class="{ 'body-2': $vuetify.breakpoint.xs }"
                style="color: white; white-space: pre-line"
                class="headline font-weight-black text-justify "
                v-text="dataStudio.finalText"
              />
              <v-card-actions class="flex-wrap justify-end">
                <v-btn
                  :disabled="finishedStudios"
                  color="orange"
                  :x-small="$vuetify.breakpoint.xs"
                  @click="changeNumberAnteaters"
                  >Получить Муравьедов</v-btn
                >
                <v-btn
                  :class="$vuetify.breakpoint.xs ? 'mt-2' : 'mt-0'"
                  color="orange"
                  :x-small="$vuetify.breakpoint.xs"
                  :loading="loading"
                  @click="uploadToFilePdf"
                  >сохранить в файл(.pdf)</v-btn
                >
              </v-card-actions>
            </v-card>
          </transition>
        </v-col>
      </v-row>
    </v-container>
    <date-release v-else :data-studio="dataStudio" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'StudioGroupTitle',
  metaInfo() {
    if (this.dataStudio) {
      return {
        title: `${this.dataStudio.studioName} | Психологическая студия в группе `,
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
    DateRelease: () => import('../../components/shared/DateRelease')
  },
  filters: {
    trimLength(val) {
      if (val.length < 200) {
        return val
      }
      return `${val.substring(0, 200)}...`
    }
  },
  data: () => ({
    expired: true,
    stepStudio: 3
  }),
  computed: {
    paginationArray() {
      let localArray = []
      let left = +this.stepStudio - 2
      let right = +this.stepStudio + 3
      let counter
      this.studioModel.forEach(step => {
        if (
          +step.id === 1 ||
          +step.id === this.studioModel.length ||
          (step.id >= left && step.id < right)
        ) {
          if (counter) {
            if (+step.id - counter !== 1) {
              localArray.push({})
            }
          }
          if (
            (+step.id === 1 || this.answersStudioGroupUser.includes(+step.id)) &&
            this.answersStudioGroupUser.includes(+step.id + 1)
          ) {
            counter = +step.id
            localArray.push({
              ...step,
              stepOpen: true,
              stepAccepted: true
            })
          } else if (+step.id === 1 || this.answersStudioGroupUser.includes(+step.id)) {
            counter = +step.id
            localArray.push({
              ...step,
              stepOpen: true
            })
          } else {
            counter = +step.id
            localArray.push(step)
          }
        }
      })
      return localArray
    },

    titleStudios() {
      return this.$route.params.titleStudios
    },
    ...mapState({
      user: state => state.user.user,
      loading: state => state.shared.loading,
      studioModel: state => state.dialogs.studioModel,
      listStudios: state => state.studios.listStudiosGroup
    }),
    admin() {
      return this.$store.getters.admin
    },
    answersStudioGroupUser() {
      return this.$store.getters.answersStudioGroupUser(this.user.id)
    },
    dataStudio() {
      return this.$store.getters.dataStudioGroup(this.titleStudios)
    },
    finishedStudios() {
      return this.user.finishedStudios && this.user.finishedStudios.includes(this.titleStudios)
    },
    metaInfoDescription() {
      return this.dataStudio.shortDescription
        ? this.dataStudio.shortDescription
        : 'Студии - это игровое пространство для самостоятельного решения психологических проблем'
    }
  },
  watch: {
    dataCalendar: {
      deep: true,
      handler() {
        if (
          this.dataStudio.studioOpeningDate &&
          +new Date(this.dataStudio.studioOpeningDate) - +new Date() > 0
        ) {
          this.expired = false
        }
      }
    },
    stepStudio: {
      deep: true,
      handler() {
        localStorage.setItem(`stepStudio_${this.titleStudios}`, this.stepStudio)
      }
    }
  },
  created() {
    if (!this.dataStudio) {
      this.$store.dispatch('getListStudios', 'studiosGroup').then(() => {
        if (
          !this.user.studiosGroup ||
          !this.user.studiosGroup.includes(this.dataStudio.studioName)
        ) {
          this.$store.dispatch('changeDataUser', { studiosGroup: this.dataStudio.studioName })
        }
        if (+new Date(this.dataStudio.studioOpeningDate) - +new Date() >= 0) {
          this.expired = false
        } else {
          this.$store.dispatch('fetchStudioModel', {
            titleStudios: this.titleStudios,
            typeExercise: 'studiosGroup'
          })
          this.$store.dispatch('fetchAnswersStudioGroup', { titleStudios: this.titleStudios })
        }
      })
    } else {
      if (!this.user.studiosGroup || !this.user.studiosGroup.includes(this.dataStudio.studioName)) {
        this.$store.dispatch('changeDataUser', { studiosGroup: this.dataStudio.studioName })
      }
      if (+new Date(this.dataStudio.studioOpeningDate) - +new Date() >= 0) {
        this.expired = false
      } else {
        this.$store.dispatch('fetchStudioModel', {
          titleStudios: this.titleStudios,
          typeExercise: 'studiosGroup'
        })
        this.$store.dispatch('fetchAnswersStudioGroup', { titleStudios: this.titleStudios })
      }
    }
    if (localStorage.getItem(`stepStudio_${this.titleStudios}`)) {
      this.stepStudio = +localStorage.getItem(`stepStudio_${this.titleStudios}`)
    } else {
      this.stepStudio = 3
    }
  },
  methods: {
    uploadToFilePdf() {
      this.$store.dispatch('setPostsUser', {
        studioModelLength: this.studioModel.length,
        titleStudios: this.titleStudios,
        studioName: this.dataStudio.studioName
      })
    },
    previousPage() {
      if (+this.stepStudio > 1) {
        this.stepStudio = +this.stepStudio - 1
      }
    },
    nextPage() {
      if (+this.stepStudio < this.studioModel.length) {
        this.stepStudio = +this.stepStudio + 1
      }
    },
    changeNumberAnteaters() {
      if (
        !this.finishedStudios &&
        this.dataStudio.numberAnteaters &&
        this.answersStudioGroupUser.length === this.studioModel.length
      ) {
        this.$store.dispatch('changeDataUser', {
          finishedStudios: this.titleStudios,
          anteaters: this.dataStudio.numberAnteaters
        })
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
.grayBackground{
  background: rgba(189, 189, 189, 0.9) !important;
  padding: 10px
}
.dialog-enter, .dialog-leave-to  {
  opacity: 0;
}
.dialog-enter-active, .dialog-leave-active  {
  transition: opacity 1s;
}
  .orangeBackground{
    background: rgba(255, 204, 128, 0.7) !important;
  }
</style>
