<template>
  <v-container
    v-if="dataStudio"
    class="backgroundImage"
    :style="{ 'background-image': `url(${dataStudio.backgroundSrc})` }"
    fluid
  >
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <transition appear name="dialog">
          <v-card :loading="loading" class="mx-auto elevation-12">
            <v-card-text
              v-if="dataStudio"
              class="blue lighten-4 title font-weight-regular text-justify"
              v-text="dataStudio.studioName"
            />
            <v-list v-for="element in studio" :key="element.id">
              <v-list-item v-for="(item, index) in element.questions" :key="index">
                <v-list-item-content>
                  <v-card-text
                    style="white-space: pre-line"
                    :class="{ 'body-2': $vuetify.breakpoint.xs }"
                    class="font-italic font-weight-medium text-justify"
                    v-text="item.question"
                  />
                  <v-img
                    v-if="item.questionImg"
                    contain
                    :src="item.questionImg"
                    max-height="300"
                    max-width="300"
                  />
                  <v-card-text v-if="item.answer" class="text-justify" v-text="item.answer" />
                  <v-img
                    v-if="item.answerBlockImg"
                    contain
                    :src="item.answerBlockImg"
                    max-height="300"
                    max-width="300"
                  />
                  <v-img
                    v-if="item.answerImg"
                    contain
                    :src="item.answerImg"
                    max-height="300"
                    max-width="300"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-card-actions>
              <v-btn :loading="loading" :to="`/studios/finalText/${titleStudios}`" color="red" icon>
                <v-icon large>mdi-chevron-left</v-icon>
              </v-btn>
              <v-spacer />
              <v-btn
                color="orange"
                :x-small="$vuetify.breakpoint.xs"
                :loading="loading"
                @click="uploadToFilePdf"
                >сохранить в файл(.pdf)</v-btn
              >
              <v-spacer />
              <v-btn :loading="loading" to="/studios" color="red" icon
                ><v-icon large>mdi-chevron-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'StudioResult',
  metaInfo() {
    if (this.dataStudio) {
      return {
        title: `${this.dataStudio.studioName} | Результат психологической студии `,
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
  props: {
    titleStudios: {
      type: String,
      required: true
    }
  },
  data: () => ({
    bonus: ''
  }),
  computed: {
    studio() {
      return this.$store.getters.studio
    },
    dataStudio() {
      return this.$store.getters.dataStudio(this.titleStudios)
    },
    loading() {
      return this.$store.getters.loading
    },
    user() {
      return this.$store.getters.user
    },
    userName() {
      if (this.user.firstName && this.user.lastName) {
        return this.user.firstName + ' ' + this.user.lastName
      } else if (this.user.firstName || this.user.lastName) {
        return this.user.firstName || this.user.lastName
      } else {
        return 'user'
      }
    },
    metaInfoDescription() {
      return this.dataStudio.shortDescription
        ? this.dataStudio.shortDescription
        : 'Студии - это игровое пространство для самостоятельного решения психологических проблем'
    }
  },
  created() {
    if (!this.dataStudio) {
      this.$store.dispatch('getListStudios', 'studios')
    }
    if (this.studio.length === 0) {
      this.$store.dispatch('fetchStudio', {
        titleStudios: this.titleStudios,
        typeExercise: 'studios'
      })
    }
  },
  methods: {
    uploadToFilePdf() {
      this.$store.dispatch('uploadToFilePdf', {
        studioName: this.dataStudio.studioName,
        studio: this.studio,
        userName: this.userName,
        userId: this.user.id
      })
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
.dialog-enter, .dialog-leave-to  {
  opacity: 0;
}
.dialog-enter-active, .dialog-leave-active  {
  transition: opacity 1s;
}

  .v-list{
    background: rgba(255, 243, 224, 0.4) !important
    padding: 10px
  }
</style>
