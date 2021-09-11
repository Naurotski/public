<template>
  <v-container
    v-if="dataCalendar"
    class="backgroundImage"
    :style="{ 'background-image': `url(${dataCalendar.backgroundSrc})` }"
    fluid
  >
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <transition appear name="dialog">
          <v-card :loading="loading" class="mx-auto elevation-12">
            <v-card-text
              v-if="dataCalendar"
              class="blue lighten-4 title font-weight-regular text-justify"
              v-text="dataCalendar.studioName"
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
              <v-btn :loading="loading" :to="`/calendar/${titleCalendar}`" color="red" icon>
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
              <v-btn :loading="loading" to="/calendars" color="red" icon
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
  name: 'CalendarResult',
  metaInfo() {
    if (this.dataCalendar) {
      return {
        title: `${this.dataCalendar.studioName} | Результат`,
        titleTemplate: null
      }
    }
  },
  props: {
    titleCalendar: {
      type: String,
      required: true
    }
  },
  computed: {
    studio() {
      return this.$store.getters.studio
    },
    dataCalendar() {
      return this.$store.getters.dataCalendar(this.titleCalendar)
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
    }
  },
  created() {
    if (!this.dataCalendar) {
      this.$store.dispatch('getListStudios', 'calendars')
    }
    if (this.studio.length === 0) {
      this.$store.dispatch('fetchStudio', {
        titleStudios: this.titleCalendar,
        typeExercise: 'calendars'
      })
    }
  },
  methods: {
    uploadToFilePdf() {
      this.$store.dispatch('uploadToFilePdf', {
        studioName: this.dataCalendar.studioName,
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
  background: rgba(189, 189, 189, 0.4) !important
  padding: 10px
}
</style>
