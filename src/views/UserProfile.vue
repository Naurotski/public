<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="4">
        <avatar-profile
          :first-name="localUser.firstName"
          :last-name="localUser.lastName"
          :about-me="localUser.aboutMe"
        />
        <anteaters-studios-profile />
        <change-email-password />
      </v-col>
      <v-col cols="12" sm="8">
        <v-card class="mt-12">
          <v-card-actions>
            <v-toolbar color="blue lighten-4" class="mt-n8 mx-2">
              <v-toolbar-title>Мой профиль</v-toolbar-title>
            </v-toolbar>
          </v-card-actions>
          <v-form ref="form" v-model="validForm">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
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
                <v-col cols="12" md="6">
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
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="localUser.phone"
                    color="blue lighten-4"
                    label="Phone"
                    class="red-input"
                    type="tel"
                    counter
                    :rules="[v => v.length <= 30 || 'Hе более 30 символов']"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="localUser.birthdayDate"
                        color="blue lighten-4"
                        label="Birthday date"
                        prepend-icon="mdi-calendar-multiple"
                        class="purple-input"
                        type="text"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="localUser.birthdayDate"
                      color="blue lighten-4"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="save"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12">
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
                <v-col cols="12" md="4">
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
                <v-col cols="12" md="4">
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
                <v-col cols="12" md="4">
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
                <v-col cols="12">
                  <v-textarea
                    v-model="localUser.aboutMe"
                    class="purple-input"
                    color="blue lighten-4"
                    label="About Me"
                    type="text"
                    rows="2"
                    counter
                    :rules="[v => v.length <= 200 || 'Hе более 200 символов']"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-card-actions>
            <v-spacer />
            <v-btn
              :loading="loading"
              :disabled="!valid"
              color="blue lighten-4"
              @click="updateProfile"
            >
              Обновить профиль
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserProfile',
  metaInfo: {
    title: 'Мой профиль'
  },
  components: {
    AvatarProfile: () => import('../components/Auth/AvatarProfile'),
    AnteatersStudiosProfile: () => import('../components/Auth/AnteatersStudiosProfile'),
    ChangeEmailPassword: () => import('../components/Auth/ChangeEmailPassword')
  },
  data: () => ({
    localUser: {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      aboutMe: '',
      birthdayDate: ''
    },
    menu: false,
    validForm: false,
    userDataRules: [v => !!v || 'Введите данные', v => v.length <= 30 || 'Hе более 30 символов']
  }),
  computed: {
    ...mapState({
      user: state => state.user.user,
      loading: state => state.shared.loading
    }),
    compareLists() {
      return (
        this.localUser.firstName === this.user.firstName &&
        this.localUser.lastName === this.user.lastName &&
        this.localUser.phone === this.user.phone &&
        this.localUser.address === this.user.address &&
        this.localUser.city === this.user.city &&
        this.localUser.country === this.user.country &&
        this.localUser.postalCode === this.user.postalCode &&
        this.localUser.aboutMe === this.user.aboutMe &&
        this.localUser.birthdayDate === this.user.birthdayDate
      )
    },
    valid() {
      return this.validForm && !this.compareLists
    }
  },
  watch: {
    user: {
      deep: true,
      handler() {
        this.localUser.firstName = this.user.firstName || ''
        this.localUser.lastName = this.user.lastName || ''
        this.localUser.phone = this.user.phone || ''
        this.localUser.address = this.user.address || ''
        this.localUser.city = this.user.city || ''
        this.localUser.country = this.user.country || ''
        this.localUser.postalCode = this.user.postalCode || ''
        this.localUser.aboutMe = this.user.aboutMe || ''
        this.localUser.birthdayDate = this.user.birthdayDate || ''
      }
    },
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  created() {
    this.localUser.firstName = this.user.firstName || ''
    this.localUser.lastName = this.user.lastName || ''
    this.localUser.phone = this.user.phone || ''
    this.localUser.address = this.user.address || ''
    this.localUser.city = this.user.city || ''
    this.localUser.country = this.user.country || ''
    this.localUser.postalCode = this.user.postalCode || ''
    this.localUser.aboutMe = this.user.aboutMe || ''
    this.localUser.birthdayDate = this.user.birthdayDate || ''
  },
  methods: {
    updateProfile() {
      if (!this.compareLists) {
        this.$store.dispatch('changeDataUser', this.localUser)
      }
    },
    save(date) {
      this.$refs.menu.save(date)
    }
  }
}
</script>

<style scoped lang="stylus" />
