<template>
  <v-container v-if="artTherapy" fluid>
    <transition appear name="fadeGroup">
      <v-row justify="space-around" align="center" class="flex-column">
        <v-col cols="12" md="10">
          <v-card color="#FFF3E0">
            <v-card-title
              style="word-break: normal"
              class="Underdog"
              v-text="artTherapy.studioName"
            />
            <v-card-text
              style="white-space: pre-line"
              class=" Underdog text-justify"
              v-text="artTherapy.text"
            />
            <v-card-actions>
              <v-btn
                :x-small="$vuetify.breakpoint.xs"
                text
                color="#90CAF9"
                :to="`/separateVideosList`"
              >
                <v-icon :x-small="$vuetify.breakpoint.xs" right>mdi-arrow-left</v-icon
                >Вернуться</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col v-if="overlay" md="10">
          <v-card :loading="loading">
            <v-card-text
              style="color: #FB8C00"
              :class="{ 'body-2': $vuetify.breakpoint.xs }"
              class="subtitle-1 text-center"
            >
              Стоимость видео-урока -
              {{ price }}
              <br />
              Некоторые продукты вы можете приобрести при помощи внутренней валюты (F).
              <dialog-cmp />
              Покупая продукт, вы соглашаетесь с <dialog-offer-agreement />
            </v-card-text>
          </v-card>
        </v-col>

        <dialog-data-user
          v-if="overlay"
          class="my-8 "
          :data-price="dataPrice"
          :data-studio="dataArtTherapy"
          type-exercise="artTherapy"
        />
        <v-card-text
          v-if="differenceAnteaters"
          style="color: darkred; white-space: pre-line"
          class="text-center"
          >У Вас не хватает муравьедов</v-card-text
        >
        <v-card-text
          v-if="!user.id"
          style="color: darkred; white-space: pre-line"
          class="text-center"
        >
          <router-link to="/login" tag="span" class="cursorPointer"
            >Чтобы приобрести видео, вам необходимо зарегистрироваться. При регистрации вы получаете
            в подарок 10F(муравьедов) <br />
            После оплаты ссылка на видео будет также доступна в вашем личном кабинете</router-link
          ></v-card-text
        >
        <v-col cols="12" md="10">
          <v-card :min-height="$vuetify.breakpoint.xs ? 200 : 550">
            <v-card-actions>
              <iframe
                v-if="!overlay"
                :src="artTherapy.artTherapyVideoSrc"
                width="100%"
                :height="$vuetify.breakpoint.xs ? 200 : 550"
                style="border: none"
                allow="accelerometer; fullscreen; autoplay; encrypted-media; gyroscope; picture-in-picture"
              />
            </v-card-actions>
            <v-overlay absolute :value="overlay">
              <v-card-text
                style="color: white"
                class="text-center display-3 font-weight-bold"
                :class="{ 'headline font-weight-bold': $vuetify.breakpoint.xs }"
                >Видео</v-card-text
              >
              <v-divider class="white" light />
              <v-card-text
                style="color: white; white-space: pre-line"
                :class="{ 'body-2': $vuetify.breakpoint.xs }"
                class="headline text-center"
                >Будет доступно после оплаты</v-card-text
              >
            </v-overlay>
          </v-card>
        </v-col>
      </v-row>
    </transition>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ArtTherapyDescription',
  metaInfo() {
    if (this.artTherapy) {
      return {
        title: `Нейрографика | Алгоритм ${this.artTherapy.studioName}`,
        titleTemplate: null,
        meta: [
          {
            vmid: 'description',
            name: 'description',
            content: `${this.artTherapy.shortDescription}`
          }
        ]
      }
    }
  },
  components: {
    DialogDataUser: () => import('@/components/shared/DialogDataUser'),
    DialogCmp: () => import('@/components/shared/DialogCmp'),
    DialogOfferAgreement: () => import('@/components/shared/DialogOfferAgreement')
  },
  props: {
    artTherapyTitle: {
      type: String,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    ...mapState({
      loading: state => state.shared.loading,
      user: state => state.user.user
    }),
    artTherapy() {
      return this.$store.getters.artTherapy(this.artTherapyTitle)
    },
    overlay() {
      if (!this.artTherapy.pay) {
        return false
      } else if (this.user.payments) {
        return !this.user.payments[this.artTherapy.id]
      } else {
        return true
      }
    },
    differenceAnteaters() {
      if (!this.user.id || (this.user.payments && this.user.payments[this.artTherapy.id])) {
        return false
      } else {
        return +this.artTherapy.anteaters > this.user.anteaters
      }
    },
    price() {
      if (this.artTherapy.price) {
        return `${this.artTherapy.price}€`
      } else {
        return `${this.artTherapy.anteaters}F`
      }
    },
    dataPrice() {
      if (this.differenceAnteaters || !this.user.id) {
        return {
          price: '',
          anteaters: ''
        }
      } else {
        return {
          price: this.artTherapy.price,
          anteaters: this.artTherapy.anteaters,
          titleStudiosPrice: this.artTherapy.id,
          typeExercise: 'artTherapy',
          status: 'video'
        }
      }
    },
    dataArtTherapy() {
      return {
        id: this.artTherapy.id,
        studioName: this.artTherapy.studioName,
        imageSrc: this.artTherapy.imageSrc
      }
    }
  },
  watch: {
    user: {
      deep: true,
      handler() {
        if (
          this.user.id &&
          this.artTherapy &&
          !this.artTherapy.artNeurographics &&
          this.user.payments &&
          this.user.payments[this.artTherapy.id] &&
          (!this.user.artTherapy || !this.user.artTherapy.includes(this.artTherapy.studioName))
        ) {
          this.$store.dispatch('changeDataUser', {
            artTherapy: this.artTherapy.studioName
          })
        } else if (
          this.user.id &&
          this.artTherapy &&
          this.artTherapy.artNeurographics &&
          this.user.payments &&
          this.user.payments[this.artTherapy.id] &&
          (!this.user.neurographics ||
            !this.user.neurographics.includes(this.artTherapy.studioName))
        ) {
          this.$store.dispatch('changeDataUser', { neurographics: this.artTherapy.studioName })
        }
      }
    }
  },
  created() {
    if (!this.artTherapy) {
      this.$store.dispatch('getArtTherapy')
    }
    if (
      this.user.id &&
      this.artTherapy &&
      !this.artTherapy.artNeurographics &&
      this.user.payments &&
      this.user.payments[this.artTherapy.id] &&
      (!this.user.artTherapy || !this.user.artTherapy.includes(this.artTherapy.studioName))
    ) {
      this.$store.dispatch('changeDataUser', { artTherapy: this.artTherapy.studioName })
    } else if (
      this.user.id &&
      this.artTherapy &&
      this.artTherapy.artNeurographics &&
      this.user.payments &&
      this.user.payments[this.artTherapy.id] &&
      (!this.user.neurographics || !this.user.neurographics.includes(this.artTherapy.studioName))
    ) {
      this.$store.dispatch('changeDataUser', { neurographics: this.artTherapy.studioName })
    }
  }
}
</script>

<style scoped lang="stylus">
.fadeGroup-enter-active, .fadeGroup-leave-active {
  transition: opacity 2s;
}
.fadeGroup-enter, .fadeGroup-leave-to {
  opacity: 0;
}
</style>
