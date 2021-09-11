import * as firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

export default {
  state: {
    artTherapyList: []
  },
  getters: {
    artTherapy: state => artTherapyTitle =>
      state.artTherapyList.find(elem => elem.id === artTherapyTitle)
  },
  mutations: {
    getArtTherapy: (state, artTherapyList) => (state.artTherapyList = artTherapyList)
  },
  actions: {
    async getArtTherapy({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const querySnapshot = await firebase
          .firestore()
          .collection('artTherapy')
          .get()
        let artTherapyList = []
        querySnapshot.forEach(elem => artTherapyList.push(elem.data()))
        commit('getArtTherapy', artTherapyList)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
      }
    }
  }
}
