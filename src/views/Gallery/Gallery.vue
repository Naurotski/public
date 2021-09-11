<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="8">
        <v-card :loading="loading">
          <v-card-text
            class="text-center title font-weight-bold"
            :class="{ 'subtitle-2 font-weight-bold': $vuetify.breakpoint.xs }"
            style="color: #FB8C00"
            ><h1>{{ $t('gallery.galleryN') }}</h1></v-card-text
          >
        </v-card>
      </v-col>
      <v-col class="mt-4" cols="4" md="1">
        <language-selection />
      </v-col>
    </v-row>

    <transition-group appear name="fadeGroup">
      <v-container key="a" fluid>
        <v-row justify="space-around" align="center">
          <v-col cols="12" md="3">
            <v-card>
              <v-img
                src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2Fnadja2019-600.PNG?alt=media&token=d3479731-ca96-4f72-b149-bddf144b2ddc"
              />
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-card>
              <v-card-title>{{ $t('gallery.name') }}</v-card-title>
              <v-card-text class="text-justify">
                {{ $t('gallery.text1') }} <br />
                {{ $t('gallery.text2') }} <br />
                <br />
                <i>
                  {{ $t('gallery.text3') }} <br />
                  {{ $t('gallery.text4') }}
                </i>
              </v-card-text>
            </v-card>
          </v-col>
          <v-row justify="center">
            <v-col cols="12" sm="10">
              <v-card>
                <v-card-text class="text-center" style="color: #FB8C00">{{
                  $t('gallery.description')
                }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-row>
      </v-container>

      <v-container key="b" class="pa-4 text-center" fluid>
        <v-row
          style="background-color: #ECEFF1"
          class="fill-height"
          align="center"
          justify="center"
        >
          <template v-for="rubric in localeRubrics">
            <v-col
              v-if="rubric.rubric !== 'photo'"
              :key="rubric.title"
              cols="12"
              sm="4"
              md="3"
              lg="2"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card class="opacity" :elevation="hover ? 12 : 0" :class="{ 'on-hover': hover }">
                  <v-img :src="rubric.rubricSrc" height="225px">
                    <v-card-title style="word-break: normal" class="title white--text">
                      <v-row class="fill-height flex-column" justify="space-between">
                        <p class="mt-4 subheading text-left">
                          {{ rubric.title }}
                        </p>
                        <div class="align-self-auto mt-4">
                          <v-btn
                            :to="`/gallery/${rubric.rubric}`"
                            :class="{ 'show-btns': hover }"
                            color="transparent"
                            icon
                          >
                            <v-icon :class="{ 'show-btns': hover }">mdi-image-multiple</v-icon>
                          </v-btn>
                        </div>
                      </v-row>
                    </v-card-title>
                  </v-img>
                </v-card>
              </v-hover>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </transition-group>
  </v-container>
</template>

<script>
export default {
  name: 'Gallery',
  metaInfo: {
    title: 'Галерея Надежды Навроцкой | Купить картину',
    titleTemplate: null,
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content:
          'В галерее вы можете найти и приобрести графические и живописные работы Надежды Навроцкой. Художник, фотограф, психолог и арт-терапевт, автор проекта «Metamorfosi». '
      }
    ]
  },
  components: {
    LanguageSelection: () => import('../../components/shared/LanguageSelection')
  },
  data: () => ({
    localeRubrics: []
  }),
  computed: {
    admin() {
      return this.$store.getters.admin
    },
    promoPaintings() {
      return this.$store.getters.promoPaintings
    },
    loading() {
      return this.$store.getters.loading
    },
    rubrics() {
      return this.$store.getters.rubrics
    },
    i18n() {
      return this.$i18n.locale
    }
  },
  watch: {
    i18n: {
      deep: true,
      handler() {
        this.localeRubrics = this.rubrics.map(rubric => {
          return {
            ...rubric,
            title: this.$t(`gallery.${rubric.rubric}`)
          }
        })
      }
    }
  },
  created() {
    this.$store.dispatch('fetchPaintings').then(() => {
      this.localeRubrics = this.rubrics.map(rubric => {
        return {
          ...rubric,
          title: this.$t(`gallery.${rubric.rubric}`)
        }
      })
    })
  }
}
</script>

<style scoped lang="stylus">
.opacity {
  transition: opacity 0.4s ease-in-out;
}

.opacity:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
.fadeGroup-enter-active, .fadeGroup-leave-active {
  transition: opacity 2s;
}
.fadeGroup-enter, .fadeGroup-leave-to {
  opacity: 0;
}
</style>
