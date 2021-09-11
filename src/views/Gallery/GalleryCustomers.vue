<template>
  <v-container v-if="gallery" fluid>
    <v-row justify="end">
      <v-col class="mt-4" cols="4" md="1">
        <language-selection />
      </v-col>
    </v-row>
    <v-row justify="space-around" align="center">
      <v-col cols="12" md="3">
        <v-card>
          <v-img :src="gallery.descriptionSrc" />
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card color="#FFF3E0">
          <v-card-title style="word-break: normal" class="Underdog" v-text="gallery.galleryName" />
          <v-card-text
            style="white-space: pre-line"
            class=" Underdog text-justify"
            v-text="gallery.galleryDescription"
          />
          <router-link
            v-if="gallery.previewLink"
            style="text-decoration: none"
            :to="gallery.previewLink"
            ><v-card-text
              style="white-space: pre-line"
              class=" Underdog text-justify"
              v-text="gallery.previewTextLink"
          /></router-link>
          <v-card-actions>
            <v-spacer />
            <v-btn v-scroll-to="'#galleryCarousel'" x-large icon color="#FB8C00">
              <v-icon>mdi-arrow-down-bold-outline</v-icon>
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div style="height: 350px" />
    <div id="galleryCarousel" style="height: 50px" />
    <div style="height: 50px" />
    <v-row>
      <v-col>
        <v-carousel interval="10000" cycle hide-delimiter-background hide-delimiters height="600px">
          <v-carousel-item
            v-for="imageSrc in gallery.imageBlockSrc"
            :key="imageSrc"
            style="background-color: #ECEFF1"
            contain
            :src="imageSrc"
          />
        </v-carousel>
        <v-row justify="center">
          <v-col cols="12" sm="8" class="text-center">
            <audio autoplay controls loop :src="gallery.galleryAudioSrc" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div style="height: 100px" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GalleryCustomers',
  metaInfo() {
    if (this.gallery) {
      return {
        title: `${this.gallery.galleryName}`,
        titleTemplate: null,
        meta: [
          {
            vmid: 'description',
            name: 'description',
            content: `${this.gallery.galleryDescription}`
          }
        ]
      }
    }
  },
  components: {
    LanguageSelection: () => import('../../components/shared/LanguageSelection')
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      loading: state => state.shared.loading
    }),
    i18n() {
      return this.$i18n.locale
    },
    galleryListFilterLanguage() {
      return this.$store.getters.galleryListFilterLanguage(this.i18n)
    },
    gallery() {
      return this.galleryListFilterLanguage.find(gallery => gallery.galleryTitle === this.title)
    }
  },
  created() {
    if (this.galleryListFilterLanguage.length === 0) {
      this.$store.dispatch('getGalleryList')
    }
  }
}
</script>

<style scoped></style>
