<template>
  <v-row justify="center">
    <v-col cols="12" md="7">
      <v-card-actions>
        <v-btn color="red" icon @click="previousPage">
          <v-icon large>mdi-chevron-left</v-icon>
        </v-btn>
        <v-spacer />
        <v-row>
          <v-col v-for="(number, index) in paginationLength" :key="index" class="mx-n2">
            <v-btn
              v-if="number"
              :disabled="number > studioDoneLength + 1"
              fab
              x-small
              :color="page === number ? 'primary' : ''"
              @click="page = number"
              v-text="number"
            />
            <h4 v-else>...</h4>
          </v-col>
        </v-row>
        <v-spacer />
        <v-btn color="red" icon :disabled="!valid" @click="nextPage"
          ><v-icon large>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Paginations',
  props: {
    localDialog: {
      type: Object,
      required: true
    },
    titleStudios: {
      type: String,
      required: true
    },
    valid: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      page: 0
    }
  },
  computed: {
    studioLength() {
      return this.$store.getters.studioLength
    },
    studioDoneLength() {
      return this.$store.getters.studioDoneLength
    },
    paginationLength() {
      let localArray = []
      let left = this.page - 1
      let right = this.page + 2
      let counter
      this.studioLength.forEach(step => {
        if (+step === 1 || step === this.studioLength.length || (step >= left && step < right)) {
          if (counter) {
            if (step - counter !== 1) {
              localArray.push('')
            }
          }
          counter = step
          localArray.push(step)
        }
      })
      return localArray
    }
  },
  watch: {
    page() {
      if (this.page === +this.localDialog.id) {
        return
      }
      this.$router.push(`/studio/${this.titleStudios}/${this.page}`)
      this.$store.dispatch('changeShow')
    }
  },
  created() {
    this.page = +this.localDialog.id
  },
  methods: {
    previousPage() {
      if (this.page > 1) {
        this.page = this.page - 1
      } else {
        this.$router.push(`/studios/home/${this.titleStudios}`)
      }
    },
    nextPage() {
      if (this.page < this.studioLength.length) {
        this.page = this.page + 1
      } else {
        this.$router.push(`/studios/finalText/${this.titleStudios}`)
      }
      this.$emit('changeDone')
    }
  }
}
</script>

<style scoped />
