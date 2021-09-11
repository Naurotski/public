<template>
  <v-dialog v-model="switchDialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn color="#FB8C00" rounded v-on="on">Начать</v-btn>
    </template>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-form ref="form" v-model="valid" class="pa-4 pt-6">
            <v-col v-for="(item, index) in localDialog.questions" :key="index">
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
                <v-img v-if="item.questionImg && !checkNeurographics" :src="item.questionImg" />
              </v-card-actions>
              <v-textarea
                v-model="localDialog.questions[index].answer"
                auto-grow
                filled
                color="deep-purple"
                :label="`Ответ`"
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
            </v-col>
          </v-form>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="closeDialog">Закрыть</v-btn>
            <v-btn color="#FB8C00" @click="saveDialog">Сохранить</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogCalendar',
  components: {
    DialogQuestionBlockImage: () => import('../studios/DialogQuestionBlockImage'),
    InputFile: () => import('../shared/InputFile')
  },
  props: {
    id: {
      type: String,
      required: true
    },
    titleStudios: {
      type: String,
      required: true
    },
    checkNeurographics: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    switchDialog: false,
    localDialog: {},
    valid: false,
    validImageBlocksSrc: true,
    photoPositionUrl:
      'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2FemptyPlace.png?alt=media&token=920bf2cc-8e37-4628-a36e-d5cf47dda7f1',
    dialogRules: [
      v => !!v || 'Необходимо ответить',
      v => (v && v.length >= 2) || 'Ответ должен быть не менее 2 символов',
      v => (v && v.length <= 2000) || 'Ответ должен быть не более 2000 символов'
    ]
  }),
  computed: {
    dialog() {
      return this.$store.getters.dialog(this.id)
    },
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
  watch: {
    validDialog: {
      deep: true,
      handler() {
        this.localDialog.done = !!this.validDialog
      }
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
        typeExercise: 'calendars'
      })
      this.switchDialog = false
      this.localDialog.questions.forEach(question => {
        if (question.iframeSrc) {
          const temporaryStorage = question.iframeSrc
          question.iframeSrc = ''
          setTimeout(() => (question.iframeSrc = temporaryStorage), 100)
        }
      })
    },
    closeDialog() {
      this.switchDialog = false
      this.localDialog.questions.forEach(question => {
        if (question.iframeSrc) {
          const temporaryStorage = question.iframeSrc
          question.iframeSrc = ''
          setTimeout(() => (question.iframeSrc = temporaryStorage), 100)
        }
      })
    }
  }
}
</script>

<style scoped />
