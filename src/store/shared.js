export default {
  state: {
    show: true,
    loading: false,
    error: null,
    temporaryPictureUrl: null,
    articles: [
      {
        imageSrc:
          'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/blog%2Fart_500.jpg?alt=media&token=70ecef46-7883-4b54-a811-7755701a8b2c',
        id: 'text',
        shortDescription: ''
      },
      {
        imageSrc:
          'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/blog%2Flibido_500.jpg?alt=media&token=f9fbaa45-8aa5-4313-862a-79f842480348',
        id: 'libido',
        shortDescription: ''
      },
      {
        imageSrc:
          'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/blog%2Fimage-24-06-21-09-56.jpeg?alt=media&token=3a2424dc-72e6-49ab-ba55-4a0799b2d12d',
        id: 'seven',
        shortDescription: ''
      },
      {
        imageSrc:
          'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/blog%2Fnejro_500.jpg?alt=media&token=e265aadf-de06-49cd-95ba-84a919aa25a5',
        id: 'neurographics',
        shortDescription: ''
      },
      {
        imageSrc:
          'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/blog%2FPsychosomatics%2FIMG_1795.jpg?alt=media&token=03a21351-2baa-43d5-80f8-15f427a2ddf8',
        id: 'psychosomatics',
        shortDescription: ''
      },
      {
        imageSrc:
          'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/blog%2FLungs%2Flegkie_500.jpg?alt=media&token=d1b1be1c-9c53-4c09-b1e3-7ad5edd06c16',
        id: 'lungs',
        shortDescription: ''
      }
    ],
    serviceWorker: null
  },
  getters: {
    loading: state => state.loading,
    error: state => state.error,
    show: state => state.show
  },
  mutations: {
    dataMessage: (state, data) => (state.dataMessage = data),
    setLoading: (state, payload) => (state.loading = payload),
    setError: (state, payload) => (state.error = payload),
    clearError: state => (state.error = null),
    changeTemporaryPictureUrl: (state, payload) => (state.temporaryPictureUrl = payload),
    changeShow: (state, payload) => (state.show = payload),
    updatedServiceWorker: (state, payload) => (state.serviceWorker = payload)
  },
  actions: {
    changeShow: ({ commit }) => {
      commit('changeShow', false)
      setTimeout(() => commit('changeShow', true), 1000)
    }
  }
}
