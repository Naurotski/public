<template>
  <div>
    <drawer-right :drawer-right="drawerRight" />
    <v-container v-if="rubricsFilter.rubric !== 'photo'" fluid>
      <v-row justify="center">
        <v-col cols="8" md="10">
          <v-card :loading="loading">
            <v-card-text
              class="text-center display-1 font-weight-bold"
              :class="{ 'headline font-weight-bold': $vuetify.breakpoint.xs }"
              style="color: #FB8C00"
              >{{ $t(`gallery.${rubric}`) }}</v-card-text
            >
          </v-card>
        </v-col>
        <v-col class="mt-4" cols="4" md="1">
          <language-selection />
        </v-col>
      </v-row>
      <div align="center" class="mt-2 d-md-none" style="background-color: #9E9E9E">
        <v-btn text dark @click="drawerRight = !drawerRight">{{
          $t('gallery.changeRubric')
        }}</v-btn>
      </div>
      <transition-group class="row align-center justify-center" appear name="fadeGroup">
        <v-col
          v-for="painting in paintingsFilter"
          :key="painting.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card flat class="mx-auto" color="#ECEFF1">
            <router-link :to="`/painting/${painting.id}`">
              <v-img contain class="cursorPointer" :src="painting.imageSrc" />
            </router-link>
            <v-card-title style="word-break: normal" v-text="painting.title" />
            <v-card-text>
              <span class="text--primary" v-text="painting.description" />
            </v-card-text>
            <v-card-text class="mt-n6">
              <span class="text--primary" v-text="painting.description2" />
            </v-card-text>
            <v-card-actions class="mt-n6">
              <v-card-text>
                <h4 class="text--primary" v-text="painting.price" />
              </v-card-text>
              <v-spacer />
              <dialogue-payment-pictures
                v-if="painting.price.split(' ')[0] === '€'"
                :painting="painting"
                :price="painting.price"
                :goods="`pictures`"
              />
            </v-card-actions>
            <dialogue-payment-pictures
              v-if="painting.printPrice"
              :painting="painting"
              :price="`€ ${painting.printPrice}`"
              :goods="`print`"
            >
              <template v-slot:button="{ on }">
                <v-card-text style="color: orange" class="cursorPointer mt-n6 " v-on="on">
                  {{ $t('gallery.buyPrint') }} €{{ painting.printPrice }}
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
          </v-card>
        </v-col>
      </transition-group>
      <div align="center" class="mt-2 d-md-none" style="background-color: #9E9E9E">
        <v-btn text dark @click="drawerRight = !drawerRight">{{
          $t('gallery.changeRubric')
        }}</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'GalleryRubrics',
  metaInfo() {
    if (this.rubricsFilter) {
      return {
        title: `Купить картину Надежды Навроцкой | ${this.rubricsFilter.title}`,
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
    DrawerRight: () => import('../../components/shared/DrawerRight'),
    DialoguePaymentPictures: () => import('../../components/gallery/DialoguePaymentPictures'),
    LanguageSelection: () => import('../../components/shared/LanguageSelection')
  },
  props: {
    rubric: {
      type: String,
      required: true
    }
  },
  data: () => ({
    drawerRight: null
  }),
  computed: {
    admin() {
      return this.$store.getters.admin
    },
    paintingsFilter() {
      return this.$store.getters.paintingsFilter(this.rubric, this.i18n)
    },
    rubricsFilter() {
      return this.$store.getters.rubricsFilter(this.rubric)
    },
    loading() {
      return this.$store.getters.loading
    },
    i18n() {
      return this.$i18n.locale
    }
  },
  created() {
    if (!this.paintingsFilter.length) {
      this.$store.dispatch('fetchPaintings')
    }
  },
  methods: {
    getPainting(id) {
      this.$router.push(`/painting/${id}`)
    }
  }
}
</script>

<style scoped lang="stylus">
.fadeGroup-enter-active{
  transition: opacity 2s;
}
.fadeGroup-leave-active {
  transition: opacity .5s;
}
.fadeGroup-enter, .fadeGroup-leave-to {
  opacity: 0;
}
</style>
