<template>
  <list-component
    title=" Записки арт-терапевта блог Надежды Навроцкой"
    :list="articles"
    @createPath="createPath"
  />
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Blog',
  components: {
    ListComponent: () => import('@/components/shared/ListComponent')
  },
  metaInfo: {
    title: 'Записки арт-терапевта | Блог Надежды Навроцкой',
    titleTemplate: null
  },
  computed: {
    ...mapState({
      articles: state => state.shared.articles,
      loading: state => state.shared.loading
    })
  },
  methods: {
    createPath(value) {
      this.$router.push(`/blog/${value}`)
    }
  }
}
</script>

<style scoped lang="stylus" />
