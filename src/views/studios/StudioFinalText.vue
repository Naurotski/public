<template>
  <v-container
    v-if="dataStudio"
    class="backgroundImage"
    :style="{ 'background-image': `url(${dataStudio.backgroundSrc})` }"
    fluid
  >
    <progress-circular v-if="loading" />
    <v-row v-else align="center" justify="center">
      <v-col cols="12" sm="10" md="7">
        <transition appear name="dialog">
          <v-card class="backgroundCard">
            <v-card-text
              :class="{ headline: $vuetify.breakpoint.xs }"
              style="color: white"
              class="display-1 text-center font-weight-bold mb-1"
              v-text="dataStudio.studioName"
            />
            <v-card-text
              :class="{ 'body-2': $vuetify.breakpoint.xs }"
              style="color: white; white-space: pre-line"
              class="headline font-weight-black text-justify "
              v-text="dataStudio.finalText"
            />

            <v-card-actions v-if="dataStudioBonus && bonus">
              <v-spacer />
              <v-btn :to="createPath" dark color="blue " :x-small="$vuetify.breakpoint.smAndDown">
                перейти в {{ dataStudioBonus.studioName }}</v-btn
              >
              <v-spacer />
            </v-card-actions>

            <v-row v-if="dataStudio.id !== 'want'" class="mb-5" justify="center">
              <v-col cols="10" class="text-justify">
                <v-card elevation="12">
                  <v-card-text :class="{ 'body-2': $vuetify.breakpoint.xs }" class="headline"
                    >Если у вас после прохождения студии остаются вопросы, вы можете заказать
                    индивидуальную<dialog-cmp class="d-inline-block">
                      <template v-slot:nameActivator>
                        консультацию
                      </template>
                      <template v-slot:text>
                        <feedback :message-subject="messageSubject">
                          <v-card-text style="color: #FB8C00" class="title"
                            >Индивидуальная консультация Надежды Навроцкой по результатам студии
                            длится 90 минут, стоимость 100€. Если вы хотите заказать консультацию,
                            напишите нам.</v-card-text
                          >
                        </feedback>
                      </template>
                    </dialog-cmp>
                    с Надеждой Навроцкой.</v-card-text
                  >
                </v-card>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn :to="`/studio/${titleStudios}/${studio.length}`" color="red" icon>
                <v-icon large>mdi-chevron-left</v-icon>
              </v-btn>
              <v-spacer />
              <v-btn :loading="loading" dark color="orange" @click="changeNumberAnteaters"
                >Результат</v-btn
              >
            </v-card-actions>
          </v-card>
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'StudioFinalText',
  metaInfo() {
    if (this.dataStudio) {
      return {
        title: `${this.dataStudio.studioName} | Эпилог психологической студии`,
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
    DialogCmp: () => import('../../components/shared/DialogCmp'),
    ProgressCircular: () => import('../../components/shared/ProgressCircular'),
    Feedback: () => import('../../components/shared/Feedback')
  },
  data: () => ({
    messageSubject: 'Индивидуальная консультация',
    bonus: ''
  }),
  computed: {
    ...mapState({
      previewContentStudio: state => state.studios.previewContentStudio,
      loading: state => state.shared.loading
    }),
    titleStudios() {
      return this.$route.params.titleStudios
    },
    studio() {
      return this.$store.getters.studio
    },
    dataStudio() {
      return this.$store.getters.dataStudio(this.titleStudios)
    },
    user() {
      return this.$store.getters.user
    },
    finishedStudios() {
      return this.user.finishedStudios && this.user.finishedStudios.includes(this.titleStudios)
    },
    metaInfoDescription() {
      return this.dataStudio.shortDescription
        ? this.dataStudio.shortDescription
        : 'Студии - это игровое пространство для самостоятельного решения психологических проблем'
    },
    dataStudioBonus() {
      if (this.bonus) {
        return this.$store.getters.dataStudio(this.bonus)
      } else {
        return ''
      }
    },
    createPath() {
      if (this.user.payments && this.user.payments[this.previewContentStudio.bonus]) {
        return `/studios/home/${this.previewContentStudio.bonus}`
      } else {
        return `/studios/preview/${this.previewContentStudio.bonus}`
      }
    }
  },
  created() {
    if (this.studio.length === 0) {
      this.$store.dispatch('fetchStudio', {
        titleStudios: this.titleStudios,
        typeExercise: 'studios'
      })
    }
    if (!this.dataStudio) {
      this.$store.dispatch('getListStudios', 'studios')
    }
    this.$store
      .dispatch('getPreviewContentStudio', {
        typeExercise: 'studios',
        titleStudios: this.titleStudios
      })
      .then(() => {
        if (this.previewContentStudio) {
          this.bonus = this.previewContentStudio.bonus
        }
      })
  },
  methods: {
    changeNumberAnteaters() {
      if (!this.finishedStudios && this.dataStudio.numberAnteaters) {
        this.$store
          .dispatch('changeDataUser', {
            finishedStudios: this.titleStudios,
            anteaters: this.dataStudio.numberAnteaters
          })
          .then(() => this.$router.push(`/studios/result/${this.titleStudios}`))
      } else {
        this.$router.push(`/studios/result/${this.titleStudios}`)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.backgroundImage{
  background-size cover
  height 100%
  background-attachment: fixed;
}
.backgroundCard{
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
