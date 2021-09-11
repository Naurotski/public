<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-hover v-slot:default="{ hover }">
        <v-btn :elevation="hover ? 5 : 0" icon class="ma-auto" v-on="on">
          <v-avatar class="profile">
            <v-img v-if="user.photoURL" :src="user.photoURL" lazy-src="" />
            <v-icon v-else>mdi-account-outline</v-icon>
          </v-avatar>
        </v-btn>
      </v-hover>
    </template>
    <v-list>
      <v-list-item to="/userProfile">
        <v-list-item-title><v-icon left>mdi-account-outline</v-icon>Профиль</v-list-item-title>
      </v-list-item>
      <v-list-item @click="onLogout">
        <v-list-item-title><v-icon left>mdi-exit-run</v-icon>Выход</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'BarUserMenu',
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logoutUser')
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped lang="stylus" />
