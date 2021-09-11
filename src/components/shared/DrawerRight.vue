<template>
  <v-navigation-drawer
    :value="drawerRight"
    color="blue lighten-5"
    clipped
    app
    floating
    right
    expand-on-hover
    bottom
    mobile-breakpoint="960"
    width="215"
  >
    <v-list nav dense>
      <v-list-item
        v-for="rubric in localeRubrics"
        :key="rubric.title"
        :to="`/gallery/${rubric.rubric}`"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ rubric.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ rubric.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'DrawerRight',
  props: {
    drawerRight: {
      type: null,
      required: true
    }
  },
  data: () => ({
    localeRubrics: []
  }),
  computed: {
    rubrics() {
      return this.$store.getters.rubrics
    },
    i18n() {
      return this.$i18n.locale
    }
  },
  watch: {
    i18n: {
      deep: true,
      handler() {
        this.localeRubrics = this.rubrics.map(rubric => {
          return {
            ...rubric,
            title: this.$t(`gallery.${rubric.rubric}`)
          }
        })
      }
    }
  },
  created() {
    this.localeRubrics = this.rubrics.map(rubric => {
      return {
        ...rubric,
        title: this.$t(`gallery.${rubric.rubric}`)
      }
    })
  }
}
</script>

<style scoped></style>
