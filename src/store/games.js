import * as firebase from 'firebase/app'
import 'firebase/database'

export default {
  state: {
    listGames: [],
    gameData: {},
    gameDataForEditing: {},
    listProblems: [],
    listGamePictures: []
  },
  getters: {
    fullListGamePicturesSrc: state => state.listGamePictures.map(elem => elem.imageSrc)
  },
  mutations: {
    getListGames: (state, localListGames) => {
      state.listGames = localListGames.sort((a, b) => {
        if (+a.dateCreation < +b.dateCreation) return 1
        if (+a.dateCreation === +b.dateCreation) return 0
        if (+a.dateCreation > +b.dateCreation) return -1
      })
    },
    getGameDataForEditing: (state, gameData) => (state.gameDataForEditing = gameData),
    getGameData: (state, gameData) => {
      state.gameData = {
        ...gameData,
        heightGame: +gameData.heightGame,
        widthGame: +gameData.widthGame,
        pictures: gameData.pictures.map(picture => {
          return {
            ...picture,
            x: +picture.x,
            y: +picture.y,
            hitArea:
              picture.hitArea.split(',')[0] !== ''
                ? picture.hitArea.split(',').map(item => +item)
                : null
          }
        })
      }
    },
    getListProblems: (state, newProblems) => (state.listProblems = newProblems),
    getListGamePictures: (state, imagesData) => (state.listGamePictures = imagesData)
  },
  actions: {
    async getListGames({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const localListGames = []
        const snapshot = await firebase
          .database()
          .ref(`mimiGame/listGames`)
          .once('value')
        const list = snapshot.val()
        Object.keys(list).forEach(key => {
          localListGames.push({ ...list[key], id: key })
        })
        commit('getListGames', localListGames)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
      }
    },
    async getGameData({ commit }, { titleGame }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const snapshot = await firebase
          .database()
          .ref(`mimiGame/${titleGame}`)
          .once('value')
        const gameData = snapshot.val()
        commit('getGameData', gameData)
        commit('getGameDataForEditing', gameData)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
      }
    },
    async getListProblems({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const problems = await firebase
          .firestore()
          .collection('gamePictures')
          .get()
        let localData = []
        problems.forEach(problem => {
          localData.push({ ...problem.data(), id: problem.id })
        })
        commit('getListProblems', localData)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
      }
    },
    async getImagesGamePictures({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const allPictures = await firebase
          .firestore()
          .collection('gamePicturesImageData')
          .get()
        let localData = []
        allPictures.forEach(doc => {
          localData.push({ ...doc.data(), name: doc.id })
        })
        commit('getListGamePictures', localData)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
      }
    }
  }
}
