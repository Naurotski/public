<template>
  <v-container
    v-if="dataStudio"
    class="backgroundImage"
    :style="{ 'background-image': `url(${dataStudio.backgroundSrc})` }"
    fluid
  >
    <progress-circular v-if="loading || !dataStudio" />
    <v-row v-else justify="center">
      <v-col cols="12" sm="10" md="8">
        <transition appear name="dialog">
          <v-card v-if="show" class="mx-auto elevation-12">
            <v-card-text
              class="blue lighten-4 title font-weight-regular text-justify"
              v-text="dataStudio.studioName"
            />
            <studio-dialog :id="id" :dialog="dialog" :title-studios="titleStudios" />
          </v-card>
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'StudiosTitle',
  metaInfo() {
    if (this.dataStudio) {
      return {
        title: `${this.dataStudio.studioName} | Задания психологической студии`,
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
    StudioDialog: () => import('../../components/studios/StudioDialog'),
    ProgressCircular: () => import('../../components/shared/ProgressCircular')
  },
  props: {
    titleStudios: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    activeColor: 'red'
  }),
  computed: {
    dialog() {
      return this.$store.getters.dialog(this.id)
    },
    dataStudio() {
      return this.$store.getters.dataStudio(this.titleStudios)
    },
    show() {
      return this.$store.getters.show
    },
    loading() {
      return this.$store.getters.loading
    },
    user() {
      return this.$store.getters.user
    },
    metaInfoDescription() {
      return this.dataStudio.shortDescription
        ? this.dataStudio.shortDescription
        : 'Студии - это игровое пространство для самостоятельного решения психологических проблем'
    }
  },
  created() {
    this.$store.dispatch('fetchStudio', {
      titleStudios: this.titleStudios,
      typeExercise: 'studios'
    })
    if (!this.dataStudio) {
      this.$store.dispatch('getListStudios', 'studios')
    }
    this.$store.dispatch('fetchImageBlocksSrc', {
      titleStudio: this.titleStudios,
      typeExercise: 'studios'
    })
  },
  beforeDestroy() {
    this.$store.commit('clearImageBlocksSrc')
  }
}
</script>

<style scoped lang="stylus">
.backgroundImage{
  background-size cover
  height 100%
  background-attachment: fixed;
}
.v-card{
  background: rgba(255, 243, 224, 0.9) !important
  padding: 10px
}
.dialog-enter, .dialog-leave-to  {
  opacity: 0;
}
.dialog-enter-active, .dialog-leave-active  {
  transition: opacity 1s;
}
</style>
