import axios from 'axios'
import stripe from '../../src/pk_live'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async payStripe({ commit, getters }, paymentDetails) {
      commit('clearError')
      try {
        const response = await axios.post(
          `${getters.url}/metamorfosi/payStripe`,
          {
            name: paymentDetails.name,
            description: paymentDetails.description,
            images: paymentDetails.images,
            amount: paymentDetails.amount,
            currency: paymentDetails.currency,
            quantity: paymentDetails.quantity,
            dataUser: paymentDetails.localUser
          },
          { headers: { Authorization: `Bearer ${getters.token}` } }
        )
        stripe.redirectToCheckout({
          sessionId: response.data
        })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async payStripePictures({ commit, getters }, paymentDetails) {
      commit('clearError')
      try {
        const response = await axios.post(`${getters.url}/payStripePictures`, {
          ...paymentDetails
        })
        stripe.redirectToCheckout({
          sessionId: response.data
        })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async testStripe({ commit, getters }) {
      commit('clearError')
      try {
        await axios.post(
          `http://localhost:3000/metamorfosi/testStripe`,
          {
            userEmail: getters.user.email
          },
          { headers: { Authorization: `Bearer ${getters.token}` } }
        )
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  }
}
