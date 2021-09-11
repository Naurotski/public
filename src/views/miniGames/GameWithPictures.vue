<template>
  <v-container fluid>
    <transition name="result" mode="out-in">
      <div v-if="selected" key="save">
        <transition-group
          v-if="pictures"
          appear
          name="cell"
          tag="div"
          class="row align-center justify-center"
        >
          <v-col
            v-for="picture in pictures"
            :key="picture"
            class="cell-item"
            :cols="dialog ? 3 : 6"
            :sm="dialog ? 2 : 4"
            :md="dialog ? 1 : 3"
          >
            <v-card elevation="15">
              <v-img
                :src="picture"
                aspect-ratio="1"
                class="cursorPointer addedImage grey lighten-2"
                @click="selectPicture(picture)"
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </v-col>
        </transition-group>
        <v-card-text
          v-if="!dialog"
          style="white-space: pre-line; color: #FB8C00"
          :class="{ 'body-2': $vuetify.breakpoint.xs }"
          class="text-center headline"
        >
          Погрузитесь в картины (не кликайте на них, просто посмотрите, представьте себя "внутри"
          картин), выберите ту, которая отзывается вам больше всего и только после выбора нажмите на
          нее, чтобы увидеть интерпретацию
        </v-card-text>
      </div>
      <div v-else key="edit">
        <v-row class="wrap1 mt-15" justify="center" align="center">
          <v-col cols="12" md="5" class="col1">
            <div class="back" :class="{ backHover: sensor }">
              <v-card elevation="15">
                <v-img
                  class="cursorPointer"
                  height="400px"
                  contain
                  :src="selectedPicture.imageSrc"
                  @click="sensor = !sensor"
                />
              </v-card>
            </div>
            <v-card
              elevation="15"
              class="front d-flex flex-column align-center justify-center"
              :class="{ frontHover: sensor }"
            >
              <v-btn icon style="position: absolute; top: 0; left: 0" @click="sensor = !sensor"
                ><v-icon>mdi-horizontal-rotate-counterclockwise mdi-rotate-270</v-icon>
              </v-btn>
              <v-card-text
                :class="{ caption: $vuetify.breakpoint.xs }"
                class="subtitle-1 text-center"
                v-text="selectedPicture.imageName || ''"
              />
              <v-card-text
                style="color: #283593"
                :class="{ 'body-2': $vuetify.breakpoint.xs }"
                class="headline text-center"
                v-text="selectedPicture.imageDescription || ''"
              />
              <v-card-text
                :class="{ caption: $vuetify.breakpoint.xs }"
                class=" subtitle-1 text-justify "
                >Продолжить работу с данным запросом вы можете в
                {{ selectedPicture.linkText }}</v-card-text
              >
              <v-card-actions style="align-self: flex-end">
                <v-btn :x-small="$vuetify.breakpoint.xs" to="/">На главную</v-btn>
                <v-btn :x-small="$vuetify.breakpoint.xs" @click="restart">Играть ещё</v-btn>
                <v-btn :x-small="$vuetify.breakpoint.xs" @click="redirect">Продолжить</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </transition>

    <div v-if="list" class="text-center">
      <v-dialog v-model="dialog" persistent width="500">
        <v-card class="mx-auto" max-width="500" tile>
          <v-toolbar color="#FB8C00">
            <v-toolbar-title style="white-space: pre-line"
              >Терапевтические игры с картинами</v-toolbar-title
            >
          </v-toolbar>
          <v-list rounded>
            <v-card-text v-text="question" />
            <v-divider />
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in list" :key="i" @click="select(item)">
                <v-list-item-content>
                  <v-list-item-title
                    style="white-space: pre-line"
                    v-text="item.name"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-divider />
          <v-card-actions v-if="parentId">
            <v-btn :x-small="$vuetify.breakpoint.xs" text color="#90CAF9" @click="back">
              <v-icon :x-small="$vuetify.breakpoint.xs" right>mdi-arrow-left</v-icon
              >Вернуться</v-btn
            >
          </v-card-actions>
          <v-card-actions v-else>
            <v-btn :x-small="$vuetify.breakpoint.xs" text color="#90CAF9" to="/">
              Выйти из игры</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'GameWithPictures',
  metaInfo() {
    return {
      title: `Игра`,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: `Искусство беседует с нашим бессознательным. Погружаясь в картины, вы можете получать подсказки и даже полноценные ответы на свои актуальные запросы.`
        }
      ]
    }
  },
  data() {
    return {
      selected: true,
      sensor: false,
      dialog: true,
      list: '',
      problem: null,
      pictures: [],
      selectedPicture: null,
      question: '',
      parentId: ''
    }
  },
  computed: {
    ...mapState({
      listProblems: state => state.games.listProblems,
      listGamePictures: state => state.games.listGamePictures
    }),
    fullListGamePicturesSrc() {
      return this.$store.getters.fullListGamePicturesSrc
    },
    problemsIntermediateResult() {
      let array = this.listProblems.map(elem => {
        return { ...elem, imagesSrc: [...elem.imagesSrc] }
      })
      array.forEach(item => {
        array.forEach(problem => {
          if (item.parentId === problem.id) {
            if (!problem.children) {
              problem.children = []
            }
            problem.children.push(item)
          }
        })
      })
      return array
    },
    problems() {
      const children = this.problemsIntermediateResult.filter(
        elem => elem.parentId === '0' && !elem.draft
      )
      return [
        {
          id: '0',
          name: 'Начать',
          question: 'Какая тема для вас сейчас актуальна?',
          welcome:
            'Искусство беседует с нашим бессознательным. Погружаясь в картины, вы можете получать подсказки и даже полноценные ответы на свои актуальные запросы.',
          children
        }
      ]
    }
  },
  created() {
    if (!this.fullListGamePicturesSrc.length) {
      this.$store
        .dispatch('getImagesGamePictures')
        .then(() => (this.pictures = this.fullListGamePicturesSrc))
      this.$store.dispatch('getListProblems').then(() => {
        this.list = this.problems
        this.question = this.list[0].welcome
      })
    } else {
      this.pictures = this.fullListGamePicturesSrc
      this.list = this.problems
      this.question = this.list[0].welcome
    }
  },
  methods: {
    select(item) {
      this.parentId = item.parentId || ''
      this.question = item.question
      if (item.children) {
        this.list = item.children
        if (item.id !== '0') {
          this.pictures = item.imagesSrc
        }
      } else {
        this.dialog = false
        this.pictures = item.imagesSrc
        this.list = this.problems
      }
      this.pictures.sort(() => Math.random() - 0.5)
    },
    back() {
      const parent = this.listProblems.find(item => item.id === this.parentId)
      if (!parent) {
        this.pictures = this.fullListGamePicturesSrc
        this.question = 'Какая тема для вас сейчас актуальна?'
      } else {
        this.pictures = parent.imagesSrc
        this.question = parent.question
      }
      this.list = this.problemsIntermediateResult.filter(
        elem => elem.parentId === this.parentId && !elem.draft
      )
      if (this.parentId === '0') {
        this.parentId = ''
      } else {
        this.parentId = parent.parentId
      }
    },
    selectPicture(url) {
      this.selectedPicture = this.listGamePictures.find(item => item.imageSrc === url)
      this.selected = false
    },
    restart() {
      this.pictures = []
      this.selected = true
      this.problem = null
      this.selectedPicture = null
      this.list = this.problems
      this.question = this.list[0].welcome
      this.dialog = true
      this.pictures = this.fullListGamePicturesSrc.slice(0, 100)
      setTimeout(() => (this.sensor = false), 500)
    },
    redirect() {
      if (this.selectedPicture.link) {
        this.$router.push(this.selectedPicture.link)
      } else {
        this.$router.push('/')
      }
      this.selected = !this.selected
    }
  }
}
</script>

<style scoped lang="stylus">
.cell-item {
  transition: all 1s;
}
.cell-enter, .cell-leave-to
{
  opacity: 0;
}
.cell-leave-active {
  position: absolute;
}
.col1{
  height 400px
  perspective 1000px
}
.front, .back{
  position absolute
  width 100%
  height 100%
  left 0
  top 0
  transition 1s
  backface-visibility hidden
}
.back{
  transform rotateY(180deg)
  animation: rotateBack 3.5s 0.5s
}
.front{
  background-color #FFB74D !important
  animation: rotateFont 3.5s 0.5s
}
@keyframes rotateFont{
  0% {transform: rotateY(0deg)}
  50% {transform: rotateY(180deg)}
  100% {transform: rotateY(0deg)}
}
@keyframes rotateBack{
  0% {transform: rotateY(180deg)}
  50% {transform: rotateY(360deg)}
  100% {transform: rotateY(180deg)}
}
.frontHover {
  transform rotateY(180deg)
}
.backHover{
  transform rotateY(360deg)
}

.result-enter-active {
  transform-origin top
  animation: bounce-in 1.5s;
}
.result-leave-active {
  transform-origin top
  animation: bounce-in 1s  reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.addedImage{
  transition: all 1s;
}
</style>
