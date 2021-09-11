<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn
          :disabled="!dataPrice.price && !dataPrice.anteaters"
          color="#FB8C00"
          x-large
          rounded
          v-on="on"
          @click="updateData"
          >{{ labelButton }}</v-btn
        >
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ dataStudio.studioName }}</span>
        </v-card-title>
        <v-card-text v-text="`Стоимость - ${totalCost}`" />
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="localUser.firstName"
                    color="blue lighten-4"
                    label="First Name"
                    class="purple-input"
                    type="text"
                    counter
                    :rules="userDataRules"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="localUser.lastName"
                    color="blue lighten-4"
                    label="Last Name"
                    class="purple-input"
                    type="text"
                    counter
                    :rules="userDataRules"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="localUser.country"
                    color="blue lighten-4"
                    label="Country"
                    class="purple-input"
                    type="text"
                    counter
                    :rules="userDataRules"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="localUser.postalCode"
                    color="blue lighten-4"
                    class="purple-input"
                    label="Postal Code"
                    type="text"
                    counter
                    :rules="userDataRules"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="localUser.city"
                    color="blue lighten-4"
                    label="City"
                    class="purple-input"
                    type="text"
                    counter
                    :rules="userDataRules"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="localUser.address"
                    color="blue lighten-4"
                    label="Address"
                    class="purple-input"
                    type="text"
                    counter
                    :rules="userDataRules"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-card-text :class="{ 'caption font-weight-regular': $vuetify.breakpoint.xs }"
            >Для обработки платежа Вы будете перенаправлены на страницу платформы
            Stripe</v-card-text
          >
          <v-spacer />
          <v-btn :x-small="$vuetify.breakpoint.xs" color="blue darken-1" text @click="close"
            >Закрыть</v-btn
          >
          <v-btn
            :x-small="$vuetify.breakpoint.xs"
            :loading="loading"
            :disabled="!valid"
            color="#FB8C00"
            @click="payStripe"
            >Купить</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'DialogDataUser',
  props: {
    dataPrice: {
      type: Object,
      required: true
    },
    dataStudio: {
      type: Object,
      required: true
    },
    typeExercise: {
      type: String,
      required: true
    }
  },
  data: () => ({
    dialog: false,
    valid: false,
    localUser: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      country: '',
      postalCode: ''
    },
    userDataRules: [v => !!v || 'Введите данные', v => v.length <= 30 || 'Hе более 30 символов']
  }),
  computed: {
    user() {
      return this.$store.getters.user
    },
    loading() {
      return this.$store.getters.loading
    },
    totalCost() {
      if (!this.dataPrice.anteaters) {
        return `${this.dataPrice.price}€`
      } else if (!this.dataPrice.price) {
        return `${this.dataPrice.anteaters}F`
      } else {
        return `${this.dataPrice.price}€  и  ${this.dataPrice.anteaters}F`
      }
    },
    labelButton() {
      if (this.typeExercise === 'studios') {
        return 'Купить Студию'
      } else if (this.dataStudio.checkNeurographics) {
        return 'Купить Нейрографику'
      } else if (this.typeExercise === 'calendars') {
        return 'Купить Календарь'
      } else {
        return 'Купить'
      }
    }
  },
  methods: {
    updateData() {
      this.localUser.firstName = this.user.firstName || ''
      this.localUser.lastName = this.user.lastName || ''
      this.localUser.address = this.user.address || ''
      this.localUser.city = this.user.city || ''
      this.localUser.country = this.user.country || ''
      this.localUser.postalCode = this.user.postalCode || ''
    },
    payStripe() {
      if (this.user.vip) {
        this.$store
          .dispatch('changeDataUser', {
            payments: this.dataStudio.id,
            vip: true
          })
          .then(() => {
            if (this.dataStudio.id !== this.dataPrice.titleStudiosPrice) {
              this.$store.dispatch('changeDataUser', {
                payments: this.dataPrice.titleStudiosPrice,
                vip: true
              })
            }
            if (this.dataPrice.typeExercise === 'studios') {
              this.$router.push(`/studios/home/${this.dataStudio.id}`)
            } else if (this.dataPrice.typeExercise === 'studiosGroup') {
              this.$router.push(`/studios/group/${this.dataPrice.titleStudiosPrice}`)
            } else if (this.typeExercise === 'calendars') {
              this.$router.push(`/calendar/${this.dataStudio.id}`)
            } else {
              this.dialog = false
            }
          })
      } else {
        if (this.dataPrice.price) {
          this.$store.dispatch('payStripe', {
            name: `${this.dataStudio.studioName}/${this.dataStudio.id}/${this.dataPrice.typeExercise}/${this.dataPrice.titleStudiosPrice}/${this.dataPrice.anteaters}`,
            description: `${this.localUser.firstName} ${this.localUser.lastName}/${this.dataPrice.status}, ${this.totalCost}`,
            images: this.dataStudio.imageSrc,
            amount: +this.dataPrice.price * 100,
            currency: 'eur',
            quantity: 1,
            localUser: this.localUser
          })
        } else {
          this.$store
            .dispatch('changeDataUser', {
              anteaters: -this.dataPrice.anteaters,
              payments: this.dataStudio.id
            })
            .then(() => {
              if (this.dataStudio.id !== this.dataPrice.titleStudiosPrice) {
                this.$store.dispatch('changeDataUser', {
                  payments: this.dataPrice.titleStudiosPrice
                })
              }
            })
            .then(() => {
              if (this.dataPrice.typeExercise === 'studios') {
                this.$router.push(`/studios/home/${this.dataStudio.id}`)
              } else if (this.dataPrice.typeExercise === 'studiosGroup') {
                this.$router.push(`/studios/group/${this.dataPrice.titleStudiosPrice}`)
              } else if (this.typeExercise === 'calendars') {
                this.$router.push(`/calendar/${this.dataStudio.id}`)
              } else {
                this.dialog = false
              }
            })
            .then(() => {
              this.$store.dispatch('nodeMailer', {
                userName: `${this.user.firstName} ${this.user.lastName}`,
                userEmail: this.user.email,
                subject: 'Куплено за муравьеды',
                text: `${this.dataPrice.anteaters} муравьедов за ${this.dataStudio.studioName}`
              })
            })
        }
      }
      if (
        !(
          this.localUser.firstName === this.user.firstName &&
          this.localUser.lastName === this.user.lastName &&
          this.localUser.address === this.user.address &&
          this.localUser.city === this.user.city &&
          this.localUser.country === this.user.country &&
          this.localUser.postalCode === this.user.postalCode
        )
      ) {
        this.$store.dispatch('changeDataUser', this.localUser)
      }
    },
    close() {
      this.dialog = false
    }
  }
}
</script>

<style scoped />
