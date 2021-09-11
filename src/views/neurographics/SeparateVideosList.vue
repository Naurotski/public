<template>
  <list-component
    title="Нейрографика. Отдельные алгоритмы"
    :list="artTherapyListFilter"
    @createPath="createPath"
  />
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SeparateVideosList',
  metaInfo: {
    title: 'Нейрографика | Отдельные алгоритмы',
    titleTemplate: null,
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: `Нейрографика это эффективный инструмент для решения задач, достижения целей и исполнения желаний.`
      }
    ]
  },
  components: {
    ListComponent: () => import('@/components/shared/ListComponent')
  },
  computed: {
    ...mapState({
      artTherapyList: state => state.artTherapy.artTherapyList
    }),
    artTherapyListFilter() {
      return this.artTherapyList.filter(item => !item.draft && item.artNeurographics)
    }
  },
  created() {
    if (!this.artTherapyList.length) {
      this.$store.dispatch('getArtTherapy')
    }
  },
  methods: {
    createPath(id) {
      this.$router.push(`/artTherapyDescription/${id}`)
    }
  }
}
</script>

<style scoped />
