<template>
  <v-card-actions>
    <v-row justify="start">
      <v-col cols="4">
        <input
          ref="image"
          type="file"
          accept="image/*"
          style="display: none"
          @change="uploadFile"
        />
        <v-img :src="imageSrc" max-height="200" max-width="200" contain />
      </v-col>
      <v-col class="align-self-end" color="red">
        <v-btn class="ma-2 warning" @click="inputFile"
          ><slot>Выбрать Фото</slot><v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card-actions>
</template>

<script>
export default {
  name: 'InputFile',
  props: {
    imageSrc: {
      type: String,
      required: true
    }
  },
  data: () => ({
    image: null
  }),
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
        this.$emit('changeImage', this.image)
        const reader = new FileReader()
        reader.onload = () => {
          this.$emit('changeImageSrs', reader.result)
        }
        reader.readAsDataURL(this.image)
      }
    }
  }
}
</script>

<style scoped />
