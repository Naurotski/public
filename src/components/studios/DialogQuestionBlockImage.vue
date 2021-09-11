<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(item, index) in imageBlocksSrc[`block${idBlock}${index}`]"
        :key="index"
        cols="12"
        md="4"
      >
        <v-card-actions>
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 3 : 20" class="mx-auto">
              <v-img
                :id="index"
                ref="images"
                max-height="150"
                :src="item"
                contain
                :style="check === index ? 'opacity: 0.2' : 'opacity: 1'"
                @click="exchange(item, index)"
              />
            </v-card>
          </v-hover>
        </v-card-actions>
      </v-col>
    </v-row>
    <slot>
      <v-divider />
      <v-row>
        <v-col cols="12" md="3">
          <v-card-actions>
            <v-card class="mx-auto">
              <v-img max-height="150" :src="answerImg" contain />
            </v-card>
          </v-card-actions>
        </v-col>
      </v-row>
    </slot>
  </v-container>
</template>

<script>
export default {
  name: 'DialogQuestionBlockImage',
  props: {
    titleStudios: {
      type: String,
      required: true
    },
    idBlock: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    answerBlockImg: {
      type: String,
      required: true
    }
  },
  data: () => ({
    photoPositionUrl:
      'https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2FemptyPlace.png?alt=media&token=920bf2cc-8e37-4628-a36e-d5cf47dda7f1',
    answerImg: '',
    check: ''
  }),
  computed: {
    imageBlocksSrc() {
      return this.$store.getters.imageBlocksSrc
    }
  },
  created() {
    if (this.answerBlockImg) {
      this.answerImg = this.answerBlockImg
    } else {
      this.answerImg = this.photoPositionUrl
      this.$emit('changeAnswerImag', this.photoPositionUrl)
      this.$emit('changeValidImageBlocksSrc')
    }
  },
  methods: {
    exchange(item, index) {
      this.answerImg = item
      this.check = index
      this.$emit('changeAnswerImag', item)
    }
  }
}
</script>

<style scoped />
