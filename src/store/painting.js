import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/firestore'

export default {
  state: {
    galleryList: [],
    paintings: [],
    rubrics: [
      {
        title: 'Арт-объекты',
        rubric: 'artObjects',
        icon: 'mdi-nature-people',
        rubricSrc:
          'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2F32.jpg?alt=media&token=76382467-144f-4314-b041-f403f81a4775'
      },
      {
        title: 'Пейзажи',
        rubric: 'landscape',
        icon: 'mdi-tree',
        rubricSrc:
          'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/paintinds%2F-Lra--VluvwgzbO1r9oI?alt=media&token=b876c90f-c802-4170-b691-711d89c4ac86'
      },
      {
        title: 'Городские Пейзажи',
        rubric: 'cityLandscapes',
        icon: 'mdi-castle',
        rubricSrc:
          'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/paintinds%2F-Lr_ywfF9W5nQzcr_E4S?alt=media&token=c17ba9a7-eaf6-4cd6-8126-0c376c553cdd'
      },
      {
        title: 'Портреты',
        rubric: 'portraits',
        icon: 'mdi-face',
        rubricSrc:
          'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/paintinds%2F-Lr_xhm9mwe9JLltqCQX?alt=media&token=2233f14d-2cd2-44f0-b7d9-04c8666f3f6d'
      },
      {
        title: 'Натюрморты',
        rubric: 'stillLifes',
        icon: 'mdi-fruit-cherries',
        rubricSrc:
          'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/paintinds%2F-Lra-XwCm64Hw8-ubOW_?alt=media&token=e2d0816b-e373-4a23-8c2b-c52e306019e8'
      },
      {
        title: 'Разное',
        rubric: 'different',
        icon: 'mdi-human',
        rubricSrc:
          'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/paintinds%2F-Lra00gC9uqHPhTJAbR1?alt=media&token=d6b39dd8-fd5f-45f6-8849-06bb6084c1bc'
      }
    ]
  },
  getters: {
    paintings: state => state.paintings,
    promoPaintings: state => state.paintings.filter(painting => painting.promo),
    selectPainting: state => id => state.paintings.find(painting => painting.id === id),
    rubrics: state => state.rubrics,
    rubricsFilter: state => rubric => state.rubrics.find(title => title.rubric === rubric),
    paintingsFilter: state => (rubric, i18n) => {
      const localArray = state.paintings.filter(painting => painting.rubric === rubric)
      if (i18n === 'en') {
        return localArray.map(painting => {
          return {
            title: painting.titleEn || '',
            description: painting.descriptionEn || '',
            description2: painting.description2En || '',
            price: painting.priceEn || '',
            printPrice: painting.printPrice || '',
            promo: painting.promo,
            rubric: painting.rubric,
            imageSrc: painting.imageSrc,
            id: painting.id
          }
        })
      } else {
        return localArray
      }
    },
    galleryListFilterLanguage: state => i18n => {
      if (i18n === 'en') {
        return state.galleryList.map(gallery => {
          return {
            draft: gallery.draft,
            galleryTitle: gallery.galleryTitle,
            galleryName: gallery.galleryNameEn,
            shortDescription: gallery.shortDescriptionEn,
            galleryDescription: gallery.galleryDescriptionEn,
            previewTextLink: gallery.previewTextLinkEn || '',
            previewLink: gallery.previewLink || '',
            galleryAudioSrc: gallery.galleryAudioSrc,
            imageSrc: gallery.imageSrc,
            descriptionSrc: gallery.descriptionSrc,
            imageBlockSrc: gallery.imageBlockSrc
          }
        })
      } else {
        return state.galleryList.map(gallery => {
          return {
            draft: gallery.draft,
            galleryTitle: gallery.galleryTitle,
            galleryName: gallery.galleryNameRu,
            shortDescription: gallery.shortDescriptionRu,
            galleryDescription: gallery.galleryDescriptionRu,
            previewTextLink: gallery.previewTextLinkRu || '',
            previewLink: gallery.previewLink || '',
            galleryAudioSrc: gallery.galleryAudioSrc,
            imageSrc: gallery.imageSrc,
            descriptionSrc: gallery.descriptionSrc,
            imageBlockSrc: gallery.imageBlockSrc
          }
        })
      }
    }
  },
  mutations: {
    createPainting: (state, painting) => state.paintings.push(painting),
    fetchPaintings: (state, resultPaintings) => {
      state.paintings = resultPaintings.sort((a, b) => {
        if (a.id < b.id) return 1
        if (a.id === b.id) return 0
        if (a.id > b.id) return -1
      })
    },
    getGalleryList: (state, galleryList) => (state.galleryList = galleryList)
  },
  actions: {
    async fetchPaintings({ commit }) {
      commit('setLoading', true)
      commit('clearError')
      try {
        await firebase
          .database()
          .ref('paintings')
          .on('value', snapshot => {
            const resultPaintings = []
            const paintings = snapshot.val()
            Object.keys(paintings).forEach(key => {
              const painting = paintings[key]
              resultPaintings.push({
                ...painting,
                id: key
              })
            })
            commit('fetchPaintings', resultPaintings)
          })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async updatePainting({ commit }, painting) {
      commit('setLoading', true)
      commit('clearError')
      try {
        if (painting.imageBlock.length) {
          for (let elem of painting.imageBlock) {
            await firebase
              .storage()
              .ref(`paintinds/${painting.id}/${elem.name}`)
              .put(elem)
            await firebase
              .storage()
              .ref(`paintinds/${painting.id}/${elem.name}`)
              .getDownloadURL()
              .then(imageUrl => {
                painting.imageBlockSrc.push(imageUrl)
              })
          }
        }
        let path = painting.id
        delete painting.id
        delete painting.imageBlock
        await firebase
          .database()
          .ref('paintings')
          .child(path)
          .set(painting)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async deletePainting({ commit }, { id }) {
      commit('setLoading', true)
      commit('clearError')
      try {
        await firebase
          .storage()
          .ref(`paintinds/${id}`)
          .delete()
        const allPhotosGallery = await firebase
          .storage()
          .ref(`paintinds`)
          .child(id)
          .listAll()
        allPhotosGallery.items.forEach(item => {
          firebase
            .storage()
            .ref(item.fullPath)
            .delete()
        })
        await firebase
          .database()
          .ref(`paintings/${id}`)
          .remove()
        commit('setLoading', false)
        return true
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async getGalleryList({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const querySnapshot = await firebase
          .firestore()
          .collection('gallery')
          .get()
        let galleryList = []
        querySnapshot.forEach(doc => galleryList.push(doc.data()))
        commit('getGalleryList', galleryList)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setLoading', error.message)
        throw error
      }
    }
  }
}
