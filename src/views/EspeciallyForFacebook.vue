<template>
  <v-container fluid>
    <dialog-privacy-policy :dialog-true="true" />
  </v-container>
</template>

<script>
export default {
  name: 'EspeciallyForFacebook',
  components: {
    DialogPrivacyPolicy: () => import('@/components/shared/DialogPrivacyPolicy')
  }
}
</script>

<style scoped></style>
