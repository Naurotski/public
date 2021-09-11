<template>
  <v-card
    v-if="
      previewContentStudio &&
        previewContentStudio.reviews &&
        previewContentStudio.reviews.length !== 0 &&
        previewContentStudio.reviews[0].email
    "
  >
    <v-card-title
      class="text-center display-1"
      :class="{ 'headline font-weight-bold': $vuetify.breakpoint.xs }"
      >Отзывы о студии</v-card-title
    >
    <v-carousel light hide-delimiter-background delimiter-icon="mdi-minus" height="100%">
      <v-carousel-item
        v-for="(slide, index) in previewContentStudio.reviews"
        :key="index"
        style="background-color: #ECEFF1"
        contain
      >
        <v-container fluid>
          <v-row class="fill-height mb-5" align="center" justify="center">
            <v-col class="text-center" cols="10">
              <v-avatar size="48" class="profile">
                <v-img v-if="slide.clientPhotoUrl" :src="slide.clientPhotoUrl" />
                <v-icon v-else>mdi-account-outline</v-icon>
              </v-avatar>
              <p
                style="word-break: normal"
                :class="{ 'subtitle-2 font-weight-bold': $vuetify.breakpoint.xs }"
                v-text="slide.clientName"
              />
            </v-col>
            <v-col cols="9" class=" mt-n5">
              <p
                style="white-space: pre-line "
                :class="{ 'body-2': $vuetify.breakpoint.xs }"
                class="headline text-justify font-italic"
              >
                {{ slide.text }}
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Carousel',
  props: {
    titleStudios: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      admin: state => state.user.admin,
      user: state => state.user.user,
      previewContentStudio: state => state.studios.previewContentStudio
    })
  }
}
</script>

<style scoped></style>
