import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
const providerGoogle = new firebase.auth.GoogleAuthProvider()
const providerFacebook = new firebase.auth.FacebookAuthProvider()

class User {
  constructor(
    id,
    displayName,
    email,
    emailVerified,
    photoURL,
    isAnonymous,
    providerData,
    birthdayDate
  ) {
    this.id = id
    this.displayName = displayName
    this.email = email
    this.emailVerified = emailVerified
    this.photoURL = photoURL
    this.isAnonymous = isAnonymous
    this.providerData = providerData
    this.birthdayDate = birthdayDate
  }
}
export default {
  state: {
    user: {},
    admin: ''
  },
  getters: {
    user: state => state.user,
    admin: state => state.user.id === state.admin
  },
  mutations: {
    setUser: (state, user) => (state.user = user),
    setAdmin: (state, uid) => (state.admin = uid),
    autoUser: (state, user) => {
      state.user = new User(
        user.uid,
        user.displayName,
        user.email,
        user.emailVerified,
        user.photoURL,
        user.isAnonymous,
        user.providerData,
        user.birthdayDate
      )
      state.token = user.refreshToken
    },
    changePhotoURL: (state, photoSrc) => (state.user.photoURL = photoSrc)
  },
  actions: {
    async registerUser({ commit, dispatch }, { email, password }) {
      commit('setLoading', true)
      commit('clearError')
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        dispatch('changeDataUser', { anteaters: 10 })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUserGoogle({ commit, dispatch }) {
      commit('setLoading', true)
      commit('clearError')
      try {
        const result = await firebase.auth().signInWithPopup(providerGoogle)
        if (result.additionalUserInfo.isNewUser) {
          const nameUser = result.user.displayName.split(' ')
          dispatch('changeDataUser', {
            anteaters: 5,
            firstName: nameUser[0] || '',
            lastName: nameUser[1] || ''
          })
        }
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUserFacebook({ commit, dispatch }) {
      commit('setLoading', true)
      commit('clearError')
      try {
        const result = await firebase.auth().signInWithPopup(providerFacebook)
        if (result.additionalUserInfo.isNewUser) {
          const nameUser = result.user.displayName.split(' ')
          dispatch('changeDataUser', {
            anteaters: 5,
            firstName: nameUser[0] || '',
            lastName: nameUser[1] || ''
          })
        }
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        if (
          error.message ===
          'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.'
        ) {
          commit(
            'setError',
            'Учетная запись уже существует с тем же адресом электронной почты, но с другими учетными данными для входа. Войдите, используя провайдера, связанного с этим адресом электронной почты'
          )
        } else {
          commit('setError', error.message)
        }
        throw error
      }
    },
    async loginUser({ commit }, { email, password }) {
      commit('setLoading', true)
      commit('clearError')
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async autoDataUser({ commit, getters }, user) {
      commit('setLoading', true)
      commit('clearError')
      try {
        const snapshot = await firebase
          .database()
          .ref(`users/${user.uid}`)
          .once('value')
        const dataUser = snapshot.val()
        commit('setUser', { ...getters.user, ...dataUser })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async changeDataUser({ commit, getters }, payload) {
      commit('clearError')
      try {
        if (payload.artTherapy || payload.studios || payload.calendars || payload.neurographics) {
          for (let key in payload) {
            let localArray = []
            if (getters.user[key]) {
              localArray = [...getters.user[key]]
            }
            localArray.push(payload[key])
            payload[key] = localArray
          }
        }
        if (payload.finishedStudios) {
          let newStudios = []
          if (getters.user.finishedStudios) {
            newStudios = [...getters.user.finishedStudios]
          }
          newStudios.push(payload.finishedStudios)
          payload.finishedStudios = newStudios
        }
        if (payload.anteaters && getters.user.anteaters) {
          payload.anteaters = +payload.anteaters + +getters.user.anteaters
        }
        if (payload.payments) {
          let label = {}
          if (getters.user.payments) {
            label = { ...getters.user.payments }
          }
          label[payload.payments] = payload.vip ? 'vip' : 'anteaters'
          payload.payments = label
        }
        if (payload.studiosGroup) {
          let newStudiosGroup = []
          if (getters.user.studiosGroup) {
            newStudiosGroup = [...getters.user.studiosGroup]
          }
          newStudiosGroup.push(payload.studiosGroup)
          payload.studiosGroup = newStudiosGroup
        }
        await firebase
          .database()
          .ref(`users`)
          .child(getters.user.id)
          .update({ ...payload })
        commit('setUser', { ...getters.user, ...payload })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async logoutUser({ commit }) {
      commit('setLoading', true)
      commit('clearError')
      try {
        await firebase.auth().signOut()
        localStorage.removeItem('_ken')
        commit('setUser', {})
        commit('setToken', null)
        commit('setLoading', false)
        commit('setAdmin', '')
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async changePhotoUser({ commit, getters }, photo) {
      commit('setLoading', true)
      commit('clearError')
      try {
        await firebase
          .storage()
          .ref(`users/${getters.user.id}/avatar`)
          .put(photo)
        const photoSrc = await firebase
          .storage()
          .ref(`users/${getters.user.id}/avatar`)
          .getDownloadURL()
        await firebase.auth().currentUser.updateProfile({ photoURL: photoSrc })
        commit('changePhotoURL', photoSrc)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async sendEmailVerification({ commit }) {
      commit('setLoading', true)
      commit('clearError')
      let actionCodeSettings = {
        url: 'https://metamorfosi.eu/userProfile'
      }
      try {
        await firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async updateEmailUser({ commit }, newEmail) {
      commit('setLoading', true)
      commit('clearError')
      try {
        await firebase.auth().currentUser.updateEmail(newEmail)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async sendPasswordReset({ commit }, email) {
      commit('setLoading', true)
      commit('clearError')
      let actionCodeSettings = {
        url: 'https://metamorfosi.eu/login'
      }
      try {
        await firebase.auth().sendPasswordResetEmail(email, actionCodeSettings)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  }
}
