import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import axios from 'axios'
export default {
  state: {
    token: localStorage.getItem('_ken'),
    url: 'https://metamorfosi.herokuapp.com',
    listUsersFilter: []
  },
  getters: {
    token: state => state.token,
    isLoggedIn: state => !!state.token,
    url: state => state.url,
    keysListUsersFilter: state => Object.keys(state.listUsersFilter)
  },
  mutations: {
    setToken: (state, token) => (state.token = token),
    getIdToken: (state, payload) => (state.idToken = payload),
    getUsersFilter: (state, listUsers) => (state.listUsersFilter = listUsers)
  },

  actions: {
    async getIdToken({ commit, getters }, user) {
      if (user) {
        commit('setLoading', true)
        commit('clearError')
        try {
          const idToken = await firebase.auth().currentUser.getIdToken(true)
          const response = await axios.get(`${getters.url}/metamorfosi/verifyIdToken`, {
            headers: { Authorization: `Bearer ${idToken}` }
          })
          if (response.data.admin) {
            commit('setAdmin', response.data.uid)
          }
          commit('setToken', idToken)
          localStorage.setItem('_ken', '1')
          commit('setLoading', false)
        } catch (error) {
          commit('setLoading', false)
          commit('setError', error.message)
          throw error
        }
      }
    },
    async getUsersFilter({ commit, getters }, { titleStudio }) {
      commit('clearError')
      try {
        const response = await axios.post(
          `${getters.url}/metamorfosi/getUsersFilter`,
          { titleStudio },
          {
            headers: { Authorization: `Bearer ${getters.token}` }
          }
        )
        commit('getUsersFilter', response.data)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  }
}
