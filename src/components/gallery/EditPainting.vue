<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn :x-small="$vuetify.breakpoint.xs" text color="green" v-on="on">Редактировать</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title
          >Редактировать шедевр</v-card-title
        >
        <v-card-text>
          <v-text-field
            v-model="editTitleEn"
            name="editTitle"
            label="Название картины (En)"
            type="text"
          />
          <v-text-field
            v-model="editTitle"
            name="editTitle"
            label="Название картины (Ru)"
            type="text"
          />
          <v-textarea
            v-model="editDescriptionEn"
            name="editDescription"
            label="Материалы (En)"
            type="text"
            rows="1"
          />
          <v-textarea
            v-model="editDescription"
            name="editDescription"
            label="Материалы (Ru)"
            type="text"
            rows="1"
          />
          <v-textarea
            v-model="editDescription2En"
            name="description2"
            label="Описание картины (En)"
            type="text"
            rows="1"
            :rules="[e => !!e || 'Description is required']"
          />
          <v-textarea
            v-model="editDescription2"
            name="description2"
            label="Описание картины (Ru)"
            type="text"
            rows="1"
            :rules="[e => !!e || 'Description is required']"
          />
          <v-textarea
            v-model="editPriceEn"
            name="price"
            label="Цена (En)"
            type="text"
            rows="1"
            :rules="[e => !!e || 'Price is required']"
          />
          <v-textarea
            v-model="editPrice"
            name="price"
            label="Цена (Ru)"
            type="text"
            rows="1"
            :rules="[e => !!e || 'Price is required']"
          />
          <v-textarea v-model="printPrice" name="price" label="Цена Принта" type="text" rows="1" />
          <v-textarea
            v-model="videoSrc"
            type="text"
            name="videoSrc"
            label="Сылка на видео"
            rows="1"
          />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-switch v-model="editPromo" label="Поместить в карусель?" />
        </v-card-actions>
        <input-file-block
          :block-image-src="imageBlockSrc"
          @changeImageSrs="imageBlockSrcChange($event)"
          @changeBlockImage="imageBlockChange($event)"
          @deleteImageSrs="deleteBlockImageSrs($event)"
        />
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn color="primary" text @click="onCancel">Отмена</v-btn>
          <attention class="mx-2" :painting="painting" />
          <v-btn class="success" text :loading="loading" @click="onSave">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditPainting',
  components: {
    Attention: () => import('../shared/Attention'),
    InputFileBlock: () => import('@/components/shared/InputFileBlock')
  },
  props: {
    painting: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      editPromo: this.painting.promo,
      editTitle: this.painting.title,
      editTitleEn: this.painting.titleEn || '',
      editDescription: this.painting.description,
      editDescriptionEn: this.painting.descriptionEn || '',
      editDescription2: this.painting.description2,
      editDescription2En: this.painting.description2En || '',
      editPrice: this.painting.price,
      editPriceEn: this.painting.priceEn || '',
      printPrice: this.painting.printPrice || '',
      videoSrc: this.painting.videoSrc || '',
      imageBlockSrc: [],
      imageBlock: [],
      originalImageBlockSrc: []
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  created() {
    if (this.painting.imageBlockSrc) {
      this.imageBlockSrc = [...this.painting.imageBlockSrc]
      this.originalImageBlockSrc = [...this.painting.imageBlockSrc]
    }
  },
  methods: {
    onCancel() {
      this.dialog = false
      this.editPromo = this.painting.promo
      this.editTitleEn = this.painting.titleEn || ''
      this.editTitle = this.painting.title
      this.editDescriptionEn = this.painting.descriptionEn || ''
      this.editDescription = this.painting.description
      this.editDescription2En = this.painting.description2En || ''
      this.editDescription2 = this.painting.description2
      this.editPriceEn = this.painting.priceEn || ''
      this.editPrice = this.painting.price
      this.printPrice = this.painting.printPrice
      this.videoSrc = this.painting.videoSrc || ''
      this.imageBlock = []
      if (this.painting.imageBlockSrc) {
        this.imageBlockSrc = [...this.painting.imageBlockSrc]
        this.originalImageBlockSrc = [...this.painting.imageBlockSrc]
      } else {
        this.imageBlockSrc = []
        this.originalImageBlockSrc = []
      }
    },
    onSave() {
      this.$store
        .dispatch('updatePainting', {
          ...this.painting,
          promo: this.editPromo,
          titleEn: this.editTitleEn,
          title: this.editTitle,
          descriptionEn: this.editDescriptionEn,
          description: this.editDescription,
          description2En: this.editDescription2En,
          description2: this.editDescription2,
          priceEn: this.editPriceEn,
          price: this.editPrice,
          printPrice: this.printPrice,
          videoSrc: this.videoSrc,
          imageBlockSrc: this.originalImageBlockSrc,
          imageBlock: this.imageBlock
        })
        .then(() => (this.dialog = false))
    },
    imageBlockSrcChange(imageSrc) {
      this.imageBlockSrc.push(imageSrc)
    },
    imageBlockChange(image) {
      this.imageBlock.push(image)
    },
    deleteBlockImageSrs(item) {
      this.imageBlockSrc.splice(item, 1)
      if (+item >= this.originalImageBlockSrc.length) {
        this.imageBlock.splice(+item - this.originalImageBlockSrc.length, 1)
      }
      this.originalImageBlockSrc.splice(item, 1)
    }
  }
}
</script>

<style scoped />
