<template>
  <v-container v-if="previewContentStudio" fluid>
    <v-row justify="center" class=" my-12">
      <v-col class=" text-justify " sm="10">
        <v-card>
          <v-card-text
            style="color: black; white-space: pre-line"
            :class="{ 'body-2': $vuetify.breakpoint.xs }"
            class="headline"
            v-text="previewContentStudio.block1"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" class="text-justify">
        <v-card elevation="12" color="#FFF3E0">
          <v-card-text
            class="text-center display-1 font-weight-bold"
            :class="{ 'headline font-weight-bold': $vuetify.breakpoint.xs }"
            v-text="previewContentStudio.block2Title"
          />
          <v-card-text
            style="white-space: pre-line"
            :class="{ 'body-2': $vuetify.breakpoint.xs }"
            class="headline"
            v-text="previewContentStudio.block2"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="my-12">
      <v-col class="text-justify" sm="10">
        <v-card>
          <v-card-text
            style="color: #FB8C00; white-space: pre-line"
            :class="{ 'body-2': $vuetify.breakpoint.xs }"
            class="headline font-italic font-weight-light"
            v-text="previewContentStudio.block3"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-parallax dark :src="previewContentStudio.parallaxSrc">
      <v-row align="center" justify="center">
        <v-col class="mt-5 text-justify" sm="10">
          <p
            class="text-center display-1 font-weight-bold"
            :class="{ 'headline font-weight-bold': $vuetify.breakpoint.xs }"
            v-text="previewContentStudio.parallaxTitle"
          />
          <p
            style="white-space: pre-line"
            :class="{ 'body-2': $vuetify.breakpoint.xs }"
            class="headline"
            v-text="previewContentStudio.parallaxText"
          />
        </v-col>
      </v-row>
    </v-parallax>

    <v-row justify="center" class="my-9">
      <v-col sm="10" class="text-justify">
        <v-card>
          <v-card-text
            style="color: #FB8C00; white-space: pre-line"
            :class="{ 'body-2': $vuetify.breakpoint.xs }"
            class="headline"
            v-text="previewContentStudio.block4"
          />
          <v-card-actions v-if="dataStudio && previewContentStudio.bonus">
            <v-row justify="center">
              <v-btn :to="createPath" dark color="blue" :x-small="$vuetify.breakpoint.smAndDown"
                >перейти в {{ dataStudio.studioName }}</v-btn
              >
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="text-justify" cols="12" sm="8">
        <v-card elevation="12" color="#FFF3E0">
          <v-card-text
            class="text-center display-1 font-weight-bold"
            :class="{ 'headline font-weight-bold': $vuetify.breakpoint.xs }"
            v-text="previewContentStudio.block5Title"
          />
          <v-card-text
            style="white-space: pre-line"
            :class="{ 'body-2': $vuetify.breakpoint.xs }"
            class="headline"
            v-text="previewContentStudio.block5Text"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="previewContentStudio.iframeSrc" justify="center" class=" my-12">
      <v-col class=" text-justify " sm="10">
        <iframe
          :src="previewContentStudio.iframeSrc"
          width="100%"
          :height="$vuetify.breakpoint.xs ? 200 : 500"
          style="border: none"
          allow="accelerometer; fullscreen; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PreviewContent',
  computed: {
    ...mapState({
      previewContentStudio: state => state.studios.previewContentStudio,
      user: state => state.user.user
    }),
    createPath() {
      if (this.user.payments && this.user.payments[this.previewContentStudio.bonus]) {
        return `/studios/home/${this.previewContentStudio.bonus}`
      } else {
        return `/studios/preview/${this.previewContentStudio.bonus}`
      }
    },
    dataStudio() {
      return this.$store.getters.dataStudio(this.previewContentStudio.bonus)
    }
  }
}
</script>

<style scoped />
