<template>
  <list-component title="Арт-терапия" :list="artTherapyListFilter" @createPath="createPath" />
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ArtTherapyList',
  metaInfo() {
    return {
      title: `Aрт-терапия Надежды Навроцкой`,
      titleTemplate: null,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: ``
        }
      ]
    }
  },
  components: {
    ListComponent: () => import('@/components/shared/ListComponent')
  },
  computed: {
    ...mapState({
      artTherapyList: state => state.artTherapy.artTherapyList
    }),
    artTherapyListFilter() {
      return this.artTherapyList.filter(item => !item.draft && !item.artNeurographics)
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
