/* eslint-disable no-console */
import axios from 'axios'
import * as firebase from 'firebase/app'
import 'firebase/messaging'
export default {
  state: {
    notificationsToken: '',
    dataMessage: '',
    listMessagesUser: []
  },
  mutations: {
    getNotificationsToken: (state, currentToken) => (state.notificationsToken = currentToken),
    getMessage: (state, payload) => {
      state.dataMessage = {
        title: payload.notification.title,
        text: payload.notification.body,
        icon: payload.notification.image,
        link: payload.notification.click_action
      }
    },
    fetchListMessagesUser: (state, messages) => {
      let arrayMessages = []
      if (messages) {
        Object.keys(messages).forEach(key => {
          const message = messages[key]
          arrayMessages.push({ ...message, id: key })
        })
        state.listMessagesUser = arrayMessages.sort((a, b) => {
          if (+a.date < +b.date) return 1
          if (+a.date === +b.date) return 0
          if (+a.date > +b.date) return -1
        })
      } else {
        state.listMessagesUser = []
      }
    }
  },
  actions: {
    async nodeMailer({ commit, getters }, { userName, userEmail, subject, text }) {
      commit('clearError')
      try {
        return await axios.post(
          `${getters.url}/metamorfosi/nodemailer`,
          {
            userName,
            userEmail,
            subject,
            text
          },
          { headers: { Authorization: `Bearer ${getters.token}` } }
        )
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async getNotificationsToken({ commit, dispatch }) {
      commit('clearError')
      try {
        const currentToken = await firebase.messaging().getToken({
          vapidKey:
            'BP3jRdJPgR8PGeJj303ELF6lH2Xg2cjt_nW4BalnGLorIauuWIq7L18ZvD25NcSpWmIZe4MCowVrqir3Y6OR6Ww'
        })
        if (currentToken) {
          dispatch('subscribeTopic', { currentToken, topic: 'allUsers' })
          dispatch('writeNotificationsTokenToDatabase', currentToken)
          commit('getNotificationsToken', currentToken)
        } else {
          console.log('No registration token available. Request permission to generate one.')
        }
      } catch (error) {
        console.log(error.message)
      }
    },
    async writeNotificationsTokenToDatabase({ commit, getters }, currentToken) {
      commit('clearError')
      try {
        let tokensArray = []
        const snapshot = await firebase
          .database()
          .ref(`users/${getters.user.id}/cloudMessagingTokens`)
          .once('value')
        const localArray = snapshot.val()
        if (localArray) {
          tokensArray = [...localArray]
        }
        if (!tokensArray.includes(currentToken)) {
          tokensArray.push(currentToken)
          await firebase
            .database()
            .ref(`users`)
            .child(getters.user.id)
            .update({ cloudMessagingTokens: tokensArray })
        }
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async subscribeTopic({ commit, getters }, { currentToken, topic }) {
      commit('clearError')
      try {
        await axios.post(
          `${getters.url}/metamorfosi/cloudMessaging/subscribeToTopic`,
          {
            currentToken,
            topic
          },
          { headers: { Authorization: `Bearer ${getters.token}` } }
        )
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async fetchListMessagesUser({ commit }, user) {
      commit('setLoading', true)
      commit('clearError')
      try {
        firebase
          .database()
          .ref(`messages/${user.uid}`)
          .on('value', snapshot => {
            const messages = snapshot.val()
            commit('fetchListMessagesUser', messages)
          })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async deleteMessageFromDatabase({ commit, getters }, { id }) {
      commit('clearError')
      try {
        await firebase
          .database()
          .ref(`messages/${getters.user.id}/${id}`)
          .remove()
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  }
}
