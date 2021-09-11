import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

export default {
  state: {
    studio: [],
    studioModel: [],
    imageBlocksSrc: {},
    answersStudioGroup: {}
  },
  getters: {
    studio: state => state.studio,
    studioModel: state => state.studioModel,
    dialog: state => id => state.studio.find(dialog => dialog.id === id),
    studioLength: state => state.studio.map(step => +step.id),
    studioDoneLength: state => state.studio.filter(dialog => !!dialog.done).length,
    imageBlocksSrc: state => state.imageBlocksSrc,
    answersStudioGroup: state => state.answersStudioGroup,
    answersStudioGroupUser: state => userId => state.answersStudioGroup[userId] || []
  },
  mutations: {
    fetchStudio: (state, payload) => (state.studio = payload),
    fetchStudioModel: (state, payload) => (state.studioModel = payload),
    changeDialogs: (state, payload) => {
      state.studio.splice(
        state.studio.indexOf(state.studio.find(dialog => dialog.id === payload.id)),
        1,
        payload
      )
    },
    fetchImageBlocksSrc: (state, block) => (state.imageBlocksSrc = block || {}),
    clearImageBlocksSrc: state => (state.imageBlocksSrc = {}),
    fetchAnswersStudioGroup: (state, answers) => (state.answersStudioGroup = answers || {})
  },
  actions: {
    async createStudioUser({ commit, getters }, { titleStudios, typeExercise }) {
      commit('setLoading', true)
      commit('clearError')
      try {
        const snapshot = await firebase
          .database()
          .ref(`${typeExercise}/${titleStudios}`)
          .once('value')
        const studio = snapshot.val()
        await firebase
          .database()
          .ref(`${typeExercise}User/${getters.user.id}/${titleStudios}`)
          .set(studio)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async createAnswersStudioGroup({ commit, getters }, { titleStudios, stepId, userId }) {
      commit('clearError')
      let answersArray = []
      if (getters.answersStudioGroup[userId]) {
        answersArray = [...getters.answersStudioGroup[userId]]
      }
      answersArray.push(+stepId)
      let answers = { ...getters.answersStudioGroup }
      answers[userId] = answersArray
      try {
        await firebase
          .database()
          .ref(`studiosGroupUser/${titleStudios}`)
          .set(answers)
      } catch (error) {
        commit('setError', error.message)
      }
    },
    async fetchAnswersStudioGroup({ commit }, { titleStudios }) {
      commit('clearError')
      try {
        await firebase
          .database()
          .ref(`studiosGroupUser/${titleStudios}`)
          .on('value', snapshot => {
            commit('fetchAnswersStudioGroup', snapshot.val())
          })
      } catch (error) {
        commit('setError', error.message)
      }
    },
    async fetchStudio({ commit, getters }, { titleStudios, typeExercise }) {
      commit('setLoading', true)
      commit('clearError')
      try {
        const resultStudio = []
        const snapshot = await firebase
          .database()
          .ref(`${typeExercise}User/${getters.user.id}/${titleStudios}`)
          .once('value')
        const studio = snapshot.val()
        Object.keys(studio).forEach(key => {
          resultStudio.push({ ...studio[key], id: key })
        })
        commit('fetchStudio', resultStudio)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async changeUserStudio({ commit, getters }, { localDialog, titleStudios, typeExercise }) {
      commit('clearError')
      try {
        await localDialog.questions.map(async (item, index) => {
          if (item.image) {
            await firebase
              .storage()
              .ref(`users/${getters.user.id}/${titleStudios}${localDialog.id}${index}`)
              .put(item.image)
            item.answerImg = await firebase
              .storage()
              .ref(`users/${getters.user.id}/${titleStudios}${localDialog.id}${index}`)
              .getDownloadURL()
            delete item.image
          }
          await firebase
            .database()
            .ref(`${typeExercise}User/${getters.user.id}/${titleStudios}/${localDialog.id}`)
            .set({
              done: localDialog.done,
              id: localDialog.id,
              questions: localDialog.questions.map(item => {
                return { ...item }
              })
            })
          commit('changeDialogs', {
            done: localDialog.done,
            id: localDialog.id,
            questions: localDialog.questions.map(item => {
              return { ...item }
            })
          })
        })
        commit('setError', 'Сохранено')
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async fetchStudioModel({ commit }, { titleStudios, typeExercise }) {
      commit('setLoading', true)
      commit('clearError')
      try {
        const resultStudio = []
        const snapshot = await firebase
          .database()
          .ref(`${typeExercise}/${titleStudios}`)
          .once('value')
        const studio = snapshot.val()
        Object.keys(studio).forEach(key => {
          resultStudio.push({ ...studio[key], id: key })
        })
        commit('fetchStudioModel', resultStudio)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async fetchImageBlocksSrc({ commit }, { titleStudio, typeExercise }) {
      commit('clearError')
      try {
        if (titleStudio) {
          const snapshot = await firebase
            .database()
            .ref(`${typeExercise}/imageBlocksSrc/${titleStudio}`)
            .once('value')
          const block = snapshot.val()
          commit('fetchImageBlocksSrc', block)
        } else {
          commit('fetchImageBlocksSrc', {})
        }
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  }
}
