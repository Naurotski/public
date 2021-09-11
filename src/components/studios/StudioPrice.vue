<template>
  <v-container v-if="dataStudio" fluid>
    <v-row justify="center">
      <v-col sm="11">
        <v-card :loading="loading">
          <v-card-text
            style="color: #FB8C00"
            :class="{ 'body-2': $vuetify.breakpoint.xs }"
            class="headline text-center"
          >
            Выберите любой из следующих планов, чтобы начать. <br />
            Некоторые продукты вы можете приобрести при помощи внутренней валюты (F).
            <dialog-cmp />
            Покупая продукт, вы соглашаетесь с <dialog-offer-agreement />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-item-group>
      <v-container v-if="user || dataPriceStudio">
        <v-row justify="space-around">
          <template v-for="(item, index) in dataPriceStudio">
            <v-col v-if="switchPrise(item)" :key="index" cols="12" sm="6" md="3">
              <v-item v-slot:default="{ active, toggle }">
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    class="d-block align-center justify-center"
                    :elevation="hover ? 20 : 3"
                    :color="active ? 'primary' : '#FB8C00'"
                    dark
                    :min-height="$vuetify.breakpoint.xs ? 310 : 450"
                    @click="getPrice(toggle, active, item)"
                  >
                    <v-card-text
                      class="text-center headline font-weight-bold"
                      :class="{ 'title font-weight-bold': $vuetify.breakpoint.xs }"
                      style="color: white"
                      v-text="dataStudio.studioName"
                    />
                    <v-card-text
                      :class="{ 'body-2': $vuetify.breakpoint.xs }"
                      class="headline text-center "
                      v-text="item.status"
                    />
                    <v-card-text
                      :class="{ 'body-2': $vuetify.breakpoint.xs }"
                      class="headline text-center font-italic"
                      v-text="item.anteaters ? 'Стоимость в муравьедах' : 'Стоимость'"
                    />
                    <v-card-text
                      class="display-2 font-weight-bold text-center"
                      :class="{ 'headline font-weight-bold': $vuetify.breakpoint.xs }"
                      style="color: white"
                      v-text="
                        item.price && item.anteaters
                          ? `${item.price}€ + ${item.anteaters}F`
                          : '' ||
                            (item.price
                              ? `${item.price}€`
                              : '' || item.anteaters
                              ? `${item.anteaters}F`
                              : '')
                      "
                    />
                    <v-scroll-y-transition>
                      <div v-if="active" class="flex-grow-1 text-center">
                        <v-icon style="color: white">mdi-check-bold mdi-48px</v-icon>
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-hover>
              </v-item>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-item-group>
    <dialog-data-user
      class="my-8"
      :data-price="dataPrice"
      :data-studio="dataStudio"
      :type-exercise="typeExercise"
    />
    <v-row justify="center">
      <v-col sm="11">
        <v-card>
          <v-card-text
            style="color: #FB8C00"
            :class="{ 'body-2': $vuetify.breakpoint.xs }"
            class="headline text-center"
          >
            Количество собранных муравьедов за полное прохождение:
            {{ dataStudio.numberAnteaters }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'StudioPrice',
  components: {
    DialogDataUser: () => import('../shared/DialogDataUser'),
    DialogCmp: () => import('../shared/DialogCmp'),
    DialogOfferAgreement: () => import('../shared/DialogOfferAgreement')
  },
  props: {
    titleStudios: {
      type: String,
      required: true
    },
    typeExercise: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dataPrice: {
        price: '',
        anteaters: '',
        status: '',
        typeExercise: '',
        titleStudiosPrice: ''
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    dataStudio() {
      if (this.typeExercise === 'studios') {
        return this.$store.getters.dataStudio(this.titleStudios)
      } else {
        return this.$store.getters.dataCalendar(this.titleStudios)
      }
    },
    dataPriceStudio() {
      return this.$store.getters.dataPriceStudio
    },
    loading() {
      return this.$store.getters.loading
    },
    listUsersDiscount() {
      return this.$store.getters.keysListUsersFilter
    },
    discount() {
      return this.listUsersDiscount.some(id => id === this.user.id)
    }
  },
  watch: {
    titleStudios: {
      deep: true,
      handler() {
        this.$store
          .dispatch('getPriceStudios', {
            typeExercise: this.typeExercise,
            titleStudios: this.titleStudios
          })
          .then(() => {
            this.dataPriceStudio.forEach(price => {
              if (price.titleDiscount) {
                this.$store.dispatch('getUsersFilter', { titleStudio: price.titleDiscount })
              }
            })
          })
      }
    }
  },
  created() {
    this.$store
      .dispatch('getPriceStudios', {
        typeExercise: this.typeExercise,
        titleStudios: this.titleStudios
      })
      .then(() => {
        this.dataPriceStudio.forEach(price => {
          if (price.titleDiscount) {
            this.$store.dispatch('getUsersFilter', { titleStudio: price.titleDiscount })
          }
        })
      })
  },
  methods: {
    getPrice(toggle, active, dataPrice) {
      if (!this.user.id) {
        this.$store.commit(
          'setError',
          'Вам необходимо зарегистрироваться. При регистрации вы получаете в подарок  10F(муравьедов)'
        )
      } else {
        toggle()
        if (!active) {
          if (dataPrice.anteaters) {
            if (+dataPrice.anteaters > this.user.anteaters) {
              this.$store.commit('setError', 'У Вас не хватает муравьедов')
              toggle()
              this.dataPrice.price = ''
              this.dataPrice.anteaters = ''
              this.dataPrice.status = ''
              this.dataPrice.typeExercise = ''
              this.dataPrice.titleStudiosPrice = ''
            } else {
              this.dataPrice.anteaters = dataPrice.anteaters
              this.dataPrice.price = dataPrice.price || ''
              this.dataPrice.status = dataPrice.status
              if (dataPrice.typeGroup === 'group') {
                this.dataPrice.typeExercise = 'studiosGroup'
                this.dataPrice.titleStudiosPrice = dataPrice.titleStudiosPrice
              } else {
                this.dataPrice.typeExercise = this.typeExercise
                this.dataPrice.titleStudiosPrice = this.titleStudios
              }
            }
          } else {
            this.dataPrice.price = dataPrice.price || ''
            this.dataPrice.anteaters = ''
            this.dataPrice.status = dataPrice.status
            if (dataPrice.typeGroup === 'group') {
              this.dataPrice.typeExercise = 'studiosGroup'
              this.dataPrice.titleStudiosPrice = dataPrice.titleStudiosPrice
            } else {
              this.dataPrice.typeExercise = this.typeExercise
              this.dataPrice.titleStudiosPrice = this.titleStudios
            }
          }
        } else {
          this.dataPrice.price = ''
          this.dataPrice.anteaters = ''
          this.dataPrice.status = ''
          this.dataPrice.typeExercise = ''
          this.dataPrice.titleStudiosPrice = ''
        }
      }
      setTimeout(() => this.$store.commit('clearError'), 5000)
    },
    switchPrise(item) {
      return (
        (!item.titleDiscount || this.discount) &&
        (!item.checkClub || (this.user.club && this.user.club.creationTime))
      )
    }
  }
}
</script>

<style scoped />
