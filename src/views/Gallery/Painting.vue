<template>
  <v-container fluid>
    <drawer-right :drawer-right="drawerRight" />
    <progress-circular v-if="loading" />
    <v-container v-else fluid>
      <div align="center" class="mt-2 d-md-none" style="background-color: #9E9E9E">
        <v-btn text dark @click="drawerRight = !drawerRight">{{
          $t('gallery.changeRubric')
        }}</v-btn>
      </div>
      <v-row>
        <v-col>
          <v-card v-if="localePainting">
            <v-card-actions>
              <v-img :src="localePainting.imageSrc" />
            </v-card-actions>
            <v-card-title style="word-break: normal" v-text="localePainting.title" />
            <v-card-text>
              <p v-text="localePainting.description" />
              <p v-text="localePainting.description2" />
            </v-card-text>
            <v-card-actions class="mt-n10">
              <v-card-text>
                <h3 v-text="localePainting.price" />
              </v-card-text>
              <dialogue-payment-pictures
                v-if="presencePrice"
                :painting="localePainting"
                :price="localePainting.price"
                :goods="`pictures`"
              />
            </v-card-actions>
            <dialogue-payment-pictures
              v-if="localePainting.printPrice"
              :painting="localePainting"
              :price="`€ ${localePainting.printPrice}`"
              :goods="`print`"
            >
              <template v-slot:button="{ on }">
                <v-card-text class="cursorPointer mt-n6 " v-on="on">
                  <span style="color: orange"
                    >{{ $t('gallery.buyPrint') }} €{{ localePainting.printPrice }}</span
                  >
                </v-card-text>
              </template>
              <template v-slot:text>
                <v-card-text>
                  <span style="color: orange"
                    >{{ $t('gallery.print') }} €{{ painting.printPrice }}</span
                  >
                  <br />{{ $t('gallery.textDelivery') }}
                </v-card-text>
              </template>
            </dialogue-payment-pictures>
            <v-card-actions>
              <v-btn
                :x-small="$vuetify.breakpoint.xs"
                text
                color="#90CAF9"
                :to="`/gallery/${localePainting.rubric}`"
              >
                <v-icon :x-small="$vuetify.breakpoint.xs" right>mdi-arrow-left</v-icon
                >{{ $t('shared.back') }}</v-btn
              >
              <v-spacer />
              <edit-painting v-if="admin" :painting="painting" />
            </v-card-actions>
            <v-card-actions>
              <iframe
                v-if="painting.videoSrc"
                ref="iframeVideo"
                :src="painting.videoSrc"
                width="100%"
                height="550"
                style="border: none"
                allow="accelerometer; fullscreen; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </v-card-actions>
            <v-card-actions v-for="(image, index) in localePainting.imageBlockSrc" :key="index">
              <v-img :src="image" />
            </v-card-actions>

            <v-card-actions>
              <v-btn
                v-if="localePainting.imageBlockSrc.length"
                :x-small="$vuetify.breakpoint.xs"
                text
                color="#90CAF9"
                :to="`/gallery/${localePainting.rubric}`"
              >
                <v-icon :x-small="$vuetify.breakpoint.xs" right>mdi-arrow-left</v-icon
                >{{ $t('shared.back') }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div align="center" class="mt-2 d-md-none" style="background-color: #9E9E9E">
        <v-btn text dark @click="drawerRight = !drawerRight">{{
          $t('gallery.changeRubric')
        }}</v-btn>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Painting',
  metaInfo() {
    if (this.painting) {
      return {
        title: `Купить картину Надежды Навроцкой ${this.painting.title}`,
        titleTemplate: null,
        meta: [
          {
            vmid: 'description',
            name: 'description',
            content:
              'В галерее вы можете найти и приобрести графические и живописные работы Надежды Навроцкой. Художник, фотограф, психолог и арт-терапевт, автор проекта «Metamorfosi». '
          }
        ]
      }
    }
  },
  components: {
    ProgressCircular: () => import('../../components/shared/ProgressCircular'),
    EditPainting: () => import('../../components/gallery/EditPainting'),
    DrawerRight: () => import('../../components/shared/DrawerRight'),
    DialoguePaymentPictures: () => import('../../components/gallery/DialoguePaymentPictures')
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    drawerRight: null,
    localePainting: null
  }),
  computed: {
    ...mapState({
      loading: state => state.shared.loading,
      admin: state => state.user.admin
    }),
    painting() {
      return this.$store.getters.selectPainting(this.id)
    },
    presencePrice() {
      return this.localePainting.price.split(' ')[0] === '€'
    },
    i18n() {
      return this.$i18n.locale
    }
  },
  watch: {
    painting: {
      deep: true,
      handler() {
        if (this.i18n === 'en') {
          this.localePainting = {
            title: this.painting.titleEn || '',
            description: this.painting.descriptionEn || '',
            description2: this.painting.description2En || '',
            price: this.painting.priceEn || '',
            printPrice: this.painting.printPrice || '',
            promo: this.painting.promo,
            rubric: this.painting.rubric,
            imageSrc: this.painting.imageSrc,
            id: this.painting.id
          }
        } else {
          this.localePainting = {
            title: this.painting.title,
            description: this.painting.description,
            description2: this.painting.description2,
            price: this.painting.price,
            printPrice: this.painting.printPrice || '',
            promo: this.painting.promo,
            rubric: this.painting.rubric,
            imageSrc: this.painting.imageSrc,
            id: this.painting.id
          }
        }
        if (this.painting.imageBlockSrc) {
          this.localePainting.imageBlockSrc = [...this.painting.imageBlockSrc]
        } else {
          this.localePainting.imageBlockSrc = []
        }
      }
    }
  },
  created() {
    if (!this.painting) {
      this.$store.dispatch('fetchPaintings')
    } else {
      if (this.i18n === 'en') {
        this.localePainting = {
          title: this.painting.titleEn || '',
          description: this.painting.descriptionEn || '',
          description2: this.painting.description2En || '',
          price: this.painting.priceEn || '',
          printPrice: this.painting.printPrice || '',
          promo: this.painting.promo,
          rubric: this.painting.rubric,
          imageSrc: this.painting.imageSrc,
          id: this.painting.id
        }
      } else {
        this.localePainting = {
          title: this.painting.title,
          description: this.painting.description,
          description2: this.painting.description2,
          price: this.painting.price,
          printPrice: this.painting.printPrice || '',
          promo: this.painting.promo,
          rubric: this.painting.rubric,
          imageSrc: this.painting.imageSrc,
          id: this.painting.id
        }
      }
      if (this.painting.imageBlockSrc) {
        this.localePainting.imageBlockSrc = [...this.painting.imageBlockSrc]
      } else {
        this.localePainting.imageBlockSrc = []
      }
    }
  }
}
</script>

<style scoped />
