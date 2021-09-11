<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list-item-group>
        <v-list-item v-for="link in links" :key="link.title" exact :to="link.url">
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isLoggedIn" to="/userProfile">
          <v-list-item-action>
            <v-icon>mdi-account-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Профиль</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isLoggedIn" @click="onLogout">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Выход</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>

    <v-app-bar app clipped-right color="blue lighten-5" height="80">
      <v-app-bar-nav-icon class="d-md-none" @click.stop="drawer = !drawer" />
      <v-hover v-slot:default="{ hover }">
        <v-toolbar-items>
          <router-link to="/">
            <v-img
              :class="{ 'show-logo': hover }"
              contain
              :src="srcLogotype"
              max-height="100%"
              max-width="100"
            />
          </router-link>
        </v-toolbar-items>
      </v-hover>
      <v-toolbar-title id="totalBarTitle" class="d-none d-lg-flex">
        <router-link to="/" tag="span" class="cursorPointer display-2 font-weight-thin "
          >MetaMorfosi</router-link
        >
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="d-none d-md-flex">
        <v-btn v-for="link in links" :key="link.title" exact text :to="link.url"
          ><v-icon left>{{ link.icon }}</v-icon
          >{{ link.title }}</v-btn
        >
        <bar-settings-menu v-if="isLoggedIn && admin" />
      </v-toolbar-items>

      <bar-messages-menu v-if="isLoggedIn" />
      <bar-user-menu v-if="isLoggedIn" class="Underdog" />
    </v-app-bar>

    <v-main style="padding-top: 80px">
      <router-view />
      <subscription-form />
      <floating-button />
      <snackbar-messaging />
      <snackbar v-if="error" />
      <snackbar-service-worker />
    </v-main>

    <v-footer dark color="grey">
      <dialog-offer-agreement>
        <span style="color: white">договор оферты</span>
      </dialog-offer-agreement>
      <dialog-privacy-policy>
        <span style="color: white">Политика конфиденциальности</span>
      </dialog-privacy-policy>
      <v-row>
        <v-col class="text-center">
          <v-btn
            href="https://l.facebook.com/l.php?u=https%3A%2F%2Finstagram.com%2Fmetamorfosi_art_game%3Ffbclid%3DIwAR07nqxsiWKJZq2ci0kHvHiCwQG6XYXoD6BW7LQoK9bSH38mtybIXakvIKU&h=AT1bqA5OY4UIKFbpQe-lRTVF3mj2zEb2S3OrUPFBUvKI6pwRgzbNOA2OtMQYLZhayuPP4-2oD0he2p4NJctI6bznUXMPlNb1EWijF-aA67vZY0X80wY3MMt0eEwaKGXDaytEkX1uBlmOBAKzS2yLrg"
            target="_blank"
            icon
            ><v-icon large>mdi-instagram</v-icon></v-btn
          >
          <v-btn href="https://facebook.com/scuola.metamorfosi" target="_blank" icon
            ><v-icon large>mdi-facebook</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <a target="_blank" style="text-decoration: none" href="mailto:support@metamorfosi.eu"
            ><v-icon>mdi-mail</v-icon><span style="color:white">support@metamorfosi.eu</span></a
          >
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="text-center">
          <span class="ma-3">&copy; {{ new Date().getFullYear() }} MetaMorfosi</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  metaInfo: {
    title: 'MetaMorfosi',
    titleTemplate: '%s | Aрт-терапия и психология Надежды Навроцкой',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content:
          'MetaMorfosi - виртуальное пространство психологических игр, погружения в бессознательное и арт-терапии. Психосоматика, психология отношений, мотивация, развитие творческого потенциала, раскрытие талантов, искусство.'
      }
    ]
  },
  components: {
    Snackbar: () => import('./components/shared/Snackbar'),
    BarSettingsMenu: () => import('./components/shared/BarSettingsMenu'),
    BarUserMenu: () => import('./components/shared/BarUserMenu'),
    DialogOfferAgreement: () => import('./components/shared/DialogOfferAgreement'),
    DialogPrivacyPolicy: () => import('./components/shared/DialogPrivacyPolicy'),
    SubscriptionForm: () => import('./components/shared/SubscriptionForm'),
    SnackbarMessaging: () => import('./components/shared/SnackbarMessaging'),
    BarMessagesMenu: () => import('./components/shared/BarMessagesMenu'),
    FloatingButton: () => import('@/components/shared/FloatingButton'),
    SnackbarServiceWorker: () => import('@/components/shared/SnackbarServiceWorker')
  },
  data: () => ({
    drawer: null,
    srcLogotype:
      'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/studios%2Flogotype.png?alt=media&token=c29cac13-22df-412d-b45f-bef37fec8792'
  }),
  computed: {
    ...mapState({
      error: state => state.shared.error,
      user: state => state.user.user
    }),
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    admin() {
      return this.$store.getters.admin
    },
    links() {
      let arrayBar = [
        { title: 'О нас', icon: 'mdi-account-supervisor-outline', url: '/aboutUs' },
        { title: 'Студии', icon: 'mdi-human-male-board', url: '/studios' },
        // { title: 'Календарь', icon: 'mdi-calendar-heart', url: '/calendars' },
        { title: 'Нейрографика', icon: 'mdi-lead-pencil', url: '/neurographicsList' },
        // { title: 'Арт-терапия', icon: 'mdi-brush', url: '/artTherapyList' },
        { title: 'Игра', icon: 'mdi-cards', url: '/miniGames/GameWithPictures' },
        { title: 'Блог', icon: 'mdi-book-open-page-variant', url: '/blog' },
        { title: 'Галерея', icon: 'mdi-palette-outline', url: '/galleryList' }
      ]
      if (!this.isLoggedIn) {
        arrayBar.push({ title: 'Вход', icon: 'mdi-diving-helmet', url: '/login' })
      }
      return arrayBar
    }
  },
  methods: {
    onLogout() {
      this.$router.push('/')
      this.$store.dispatch('logoutUser')
    }
  }
}
</script>
<style lang="stylus">
.cursorPointer {
  cursor pointer
}
  .Underdog {
  font-family Underdog-Regular
}
.show-logo {
  opacity: 0.6;
}
</style>
