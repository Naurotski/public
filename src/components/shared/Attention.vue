<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="350">
      <template v-slot:activator="{ on }">
        <slot :on="on" name="button"><v-btn text color="red" v-on="on">Удалить</v-btn></slot>
      </template>

      <v-card>
        <v-toolbar dark color="red">
          <v-toolbar-title>Внимание</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="text-center">
          <h3 class="mt-3" style="color:red;">
            <slot name="text">Вы действительно хотите удалить этот шедевр?</slot>
          </h3></v-card-text
        >
        <v-divider></v-divider>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn :x-small="$vuetify.breakpoint.xs" color="primary" text @click="dialog = false"
            >Отмена</v-btn
          >
          <v-btn :x-small="$vuetify.breakpoint.xs" :loading="loading" color="red" @click="onDelete"
            ><slot name="buttonName">Удалить</slot></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Attention',
  props: {
    painting: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    dialog: false
  }),
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    onDelete() {
      if (this.painting.id) {
        this.$store.dispatch('deletePainting', { id: this.painting.id })
        this.$router.push(`/gallery/${this.painting.rubric}`)
      } else {
        this.$emit('deletePost')
        this.dialog = false
      }
    }
  }
}
</script>

<style scoped></style>
