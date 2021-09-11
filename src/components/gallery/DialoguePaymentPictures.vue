<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <template v-slot:activator="{ on }">
      <slot :on="on" name="button"
        ><v-btn :x-small="$vuetify.breakpoint.xs" text color="red" v-on="on">{{
          $t('shared.buy')
        }}</v-btn></slot
      >
    </template>
    <v-card>
      <v-card-title>
        <span style="word-break: normal" class="headline">{{ painting.title }}</span>
      </v-card-title>
      <slot name="text">
        <v-card-text
          >{{ $t('gallery.priceOriginal') }} - {{ painting.price }} <br />{{
            $t('gallery.textDelivery')
          }}
          <br />{{ $t('gallery.textDelivery1') }}</v-card-text
        ></slot
      >
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
                  v-model="localUser.email"
                  color="blue lighten-4"
                  label="Email"
                  class="purple-input"
                  type="email"
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
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="localUser.phone"
                  color="blue lighten-4"
                  label="Phone"
                  class="purple-input"
                  type="tel"
                  counter
                  :rules="userDataRules"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-card-text :class="{ 'caption font-weight-regular': $vuetify.breakpoint.xs }">{{
          $t('gallery.textStripe')
        }}</v-card-text>
        <v-spacer />
        <v-btn
          :x-small="$vuetify.breakpoint.xs"
          color="blue darken-1"
          text
          @click="dialog = false"
          >{{ $t('shared.close') }}</v-btn
        >
        <v-btn
          :x-small="$vuetify.breakpoint.xs"
          :loading="loading"
          :disabled="!valid"
          color="#FB8C00"
          @click="payStripe"
          >{{ $t('shared.buy') }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialoguePaymentPictures',
  props: {
    painting: {
      type: Object,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    goods: {
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
      email: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      phone: ''
    },
    userDataRules: [v => !!v || 'Введите данные', v => v.length <= 30 || 'Hе более 30 символов']
  }),
  computed: {
    user() {
      return this.$store.getters.user
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  created() {
    if (this.user) {
      this.localUser.firstName = this.user.firstName || ''
      this.localUser.lastName = this.user.lastName || ''
      this.localUser.email = this.user.email || ''
      this.localUser.address = this.user.address || ''
      this.localUser.city = this.user.city || ''
      this.localUser.country = this.user.country || ''
      this.localUser.postalCode = this.user.postalCode || ''
    }
  },
  methods: {
    payStripe() {
      this.$store.dispatch('payStripePictures', {
        name: `${this.painting.title}/${this.goods}/${this.painting.id}/${this.price}`,
        description: `${this.localUser.firstName} ${this.localUser.lastName}/${this.localUser.address}/${this.localUser.city}/${this.localUser.country}/${this.localUser.postalCode}/${this.localUser.phone}`,
        email: this.localUser.email,
        images: this.painting.imageSrc,
        amount: this.price.split(' ')[1] * 100,
        currency: 'eur',
        quantity: 1,
        dataUser: this.localUser
      })
    }
  }
}
</script>

<style scoped></style>
