<template>
  <v-container id="container" fluid>
    <progress-circular v-if="loading" />
    <template v-else-if="dataCalendar">
      <v-img max-height="700" :src="dataCalendar.backgroundSrc">
        <v-row style="height: 100%" align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card-text
              style="color: white"
              class="text-center display-3 font-weight-bold"
              :class="{ 'headline font-weight-bold': $vuetify.breakpoint.xs }"
              v-text="filterCalendarName"
            />
            <v-divider class="white" light />
            <v-card-text
              style="color: white; white-space: pre-line"
              :class="{ 'body-2': $vuetify.breakpoint.xs }"
              class="headline text-center"
              v-text="dataCalendar.shortDescription"
            />
          </v-col>
        </v-row>
      </v-img>
      <v-col class="text-center mt-8 mb-n8">
        <v-btn v-scroll-to="'#scrol2'" color="#FB8C00" x-large rounded
          >Хочу {{ calendarType }}</v-btn
        >
      </v-col>
      <preview-content />
      <studio-price id="scrol2" :title-studios="titleCalendar" :type-exercise="'calendars'" />
      <v-row justify="center">
        <v-col sm="10">
          <carousel :title-studios="titleCalendar" />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <feedback :message-subject="dataCalendar.studioName">
            <v-card-text style="color: #FB8C00" class="headline text-center"
              >Остались вопросы? <br />
              Напишите нам</v-card-text
            >
          </feedback>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CalendarPreview',
  metaInfo() {
    if (this.dataCalendar) {
      return {
        title: `${this.filterCalendarName} | Купить`,
        titleTemplate: null
      }
    }
  },
  components: {
    PreviewContent: () => import('../../components/studios/PreviewContent'),
    StudioPrice: () => import('../../components/studios/StudioPrice'),
    ProgressCircular: () => import('../../components/shared/ProgressCircular'),
    Feedback: () => import('../../components/shared/Feedback'),
    Carousel: () => import('../../components/shared/Carousel')
  },
  props: {
    titleCalendar: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      listStudios: state => state.studios.listStudios,
      loading: state => state.shared.loading
    }),
    dataCalendar() {
      return this.$store.getters.dataCalendar(this.titleCalendar)
    },
    filterCalendarName() {
      if (!this.dataCalendar.checkNeurographics) {
        return this.dataCalendar.studioName.split('.')[1]
      } else {
        return this.dataCalendar.studioName
      }
    },
    calendarType() {
      if (!this.dataCalendar.checkNeurographics) {
        return 'календарь'
      } else {
        return 'нейрографику'
      }
    }
  },
  watch: {
    titleCalendar: {
      deep: true,
      handler() {
        this.$store.dispatch('getPreviewContentStudio', {
          typeExercise: 'calendars',
          titleStudios: this.titleCalendar
        })
      }
    }
  },
  created() {
    if (!this.dataCalendar) {
      this.$store.dispatch('getListStudios', 'calendars')
    }
    this.$store
      .dispatch('getPreviewContentStudio', {
        typeExercise: 'calendars',
        titleStudios: this.titleCalendar
      })
      .then(dataPreview => {
        if (dataPreview.bonus && !this.listStudios.length) {
          this.$store.dispatch('getListStudios', 'studios')
        }
      })
  }
}
</script>

<style scoped lang="stylus" />
