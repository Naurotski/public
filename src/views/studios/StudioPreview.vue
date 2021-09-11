<template>
  <v-container id="container" fluid>
    <progress-circular v-if="loading" />
    <template v-else-if="dataStudio">
      <v-img max-height="700" :src="dataStudio.backgroundSrc">
        <v-row style="height: 100%" align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card-text
              style="color: white"
              class="text-center display-3 font-weight-bold"
              :class="{ 'headline font-weight-bold': $vuetify.breakpoint.xs }"
              v-text="dataStudio.studioName"
            />
            <v-divider class="white" light />
            <v-card-text
              style="color: white; white-space: pre-line"
              :class="{ 'body-2': $vuetify.breakpoint.xs }"
              class="headline text-center"
              v-text="dataStudio.shortDescription"
            />
          </v-col>
        </v-row>
      </v-img>
      <v-col class="text-center mt-8 mb-n8">
        <v-btn v-scroll-to="'#scrol'" color="#FB8C00" x-large rounded>Хочу в студию</v-btn>
      </v-col>
      <preview-content />
      <studio-price id="scrol" :title-studios="titleStudios" :type-exercise="'studios'" />
      <v-row justify="center">
        <v-col sm="10">
          <carousel :title-studios="titleStudios" />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <feedback :message-subject="dataStudio.studioName">
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
  name: 'StudioPreview',
  metaInfo() {
    if (this.dataStudio) {
      return {
        title: `${this.dataStudio.studioName} | Купить психологическую студию`,
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
    PreviewContent: () => import('../../components/studios/PreviewContent'),
    StudioPrice: () => import('../../components/studios/StudioPrice'),
    ProgressCircular: () => import('../../components/shared/ProgressCircular'),
    Feedback: () => import('../../components/shared/Feedback'),
    Carousel: () => import('../../components/shared/Carousel')
  },
  props: {
    titleStudios: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      loading: state => state.shared.loading
    }),
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
    titleStudios: {
      deep: true,
      handler() {
        this.$store.dispatch('getPreviewContentStudio', {
          typeExercise: 'studios',
          titleStudios: this.titleStudios
        })
      }
    }
  },
  created() {
    if (!this.dataStudio) {
      this.$store.dispatch('getListStudios', 'studios')
    }
    this.$store.dispatch('getPreviewContentStudio', {
      typeExercise: 'studios',
      titleStudios: this.titleStudios
    })
  }
}
</script>

<style scoped lang="stylus" />
