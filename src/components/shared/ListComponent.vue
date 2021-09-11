<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="10">
        <v-card :loading="loading">
          <v-card-text
            class="text-center title font-weight-bold"
            :class="{ 'subtitle-2 font-weight-bold': $vuetify.breakpoint.xs }"
            style="color: #FB8C00"
            ><h1 v-text="title"></h1
          ></v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <transition-group class="row align-center justify-center" appear name="fadeGroup">
      <slot />
      <v-col v-for="item in list" :key="item.id" cols="12" sm="6" md="4">
        <v-card class="mx-auto" max-width="400">
          <v-img max-height="200px" :src="item.imageSrc" />
          <v-card-text
            v-if="item.shortDescription"
            class="text-justify"
            v-text="item.shortDescription"
          />
          <v-card-actions>
            <v-spacer />
            <v-btn text color="orange" @click="createPath(item.id)">
              Погрузиться
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </transition-group>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ListComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState({
      loading: state => state.shared.loading
    })
  },
  methods: {
    createPath(id) {
      this.$emit('createPath', id)
    }
  }
}
</script>

<style scoped lang="stylus">
.fadeGroup-enter-active, .fadeGroup-leave-active {
  transition: opacity 2s;
}
.fadeGroup-enter, .fadeGroup-leave-to {
  opacity: 0;
}
</style>
