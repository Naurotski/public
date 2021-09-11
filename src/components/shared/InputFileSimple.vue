<template>
  <div>
    <input ref="image" type="file" accept="image/*" style="display: none" @change="uploadFile" />
    <v-btn elevation="0" text x-small fab @click="inputFile"
      ><v-icon dark>mdi-camera-plus-outline</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'InputFileSimple',
  data: () => ({
    image: null,
    imageSrc: ''
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
          this.imageSrc = reader.result
          this.$emit('changeImageSrs', reader.result)
        }
        reader.readAsDataURL(this.image)
      }
    }
  }
}
</script>

<style scoped />
