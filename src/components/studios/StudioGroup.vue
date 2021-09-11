<template>
  <v-container
    v-if="dataStudio"
    class="backgroundImage"
    :style="{ 'background-image': `url(${dataStudio.backgroundSrc})` }"
    fluid
  >
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <transition appear name="dialog">
          <v-card v-if="stepStudio" class="mx-auto elevation-12">
            <v-progress-linear
              :active="loading"
              :indeterminate="loading"
              absolute
              color="#FB8C00"
            />
            <v-card-text class="blue lighten-4 title font-weight-regular text-justify"
              >{{ dataStudio.studioName }} <br />
              <span class="font-italic body-2">Шаг {{ stepStudio.id }}</span></v-card-text
            >
            <v-col v-for="(item, index) in stepStudio.questions" :key="index">
              <p
                style="white-space: pre-line"
                :class="{ 'body-2': $vuetify.breakpoint.xs }"
                class="title font-italic font-weight-medium text-justify"
                v-text="item.question"
              />
              <dialog-question-block-image
                v-if="imageBlocksSrc[`block${id}${index}`]"
                :id-block="id"
                :title-studios="titleStudios"
                :index="index"
                :answer-block-img="''"
                @changeAnswerImag="changeAnswerBlockImag"
                >.</dialog-question-block-image
              >
              <v-card-actions v-if="item.iframeSrc">
                <iframe
                  :src="item.iframeSrc"
                  width="100%"
                  height="300"
                  frameborder="0"
                  allow="accelerometer; fullscreen; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </v-card-actions>
              <v-card-actions>
                <v-img v-if="item.questionImg" :src="item.questionImg" />
              </v-card-actions>
            </v-col>
            <v-card-actions>
              <v-btn :to="`/studios/group/${titleStudios}`" color="red" icon>
                <v-icon large>mdi-chevron-left</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </transition>
      </v-col>
    </v-row>
    <posts-comments
      :step-id="id"
      :title-studios="titleStudios"
      @createPost="sendMessage"
      @createComment="sendMessageComment($event)"
    >
      <template v-slot:send>
        <p v-if="disabledBtnAnswer && !admin">отправлено</p>
      </template>
      <template v-slot:acceptAnswer="post">
        <p
          v-if="
            answersStudioGroup[post.userId] && answersStudioGroup[post.userId].includes(+id + 1)
          "
          style="color: green"
          class="caption font-weight-medium text-justify"
        >
          ответ принят
        </p>
        <v-btn v-else-if="admin" x-small @click="createAnswersStudioGroup(post.userId)"
          >Принять ответ</v-btn
        >
      </template>
    </posts-comments>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <transition appear name="dialog">
          <v-card v-if="stepStudio" class="mx-auto elevation-12">
            <v-card-actions>
              <v-btn :to="`/studios/group/${titleStudios}`" color="red" icon>
                <v-icon large>mdi-chevron-left</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from '../../store'
import { mapState } from 'vuex'
export default {
  name: 'StudioGroup',
  metaInfo() {
    if (this.dataStudio) {
      return {
        title: `Задание психологической студии в группе ${this.dataStudio.studioName}`,
        titleTemplate: null,
        meta: [
          {
            vmid: 'description',
            name: 'description',
            content: `${this.metaInfoDescription}`
          }
        ]
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (store.getters.user.payments && store.getters.user.payments[to.params.titleStudios]) {
      next()
    } else {
      store.dispatch('autoDataUser', { uid: store.getters.user.id }).then(() => {
        if (store.getters.user.payments && store.getters.user.payments[to.params.titleStudios]) {
          next()
        } else {
          next('studios?studioError=true')
        }
      })
    }
  },
  components: {
    DialogQuestionBlockImage: () => import('./DialogQuestionBlockImage'),
    PostsComments: () => import('../shared/PostsComments')
  },
  props: {
    titleStudios: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      loading: state => state.shared.loading,
      studioModel: state => state.dialogs.studioModel,
      imageBlocksSrc: state => state.dialogs.imageBlocksSrc,
      answersStudioGroup: state => state.dialogs.answersStudioGroup,
      posts: state => state.groupComments.posts,
      temporaryPictureUrl: state => state.shared.temporaryPictureUrl
    }),
    admin() {
      return this.$store.getters.admin
    },
    stepStudio() {
      return this.studioModel.find(step => step.id === this.id)
    },
    dataStudio() {
      return this.$store.getters.dataStudioGroup(this.titleStudios)
    },
    disabledBtnAnswer() {
      return this.posts.some(step => step.userId === this.user.id)
    },
    userName() {
      if (this.user.firstName && this.user.lastName) {
        return this.user.firstName + ' ' + this.user.lastName
      } else if (this.user.firstName || this.user.lastName) {
        return this.user.firstName || this.user.lastName
      } else {
        return this.user.email
      }
    },
    metaInfoDescription() {
      return this.dataStudio.shortDescription
        ? this.dataStudio.shortDescription
        : 'Студии - это игровое пространство для самостоятельного решения психологических проблем'
    }
  },
  watch: {
    titleStudios: {
      deep: true,
      handler() {
        this.$store
          .dispatch('fetchStudioModel', {
            titleStudios: this.titleStudios,
            typeExercise: 'studiosGroup'
          })
          .then(() => {
            this.$store.dispatch('fetchImageBlocksSrc', {
              titleStudio: this.titleStudios,
              typeExercise: 'studiosGroup'
            })
          })

        this.$store.dispatch('fetchAnswersStudioGroup', { titleStudios: this.titleStudios })
      }
    }
  },
  created() {
    if (!this.dataStudio) {
      this.$store.dispatch('getListStudios', 'studiosGroup')
    }
    this.$store
      .dispatch('fetchStudioModel', {
        titleStudios: this.titleStudios,
        typeExercise: 'studiosGroup'
      })
      .then(() => {
        this.$store.dispatch('fetchImageBlocksSrc', {
          titleStudio: this.titleStudios,
          typeExercise: 'studiosGroup'
        })
      })
    this.$store.dispatch('fetchAnswersStudioGroup', { titleStudios: this.titleStudios })
  },
  methods: {
    createAnswersStudioGroup(userId) {
      this.$store
        .dispatch('createAnswersStudioGroup', {
          titleStudios: this.titleStudios,
          stepId: +this.id + 1,
          userId
        })
        .then(() => {
          this.$store
            .dispatch('writeMessageToDatabase', {
              userId,
              title: this.dataStudio.studioName,
              body: `Шаг:${this.stepStudio.id} - Ответ принят`,
              url: this.$route.path,
              date: +new Date()
            })
            .then(() => {
              this.$store.dispatch('sendMessageToToken', {
                userId,
                title: this.dataStudio.studioName,
                body: `Шаг:${this.stepStudio.id} - Ответ принят`,
                url: `https://metamorfosi.eu${this.$route.path}`
              })
            })
        })
    },
    changeAnswerBlockImag(event) {
      if (
        event !==
        'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2FemptyPlace.png?alt=media&token=920bf2cc-8e37-4628-a36e-d5cf47dda7f1'
      ) {
        this.$store.commit('changeTemporaryPictureUrl', event)
      }
    },
    sendMessage() {
      this.$store
        .dispatch('writeMessageToDatabase', {
          userId: [
            'DbpeGSc0zmMTI7KTKphB3ifMwkd2',
            'oYKA82NaEcaEKIF2L9b7gqHQmvl2',
            '87jVFewEQiMr17beEtfOPDx2XjP2'
          ],
          title: this.dataStudio.studioName,
          body: `Шаг:${this.stepStudio.id} - ${this.userName}`,
          url: this.$route.path,
          date: +new Date()
        })
        .then(() => {
          this.$store.dispatch('sendMessage', {
            topic: 'adminStudiosGroup',
            title: this.dataStudio.studioName,
            body: `Шаг:${this.stepStudio.id} - ${this.userName}`,
            url: `https://metamorfosi.eu${this.$route.path}`
          })
        })
    },
    sendMessageComment(userId) {
      this.$store
        .dispatch('writeMessageToDatabase', {
          userId,
          title: this.dataStudio.studioName,
          body: `Шаг:${this.stepStudio.id} - Новый комментарий`,
          url: this.$route.path,
          date: +new Date()
        })
        .then(() => {
          this.$store.dispatch('writeMessageToDatabase', {
            userId: [
              'DbpeGSc0zmMTI7KTKphB3ifMwkd2',
              'oYKA82NaEcaEKIF2L9b7gqHQmvl2',
              '87jVFewEQiMr17beEtfOPDx2XjP2'
            ],
            title: this.dataStudio.studioName,
            body: `Шаг:${this.stepStudio.id} - Новый комментарий`,
            url: this.$route.path,
            date: +new Date()
          })
        })
        .then(() => {
          this.$store.dispatch('sendMessageToToken', {
            userId,
            title: this.dataStudio.studioName,
            body: `Шаг:${this.stepStudio.id} - Новый комментарий`,
            url: `https://metamorfosi.eu${this.$route.path}`
          })
        })
    }
  }
}
</script>

<style scoped lang="stylus">
.backgroundImage{
  background-size cover
  height 100%
  background-attachment: fixed;
}
.v-card{
  background: rgba(255, 243, 224, 0.9) !important
  padding: 10px
}
.dialog-enter, .dialog-leave-to  {
  opacity: 0;
}
.dialog-enter-active, .dialog-leave-active  {
  transition: opacity 1s;
}
</style>
