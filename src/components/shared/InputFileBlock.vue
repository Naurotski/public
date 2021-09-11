<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <v-card class=" elevation-0">
          <input
            ref="image"
            type="file"
            accept="image/*"
            style="display: none"
            @change="uploadFile"
          />
          <v-row>
            <v-col v-for="(item, index) in blockImageSrc" :key="index" cols="12" md="3">
              <v-card-actions>
                <v-card>
                  <v-img max-height="150" :src="item" contain>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn class="mt-n2 mr-n2" text icon color="red" @click="deleteImage(index)"
                        ><v-icon>mdi-close</v-icon></v-btn
                      >
                    </v-card-actions>
                  </v-img>
                </v-card>
              </v-card-actions>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn :loading="loading" class="warning" @click="inputFile"
                ><slot>Выбрать Фото для блока</slot><v-icon right dark>mdi-cloud-upload</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'InputFileBlock',
  props: {
    blockImageSrc: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    image: ''
  }),
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    inputFile() {
      this.$refs.image.click()
    },
    uploadFile() {
      const typeFile = [
        'image/tiff',
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/x-icon',
        'image/svg+xml',
        'image/webp'
      ]
      this.image = this.$refs.image.files[0]
      if (this.image.size > 1000000) {
        this.$store.commit('setError', 'Размер файла не должен превышать 1000КБ')
        setTimeout(() => this.$store.commit('clearError'), 5000)
      } else if (!typeFile.includes(this.image.type)) {
        this.$store.commit('setError', 'Неверный тип файла')
        setTimeout(() => this.$store.commit('clearError'), 5000)
      } else {
        this.$emit('changeBlockImage', this.image)
        const reader = new FileReader()
        reader.onload = () => {
          this.$emit('changeImageSrs', reader.result)
        }
        reader.readAsDataURL(this.image)
      }
    },
    deleteImage(index) {
      this.$emit('deleteImageSrs', index)
    }
  }
}
</script>

<style scoped />
