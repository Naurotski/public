<template>
  <v-select v-model="$i18n.locale" :items="langs" solo />
</template>

<script>
export default {
  name: 'LanguageSelection',
  data: () => ({
    langs: ['en', 'ru']
  })
}
</script>

<style scoped></style>
