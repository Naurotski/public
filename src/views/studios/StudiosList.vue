<template>
  <list-component
    class="studios"
    title="Психологические Студии"
    :list="listStudios"
    @createPath="createPath"
  />
</template>

<script>
export default {
  name: 'StudiosList',
  metaInfo: {
    title: 'Психологические Студии',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: `Студии - это игровое пространство для самостоятельного решения психологических проблем`
      }
    ]
  },
  components: {
    ListComponent: () => import('@/components/shared/ListComponent')
  },
  computed: {
    listStudios() {
      return this.$store.getters.listStudios.filter(
        studio => !studio.draft && studio.id !== 'neurography'
      )
    },
    user() {
      return this.$store.getters.user
    }
  },
  created() {
    if (this.listStudios.length === 0) {
      this.$store.dispatch('getListStudios', 'studios')
    }
  },
  methods: {
    createPath(value) {
      if (this.user.payments && this.user.payments[value]) {
        this.$router.push(`/studios/home/${value}`)
      } else {
        this.$router.push(`/studios/preview/${value}`)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
//.studios{
//  background-image url("https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/studios%2FIMG_6127.jpg?alt=media&token=da1ac264-7399-45f3-a74c-7ed5e5dd0609")
//  background-size cover
//  height 100%
//  background-attachment fixed
//}
</style>
