<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="8">
        <v-card :loading="loading">
          <v-card-text
            class="text-center title font-weight-bold"
            :class="{ 'subtitle-2 font-weight-bold': $vuetify.breakpoint.xs }"
            style="color: #FB8C00"
            ><h1>{{ $t('gallery.gallery') }}</h1></v-card-text
          >
        </v-card>
      </v-col>
      <v-col class="mt-4" cols="4" md="1">
        <language-selection />
      </v-col>
    </v-row>
    <transition appear name="fadeGroup">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="4" md="3">
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 3 : 20" class="mx-auto">
              <router-link to="/gallery" style="text-decoration: none">
                <v-img
                  class="cursorPointer"
                  src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2Fpeekaboo%2F67.png?alt=media&token=8bdf9438-d2c3-46b7-8550-f0d74cd0ebce"
                  ><v-card-title style="color: white; word-break: normal">{{
                    $t('gallery.galleryN')
                  }}</v-card-title></v-img
                >
                <v-card-text>{{ $t('gallery.galleryNNDescription') }}</v-card-text>
              </router-link>
            </v-card>
          </v-hover>
        </v-col>
        <v-col
          v-for="gallery in galleryListFilterLanguage"
          :key="gallery.galleryTitle"
          cols="12"
          sm="4"
          md="3"
        >
          <v-hover v-slot:default="{ hover }">
            <router-link
              style="text-decoration: none"
              :to="`/galleryCustomers/${gallery.galleryTitle}`"
            >
              <v-card :elevation="hover ? 3 : 20" class="mx-auto">
                <v-img class="cursorPointer" :src="gallery.imageSrc">
                  <v-card-title
                    style="color: white; word-break: normal"
                    v-text="gallery.galleryName"
                  />
                </v-img>
                <v-card-text v-text="gallery.shortDescription" />
              </v-card>
            </router-link>
          </v-hover>
        </v-col>
      </v-row>
    </transition>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'GalleryList',
  metaInfo: {
    title: 'Галерея | MetaMorfosi',
    titleTemplate: null,
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content:
          'Художник, фотограф, психолог и арт-терапевт, автор проекта «Metamorfosi». В галерее вы можете найти и приобрести графические и живописные работы Надежды  Навроцкой'
      }
    ]
  },
  components: {
    LanguageSelection: () => import('../../components/shared/LanguageSelection')
  },
  computed: {
    ...mapState({
      loading: state => state.shared.loading
    }),
    i18n() {
      return this.$i18n.locale
    },
    galleryListFilterLanguage() {
      return this.$store.getters
        .galleryListFilterLanguage(this.i18n)
        .filter(gallery => !gallery.draft)
    }
  },
  created() {
    if (this.galleryListFilterLanguage.length === 0) {
      this.$store.dispatch('getGalleryList')
    }
  }
}
</script>

<style scoped lang="stylus">
.fadeGroup-enter-active, .fadeGroup-leave-active {
  transition: opacity 2s;
}
.fadeGroup-enter, .fadeGroup-leave-to {
  opacity: 0;
}
</style>
