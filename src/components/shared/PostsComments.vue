<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <v-card>
        <v-container fluid>
          <v-row justify="center" align="center" class="text-center">
            <v-col md="1" cols="12">
              <v-card-actions class="my-n6">
                <v-spacer />
                <v-avatar class="profile d-inline">
                  <v-img v-if="user.photoURL" :src="user.photoURL" />
                  <v-icon v-else>mdi-account-outline</v-icon>
                </v-avatar>
                <v-spacer />
              </v-card-actions>
            </v-col>
            <v-col cols="12" md="9">
              <v-card-text>
                <v-form v-model="valid" validation>
                  <v-textarea
                    v-model="postContent"
                    class="mb-n12 mt-n4"
                    dense
                    outlined
                    rounded
                    auto-grow
                    filled
                    color="#0277BD"
                    label="Ваш ответ"
                    rows="1"
                    counter
                    :rules="dialogRules"
                  ></v-textarea>
                </v-form>
              </v-card-text>
            </v-col>
            <v-col class="ml-n5" md="2">
              <slot name="send">
                <input-file-simple
                  v-if="temporaryPictureUrl !== postImageSrc"
                  class="d-inline my-n6 mr-1"
                  @changeImageSrs="imageSrcChange($event)"
                  @changeImage="imageChange($event)"
                />
                <v-btn
                  class="my-n6"
                  :loading="loading"
                  x-small
                  rounded
                  :disabled="!postContent || !valid"
                  @click="createPost"
                  ><span style="color: #0277BD">Отправить</span></v-btn
                >
              </slot>
            </v-col>
          </v-row>
          <v-card-actions class="mr-6">
            <v-img
              v-if="postImageSrc"
              class="text-end"
              :src="postImageSrc"
              max-height="200"
              max-width="200"
              contain
            >
              <v-btn class="mt-n2 mr-n2" icon color="red" @click="deleteImage"
                ><v-icon>mdi-close-octagon-outline</v-icon></v-btn
              >
            </v-img>
          </v-card-actions>
          <v-card-text v-show="hiddenPosts.length" class="font-weight-black">
            <a style="text-decoration: none" @click="showNewPosts">
              <v-icon left>mdi-comment-multiple</v-icon
              ><span style="color: #607D8B">Новых ответов: {{ hiddenPosts.length }} </span></a
            >
          </v-card-text>
        </v-container>
        <v-container fluid>
          <v-row dense>
            <v-col v-for="post in localPosts" :key="post.id" cols="12">
              <transition appear name="dialog">
                <v-card color="#E1F5FE">
                  <v-container fluid>
                    <v-card-actions>
                      <v-avatar size="36" class="profile mt-n6">
                        <v-img v-if="post.userPhotoURL" :src="post.userPhotoURL" />
                        <v-icon v-else>mdi-account-outline</v-icon>
                      </v-avatar>
                      <v-col class="mt-n6">
                        <v-card-title
                          style="word-break: normal"
                          :class="{ 'subtitle-2 font-weight-bold': $vuetify.breakpoint.xs }"
                          v-text="post.userName"
                        ></v-card-title>
                        <v-card-subtitle
                          style="word-break: normal"
                          :class="{ caption: $vuetify.breakpoint.xs }"
                          >{{ post.dateCreation | formatDate }}
                        </v-card-subtitle>
                      </v-col>
                      <slot :userId="post.userId" name="acceptAnswer" />
                      <attention
                        v-if="admin || post.userId === user.id"
                        class="mt-n3 mr-n6"
                        :painting="{}"
                        @deletePost="deletePost(post.id)"
                      >
                        <template v-slot:button="{ on }">
                          <v-btn icon color="red" v-on="on"
                            ><v-icon>mdi-close-octagon-outline</v-icon></v-btn
                          >
                        </template>
                        <template v-slot:text>Вы действительно хотите удалить ответ?</template>
                      </attention>
                    </v-card-actions>
                    <v-card-text style="white-space: pre-line" class="mt-n6 text-justify"
                      >{{ post.content | trimLength(post.showContent) }}
                      <a
                        v-if="post.content.length >= 200 && !post.showContent"
                        @click="post.showContent = !post.showContent"
                        >ещё</a
                      ></v-card-text
                    >
                    <v-card-actions>
                      <v-img :src="post.postImageSrc" max-height="500" contain />
                    </v-card-actions>
                    <v-card-text>
                      <a
                        :class="{ caption: $vuetify.breakpoint.xs }"
                        style="text-decoration: none"
                        @click="post.showComments = !post.showComments"
                      >
                        <v-icon :small="$vuetify.breakpoint.xs" left color="#0277BD"
                          >mdi-comment-multiple</v-icon
                        ><span style="color:#0277BD">комментарии {{ post.comments }} </span></a
                      >
                      <a
                        style="text-decoration: none"
                        :class="{ 'ml-1 caption': $vuetify.breakpoint.xs }"
                        class="ml-4"
                        @click="likePost(post.id, post.likes)"
                      >
                        <span style="color:#0277BD">поддержать</span>
                      </a>
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <span v-on="on"
                            ><v-icon
                              :small="$vuetify.breakpoint.xs"
                              :color="post.likes.includes(user.id) ? 'red' : '#0277BD'"
                              right
                              >mdi-heart-multiple</v-icon
                            >
                            {{ post.likes.length }}</span
                          >
                        </template>
                        <span v-for="item in post.likesNameUser" :key="item"
                          >{{ item }} <br
                        /></span>
                      </v-tooltip>
                    </v-card-text>
                    <template v-if="post.showComments">
                      <v-row v-show="post.commentsArray.length" justify="center">
                        <v-col
                          v-for="comment in post.commentsArray"
                          :key="comment.id"
                          cols="12"
                          md="11"
                        >
                          <transition appear name="dialog">
                            <v-card shaped color="#FFF3E0">
                              <v-card-actions>
                                <v-avatar size="36" class="profile mt-n6">
                                  <v-img v-if="comment.userPhotoURL" :src="comment.userPhotoURL" />
                                  <v-icon v-else>mdi-account-outline</v-icon>
                                </v-avatar>
                                <v-col class="mt-n6">
                                  <v-card-title
                                    style="word-break: normal"
                                    :class="{
                                      'subtitle-2 font-weight-bold': $vuetify.breakpoint.xs
                                    }"
                                    v-text="comment.userName"
                                  ></v-card-title>
                                  <v-card-subtitle
                                    style="word-break: normal"
                                    :class="{ caption: $vuetify.breakpoint.xs }"
                                    >{{ comment.createdOn | formatDate }}</v-card-subtitle
                                  >
                                </v-col>
                                <attention
                                  v-if="admin || comment.userId === user.id"
                                  class="mt-n3 "
                                  :painting="{}"
                                  @deletePost="deleteComment(post.id, comment.id)"
                                >
                                  <template v-slot:button="{ on }">
                                    <v-btn icon color="red" v-on="on"
                                      ><v-icon>mdi-close-octagon-outline</v-icon></v-btn
                                    >
                                  </template>
                                  <template v-slot:text
                                    >Вы действительно хотите удалить коментарий?</template
                                  >
                                </attention>
                              </v-card-actions>
                              <v-card-text style="white-space: pre-line" class="mt-n6 text-justify"
                                >{{ comment.content | trimLength(comment.showContent)
                                }}<a
                                  v-if="comment.content.length >= 200 && !comment.showContent"
                                  @click="comment.showContent = !comment.showContent"
                                  >ещё</a
                                ></v-card-text
                              >
                              <v-card-actions>
                                <v-img
                                  v-if="comment.commentImageSrc"
                                  :src="comment.commentImageSrc"
                                  max-height="500"
                                  contain
                                />
                              </v-card-actions>
                              <v-card-text>
                                <a
                                  :class="{ caption: $vuetify.breakpoint.xs }"
                                  style="text-decoration: none"
                                  @click="likeComment(post.id, comment.id, comment.likes)"
                                >
                                  <span style="color:#0277BD">поддержать </span>
                                </a>
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <span v-on="on">
                                      <v-icon
                                        :small="$vuetify.breakpoint.xs"
                                        :color="comment.likes.includes(user.id) ? 'red' : '#0277BD'"
                                        >mdi-heart-multiple</v-icon
                                      >
                                      {{ comment.likes.length }}</span
                                    >
                                  </template>
                                  <span v-for="item in comment.likesNameUser" :key="item"
                                    >{{ item }}<br
                                  /></span>
                                </v-tooltip>
                              </v-card-text>
                            </v-card>
                          </transition>
                        </v-col>
                      </v-row>
                      <v-row justify="center" align="center" class="text-center">
                        <v-col md="1" cols="12">
                          <v-card-actions class="my-n6">
                            <v-spacer />
                            <v-avatar class="profile d-inline">
                              <v-img v-if="user.photoURL" :src="user.photoURL" />
                              <v-icon v-else>mdi-account-outline</v-icon>
                            </v-avatar>
                            <v-spacer />
                          </v-card-actions>
                        </v-col>
                        <v-col cols="12" md="9">
                          <v-card-text class="profile ">
                            <v-form v-model="validComment[post.id]">
                              <v-textarea
                                v-model="comments[post.id]"
                                class="mb-n12 mt-n4"
                                dense
                                outlined
                                rounded
                                auto-grow
                                filled
                                color="#0277BD"
                                label="Напишите комментарий..."
                                rows="1"
                                counter
                              />
                            </v-form>
                          </v-card-text>
                        </v-col>
                        <v-col class="ml-n5" md="2">
                          <input-file-simple
                            class="d-inline mr-1"
                            @changeImageSrs="changeImageSrcComment($event, post.id)"
                            @changeImage="changeImageComment($event, post.id)"
                          />
                          <v-btn
                            color="white"
                            style="background-color: #0277BD"
                            :loading="loading"
                            rounded
                            x-small
                            :disabled="!comments[post.id] || comments[post.id].length > 2000"
                            @click="addComment(post.id, post.userId)"
                            ><span style="color: #0277BD">Отправить</span></v-btn
                          >
                        </v-col>
                      </v-row>
                      <v-card-actions>
                        <v-img
                          v-if="post.commentImageSrc"
                          :src="post.commentImageSrc"
                          class="text-end"
                          max-height="100"
                          max-width="100"
                          contain
                        >
                          <v-btn
                            class="mt-n2 mr-n2"
                            text
                            icon
                            color="red"
                            @click="deleteImageComment(post.id)"
                            ><v-icon>mdi-close</v-icon></v-btn
                          >
                        </v-img>
                      </v-card-actions>
                    </template>
                  </v-container>
                </v-card>
              </transition>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  name: 'PostsComments',
  components: {
    InputFileSimple: () => import('./InputFileSimple'),
    Attention: () => import('./Attention')
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return '-'
      }
      let date = val.toDate()
      moment.locale('ru')
      return moment(date).fromNow()
    },
    trimLength(val, show) {
      if (val.length < 200 || show) {
        return val
      }
      return `${val.substring(0, 200)}...`
    }
  },
  props: {
    titleStudios: {
      type: String,
      required: true
    },
    stepId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    valid: false,
    validComment: {},
    postContent: '',
    comments: {},
    localPosts: [],
    postImageSrc: '',
    postImage: null,
    dialogRules: [v => v.length <= 3000 || 'Не более 3000 символов']
  }),
  computed: {
    ...mapState({
      posts: state => state.groupComments.posts,
      hiddenPosts: state => state.groupComments.hiddenPosts,
      postComments: state => state.groupComments.postComments,
      user: state => state.user.user,
      unsubscribeArray: state => state.groupComments.unsubscribeArray,
      temporaryPictureUrl: state => state.shared.temporaryPictureUrl
    }),
    userName() {
      if (this.user.firstName && this.user.lastName) {
        return this.user.firstName + ' ' + this.user.lastName
      } else if (this.user.firstName || this.user.lastName) {
        return this.user.firstName || this.user.lastName
      } else {
        return 'user'
      }
    },
    admin() {
      return this.$store.getters.admin
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  watch: {
    posts: {
      deep: true,
      handler() {
        let arrayPosts = []
        this.posts.forEach(post => {
          const commonElement = this.localPosts.find(elem => elem.id === post.id)
          if (commonElement) {
            let arrayComments = []
            post.commentsArray.forEach(comment => {
              if (commonElement.commentsArray.find(el => el.id === comment.id)) {
                arrayComments.push({
                  ...comment,
                  showContent: commonElement.commentsArray.find(el => el.id === comment.id)
                    .showContent
                })
              } else {
                arrayComments.push({ ...comment })
              }
            })
            arrayPosts.push({
              ...post,
              commentsArray: arrayComments,
              showComments: commonElement.showComments,
              showContent: commonElement.showContent,
              commentImageSrc: ''
            })
          } else {
            arrayPosts.push({
              ...post,
              commentsArray: post.commentsArray.map(comment => {
                return { ...comment }
              }),
              commentImageSrc: ''
            })
          }
        })
        this.localPosts = arrayPosts
      }
    },
    titleStudios: {
      deep: true,
      handler() {
        this.$store.dispatch('setPosts', {
          stepId: this.stepId,
          titleStudios: this.titleStudios
        })
      }
    },
    stepId: {
      deep: true,
      handler() {
        this.$store.dispatch('setPosts', {
          stepId: this.stepId,
          titleStudios: this.titleStudios
        })
      }
    },
    temporaryPictureUrl: {
      deep: true,
      handler() {
        this.postImageSrc = this.temporaryPictureUrl
      }
    }
  },
  created() {
    this.$store.dispatch('setPosts', {
      stepId: this.stepId,
      titleStudios: this.titleStudios
    })
  },
  beforeDestroy() {
    this.$store.commit('setPosts')
    this.$store.commit('setHiddenPosts')
    this.$store.dispatch('unsubscribe')
  },
  methods: {
    createPost() {
      this.$store
        .dispatch('createPost', {
          postData: {
            dateCreation: new Date(),
            content: this.postContent,
            userId: this.user.id,
            userName: this.user.firstName + ' ' + this.user.lastName,
            userPhotoURL: this.user.photoURL || '',
            comments: 0,
            showComments: false,
            showContent: false,
            likes: [],
            likesNameUser: [],
            commentsArray: [],
            postImageSrc: this.postImageSrc
          },
          postImage: this.postImage,
          stepId: this.stepId,
          titleStudios: this.titleStudios
        })
        .then(() => {
          this.postContent = ''
          this.postImage = null
          this.postImageSrc = ''
          this.$store.commit('changeTemporaryPictureUrl', null)
          this.$emit('createPost')
        })
    },
    showNewPosts() {
      let updatedPostArray = this.hiddenPosts.concat(this.posts)
      this.$store.commit('setHiddenPosts', null)
      this.$store.commit('setPosts', updatedPostArray)
    },
    addComment(postId, userId) {
      this.$store
        .dispatch('addComment', {
          content: this.comments[postId],
          postId: postId,
          image: this.comments[`image_${postId}`],
          stepId: this.stepId,
          titleStudios: this.titleStudios
        })
        .then(() => {
          this.comments[postId] = ''
          this.comments[`image_${postId}`] = null
          this.localPosts.find(post => post.id === postId).commentImageSrc = ''
          this.$emit('createComment', userId)
        })
    },
    likePost(postId, postLikes) {
      if (!postLikes.includes(this.user.id)) {
        this.$store.dispatch('likePost', {
          postId,
          userName: this.userName,
          stepId: this.stepId,
          titleStudios: this.titleStudios
        })
      }
    },
    likeComment(postId, commentId, commentLikes) {
      if (!commentLikes.includes(this.user.id)) {
        this.$store.dispatch('likeComment', {
          postId,
          commentId,
          userName: this.userName,
          stepId: this.stepId,
          titleStudios: this.titleStudios
        })
      }
    },
    imageSrcChange(imageSrc) {
      this.postImageSrc = imageSrc
    },
    imageChange(image) {
      this.postImage = image
    },
    deleteImage() {
      this.postImageSrc = ''
      this.postImage = null
    },
    changeImageSrcComment(imageSrc, id) {
      this.localPosts.find(post => post.id === id).commentImageSrc = imageSrc
    },
    changeImageComment(image, id) {
      this.comments[`image_${id}`] = image
    },
    deleteImageComment(id) {
      this.localPosts.find(post => post.id === id).commentImageSrc = ''
      this.comments[`image_${id}`] = null
    },
    deletePost(postId) {
      this.$store.dispatch('deletePost', {
        postId,
        stepId: this.stepId,
        titleStudios: this.titleStudios
      })
    },
    deleteComment(postId, commentId) {
      this.$store.dispatch('deleteComment', {
        postId,
        commentId,
        stepId: this.stepId,
        titleStudios: this.titleStudios
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.dialog-enter, .dialog-leave-to  {
  opacity: 0;
}
.dialog-enter-active, .dialog-leave-active  {
  transition: opacity 1s;
}
</style>
