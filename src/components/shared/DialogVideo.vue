<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="800px">
      <template v-slot:activator="{ on }">
        <v-btn rounded color="#FB8C00" v-on="on">
          Приветственное видео
        </v-btn>
      </template>
      <v-card>
        <slot name="video">
          <v-card-actions>
            <iframe
              ref="iframeVideo"
              :src="iframeSrc"
              width="100%"
              :height="$vuetify.breakpoint.xs ? 200 : 500"
              style="border: none"
              allow="accelerometer; fullscreen; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </v-card-actions>
        </slot>
        <v-card-actions>
          <v-spacer />
          <v-btn color="#FB8C00" text @click="closeDialog">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'DialogVideo',
  data: () => ({
    dialog: false,
    iframeSrc: 'https://player.vimeo.com/video/535307712'
  }),
  methods: {
    closeDialog() {
      this.dialog = false
      this.iframeSrc = ''
      setTimeout(() => (this.iframeSrc = 'https://player.vimeo.com/video/535307712'), 100)
    }
  }
}
</script>

<style scoped></style>
