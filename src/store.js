import Vue from 'vue'
import Vuex from 'vuex'
import user from './store/user'
import shared from './store/shared'
import dialogs from './store/dialogs'
import studios from './store/studios'
import painting from './store/painting'
import admin from './store/admin'
import stripe from './store/stripe'
import messages from './store/messages'
import groupComments from './store/groupComments'
import games from './store/games'
import artTherapy from './store/artTherapy'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user,
    shared,
    dialogs,
    studios,
    painting,
    admin,
    stripe,
    messages,
    groupComments,
    games,
    artTherapy
  }
})
