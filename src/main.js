import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as firebase from 'firebase/app'
import 'firebase/messaging'
import firebaseConfig from './firebaseConfig'
import './stylus/main.styl'
import VueScrollTo from 'vue-scrollto'
import './registerServiceWorker'
import i18n from './i18n'
import VueMeta from 'vue-meta'
Vue.use(VueScrollTo, {
  duration: 1000,
  easing: 'ease'
})
Vue.use(VueMeta)
Vue.config.productionTip = false
firebase.initializeApp(firebaseConfig)
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.commit('autoUser', user)
    store.dispatch('autoDataUser', user)
    store.dispatch('fetchListMessagesUser', user)
    store.dispatch('getIdToken', user).then(() => store.dispatch('getNotificationsToken'))
  }
})
new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
firebase.messaging().onMessage(dataMessage => {
  try {
    store.commit('getMessage', dataMessage)
  } catch (error) {
    store.commit('setError', error.message)
  }
})
