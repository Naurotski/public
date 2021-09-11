import * as firebase from 'firebase/app'
import 'firebase/firestore'
export default {
  state: {
    posts: [],
    hiddenPosts: [],
    unsubscribeArray: []
  },
  getters: {
    posts: state => state.posts,
    hiddenPosts: state => state.hiddenPosts,
    unsubscribeArray: state => state.unsubscribeArray
  },
  mutations: {
    setPosts: (state, postsArray) => {
      if (postsArray) {
        state.posts = postsArray
      } else {
        state.posts = []
      }
    },
    setUnsubscribeArray: (state, unsubscribe) => state.unsubscribeArray.push(unsubscribe),
    clearUnsubscribeArray: state => {
      state.unsubscribeArray = []
    },
    setHiddenPosts: (state, post) => {
      if (post) {
        if (!state.hiddenPosts.some(dataPost => dataPost.id === post.id)) {
          state.hiddenPosts.unshift(post)
        }
      } else {
        state.hiddenPosts = []
      }
    },
    filterPosts: (state, post) => {
      if (state.hiddenPosts.some(dataPost => dataPost.id === post.id)) {
        state.hiddenPosts.splice(
          state.hiddenPosts.indexOf(state.hiddenPosts.find(dataPost => dataPost.id === post.id)),
          1,
          post
        )
      } else {
        state.posts.splice(
          state.posts.indexOf(state.posts.find(dataPost => dataPost.id === post.id)),
          1,
          post
        )
      }
    },
    likeComment(state, { postId, commentId, userId, userName }) {
      let commentsArray = state.posts.find(post => post.id === postId).commentsArray
      commentsArray.find(comment => comment.id === commentId).likes.push(userId)
      if (userName !== 'user') {
        commentsArray.find(comment => comment.id === commentId).likesNameUser.push(userName)
      }
    },
    deleteComment(state, { postId, commentsId }) {
      let post = state.posts.find(post => post.id === postId)
      post.commentsArray.splice(
        post.commentsArray.findIndex(item => item.id === commentsId),
        1
      )
    }
  },
  actions: {
    async createPost({ commit }, { postData, postImage, stepId, titleStudios }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const post = await firebase
          .firestore()
          .collection(`${titleStudios}_${stepId}`)
          .add(postData)
        if (postImage) {
          await firebase
            .storage()
            .ref(`posts/${titleStudios}/${post.id}`)
            .put(postImage)
          const postImageSrc = await firebase
            .storage()
            .ref(`posts/${titleStudios}/${post.id}`)
            .getDownloadURL()
          await firebase
            .firestore()
            .collection(`${titleStudios}_${stepId}`)
            .doc(post.id)
            .update({
              postImageSrc
            })
        }
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async setPosts({ commit, getters }, { stepId, titleStudios }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const unsubscribe = await firebase
          .firestore()
          .collection(`${titleStudios}_${stepId}`)
          .orderBy('dateCreation', 'desc')
          .onSnapshot(querySnapshot => {
            let createdByCurrentUser
            if (querySnapshot.docs.length) {
              createdByCurrentUser =
                getters.user.id === querySnapshot.docChanges()[0].doc.data().userId
            }
            if (
              querySnapshot.docChanges().length !== querySnapshot.docs.length &&
              querySnapshot.docChanges()[0].type === 'added' &&
              !createdByCurrentUser
            ) {
              let post = querySnapshot.docChanges()[0].doc.data()
              post.id = querySnapshot.docChanges()[0].doc.id
              commit('setHiddenPosts', post)
            } else if (
              querySnapshot.docChanges().length !== querySnapshot.docs.length &&
              querySnapshot.docChanges()[0].type === 'modified'
            ) {
              let post = querySnapshot.docChanges()[0].doc.data()
              post.id = querySnapshot.docChanges()[0].doc.id
              commit('filterPosts', post)
            } else {
              let postsArray = []
              querySnapshot.forEach(doc => {
                let post = doc.data()
                post.id = doc.id
                postsArray.push(post)
              })
              commit('setPosts', postsArray)
              commit('setHiddenPosts', null)
            }
          })
        commit('setLoading', false)
        commit('setUnsubscribeArray', unsubscribe)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async unsubscribe({ commit, getters }) {
      commit('clearError')
      try {
        await new Promise(resolve => {
          getters.unsubscribeArray.forEach(unsubscribe => {
            unsubscribe()
          })
          resolve()
        })
        commit('clearUnsubscribeArray')
      } catch (error) {
        commit('setError', error.message)
      }
    },
    async addComment({ commit, getters }, { content, postId, image, stepId, titleStudios }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const idComment = Math.random()
        let localArray = [...getters.posts.find(post => post.id === postId).commentsArray]
        if (image) {
          await firebase
            .storage()
            .ref(`posts/${titleStudios}/${idComment}`)
            .put(image)
          const commentImageSrc = await firebase
            .storage()
            .ref(`posts/${titleStudios}/${idComment}`)
            .getDownloadURL()
          localArray.push({
            content,
            createdOn: new Date(),
            userId: getters.user.id,
            userPhotoURL: getters.user.photoURL || '',
            showContent: false,
            id: idComment,
            userName: getters.user.firstName + ' ' + getters.user.lastName,
            commentImageSrc,
            likes: [],
            likesNameUser: []
          })
        } else {
          localArray.push({
            content,
            createdOn: new Date(),
            userId: getters.user.id,
            userPhotoURL: getters.user.photoURL || '',
            showContent: false,
            id: idComment,
            userName: getters.user.firstName + ' ' + getters.user.lastName,
            likes: [],
            likesNameUser: []
          })
        }
        await firebase
          .firestore()
          .collection(`${titleStudios}_${stepId}`)
          .doc(postId)
          .update({
            commentsArray: localArray,
            comments: localArray.length
          })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async likePost({ commit, getters }, { postId, userName, stepId, titleStudios }) {
      commit('clearError')
      try {
        let likes = [...getters.posts.find(post => post.id === postId).likes]
        likes.push(getters.user.id)
        let likesNameUser = [...getters.posts.find(post => post.id === postId).likesNameUser]
        likesNameUser.push(userName)
        if (userName !== 'user') {
          await firebase
            .firestore()
            .collection(`${titleStudios}_${stepId}`)
            .doc(postId)
            .update({
              likes,
              likesNameUser
            })
        } else {
          await firebase
            .firestore()
            .collection(`${titleStudios}_${stepId}`)
            .doc(postId)
            .update({ likes })
        }
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async likeComment({ commit, getters }, { postId, commentId, userName, stepId, titleStudios }) {
      commit('clearError')
      try {
        commit('likeComment', {
          postId,
          commentId,
          userId: getters.user.id,
          userName
        })
        const localArray = getters.posts.find(post => post.id === postId).commentsArray
        await firebase
          .firestore()
          .collection(`${titleStudios}_${stepId}`)
          .doc(postId)
          .update({
            commentsArray: localArray
          })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async deletePost({ commit }, { postId, stepId, titleStudios }) {
      commit('clearError')
      try {
        await firebase
          .firestore()
          .collection(`${titleStudios}_${stepId}`)
          .doc(postId)
          .delete()
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async deleteComment({ commit, getters }, { postId, commentId, stepId, titleStudios }) {
      commit('clearError')
      try {
        commit('deleteComment', { postId, commentId })
        const commentArray = getters.posts.find(post => post.id === postId).commentsArray
        await firebase
          .firestore()
          .collection(`${titleStudios}_${stepId}`)
          .doc(postId)
          .update({
            commentsArray: commentArray,
            comments: commentArray.length
          })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async setPostsUser(
      { commit, getters, dispatch },
      { studioModelLength, titleStudios, studioName }
    ) {
      commit('clearError')
      commit('setLoading', true)
      try {
        let localArray = []
        for (let i = 1; i <= studioModelLength; i++) {
          await firebase
            .firestore()
            .collection(`${titleStudios}_${i}`)
            .where('userId', '==', `${getters.user.id}`)
            .get()
            .then(querySnapshot => {
              localArray.push(querySnapshot.docs[0].data())
            })
        }
        dispatch('uploadToFilePdf', {
          studioName,
          studio: localArray,
          userName: localArray[0].userName,
          userId: getters.user.id
        }).then(() => commit('setLoading', false))
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
      }
    }
  }
}
