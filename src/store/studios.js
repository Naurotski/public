import * as firebase from 'firebase/app'
import 'firebase/database'
import axios from 'axios'
export default {
  state: {
    listStudios: [],
    listStudiosGroup: [],
    listCalendars: [],
    priceStudios: [],
    previewContentStudio: null
  },
  getters: {
    listStudios: state => state.listStudios,
    listStudiosGroup: state => state.listStudiosGroup,
    listCalendars: state => state.listCalendars,
    priceStudios: state => state.priceStudios,
    dataStudio: state => titleStudios =>
      state.listStudios.find(studio => studio.id === titleStudios),
    dataStudioGroup: state => titleStudiosGroup =>
      state.listStudiosGroup.find(studio => studio.id === titleStudiosGroup),
    dataCalendar: state => titleCalendar =>
      state.listCalendars.find(calendar => calendar.id === titleCalendar),
    dataPriceStudio: state => state.priceStudios
  },
  mutations: {
    getListStudios: (state, localListStudios) => {
      state.listStudios = localListStudios.sort((a, b) => {
        if (+a.dateCreation < +b.dateCreation) return 1
        if (+a.dateCreation === +b.dateCreation) return 0
        if (+a.dateCreation > +b.dateCreation) return -1
      })
    },
    getListStudiosGroup: (state, localListStudios) => {
      state.listStudiosGroup = localListStudios.sort((a, b) => {
        if (+a.dateCreation < +b.dateCreation) return 1
        if (+a.dateCreation === +b.dateCreation) return 0
        if (+a.dateCreation > +b.dateCreation) return -1
      })
    },
    getListCalendars: (state, localListStudios) => {
      state.listCalendars = localListStudios.sort((a, b) => {
        if (+a.studioName.split('.')[0] < +b.studioName.split('.')[0]) return -1
        if (+a.studioName.split('.')[0] === +b.studioName.split('.')[0]) return 0
        if (+a.studioName.split('.')[0] > +b.studioName.split('.')[0]) return 1
      })
    },
    getPriceStudios: (state, localPriceStudios) => (state.priceStudios = localPriceStudios),
    getPreviewContentStudio: (state, dataPreview) => (state.previewContentStudio = dataPreview)
  },
  actions: {
    async getListStudios({ commit }, typeExercise) {
      commit('clearError')
      try {
        const localListStudios = []
        const snapshot = await firebase
          .database()
          .ref(`${typeExercise}/listStudios`)
          .once('value')
        const list = snapshot.val()
        Object.keys(list).forEach(key => {
          localListStudios.push({ ...list[key], id: key })
        })
        if (typeExercise === 'studios') {
          commit('getListStudios', localListStudios)
        } else if (typeExercise === 'studiosGroup') {
          commit('getListStudiosGroup', localListStudios)
        } else {
          commit('getListCalendars', localListStudios)
        }
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async getPriceStudios({ commit }, { typeExercise, titleStudios }) {
      commit('clearError')
      try {
        const snapshot = await firebase
          .database()
          .ref(`${typeExercise}/priceStudios/${titleStudios}`)
          .once('value')
        const dataPriceStudio = snapshot.val()
        commit('getPriceStudios', dataPriceStudio)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async getPreviewContentStudio({ commit }, { typeExercise, titleStudios }) {
      commit('clearError')
      try {
        const snapshot = await firebase
          .database()
          .ref(`${typeExercise}/StudiosPreviewContent/${titleStudios}`)
          .once('value')
        const dataPreview = snapshot.val()
        commit('getPreviewContentStudio', dataPreview)
        return dataPreview
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async uploadToFilePdf({ commit, getters }, { studioName, studio, userName, userId }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await axios.post(
          `${getters.url}/metamorfosi/createToFilePdf`,
          { studioName, studio, userName, userId },
          {
            headers: { Authorization: `Bearer ${getters.token}` }
          }
        )
        const response = await axios.get(`${getters.url}/fetchToFilePdf/${userId}`, {
          responseType: 'blob'
        })
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
        let link = document.createElement('a')
        link.href = URL.createObjectURL(pdfBlob)
        link.download = 'studio.pdf'
        link.click()
        URL.revokeObjectURL(link.href)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  }
}
