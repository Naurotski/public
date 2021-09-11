<template>
  <v-form ref="form" v-model="valid" class="pa-4 pt-6">
    <div v-for="(item, index) in localDialog.questions" :key="index">
      <p
        style="white-space: pre-line"
        :class="{ 'body-2': $vuetify.breakpoint.xs }"
        class="title font-italic font-weight-medium text-justify"
        v-text="`${index + 1}. ${item.question}`"
      />

      <dialog-question-block-image
        v-if="imageBlocksSrc[`block${id}${index}`]"
        :id-block="id"
        :title-studios="titleStudios"
        :index="index"
        :answer-block-img="item.answerBlockImg || ''"
        @changeAnswerImag="changeAnswerBlockImag($event, index)"
        @changeValidImageBlocksSrc="changeValidImageBlocksSrc($event, index)"
      />

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
      <v-textarea
        v-model="localDialog.questions[index].answer"
        auto-grow
        filled
        color="deep-purple"
        :label="`Ответ ${index + 1}`"
        rows="1"
        counter
        :rules="dialogRules"
      />
      <input-file
        v-if="item.answerImg"
        :image-src="item.answerImg"
        @changeImageSrs="imageSrcChange($event, index)"
        @changeImage="imageChange($event, index)"
      />
    </div>
    <v-divider />
    <v-col class="text-center">
      <v-btn color="primary" @click="saveDialog">Сохранить</v-btn>
    </v-col>
    <v-divider />
    <paginations
      :local-dialog="localDialog"
      :title-studios="titleStudios"
      :valid="validDialog"
      @changeDone="changeDone"
    />
  </v-form>
</template>

<script>
export default {
  name: 'StudioDialog',
  components: {
    DialogQuestionBlockImage: () => import('./DialogQuestionBlockImage'),
    InputFile: () => import('../shared/InputFile'),
    Paginations: () => import('../shared/Paginations')
  },
  props: {
    dialog: {
      type: Object,
      required: true
    },
    titleStudios: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    localDialog: {},
    valid: false,
    validImageBlocksSrc: true,
    photoPositionUrl:
      'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2FemptyPlace.png?alt=media&token=920bf2cc-8e37-4628-a36e-d5cf47dda7f1',
    dialogRules: [
      v => !!v || 'Необходимо ответить',
      v => (v && v.length >= 3) || 'Ответ должен быть не менее 3 символов',
      v => (v && v.length <= 2000) || 'Ответ должен быть не более 2000 символов'
    ]
  }),
  computed: {
    validDialog() {
      return (
        this.valid &&
        !this.localDialog.questions.some(item => item.answerImg === this.photoPositionUrl) &&
        this.validImageBlocksSrc
      )
    },
    imageBlocksSrc() {
      return this.$store.getters.imageBlocksSrc
    }
  },
  created() {
    this.localDialog = {
      done: this.dialog.done || false,
      id: this.dialog.id,
      questions: this.dialog.questions.map(item => {
        return { ...item }
      })
    }
  },
  beforeDestroy() {
    this.$store.dispatch('changeUserStudio', {
      localDialog: {
        done: this.localDialog.done,
        id: this.localDialog.id,
        questions: this.localDialog.questions.map(item => {
          return { ...item }
        })
      },
      titleStudios: this.titleStudios,
      typeExercise: 'studios'
    })
  },
  methods: {
    changeDone() {
      this.localDialog.done = true
    },
    imageSrcChange(imageSrc, index) {
      this.localDialog.questions[index].answerImg = imageSrc
    },
    imageChange(image, index) {
      this.localDialog.questions[index].image = image
    },
    changeAnswerBlockImag(imageSrc, index) {
      this.localDialog.questions[index].answerBlockImg = imageSrc
      if (!this.localDialog.questions.some(item => item.answerBlockImg === this.photoPositionUrl)) {
        this.validImageBlocksSrc = true
      }
    },
    changeValidImageBlocksSrc() {
      this.validImageBlocksSrc = false
    },
    saveDialog() {
      this.$store.dispatch('changeUserStudio', {
        localDialog: {
          done: this.localDialog.done,
          id: this.localDialog.id,
          questions: this.localDialog.questions.map(item => {
            return { ...item }
          })
        },
        titleStudios: this.titleStudios,
        typeExercise: 'studios'
      })
    }
  }
}
</script>

<style scoped />
