<template>
  <v-card justify="center">
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      style="display: none"
      @change="changePhoto"
    />
    <v-card-actions class="mt-12">
      <v-tooltip right nudge-top="90" nudge-left="30" dark>
        <template v-slot:activator="{ on }">
          <a class="mx-auto" v-on="on" @click="inputFile">
            <v-avatar class="profile mt-n12" size="130" color="blue lighten-4">
              <v-img :src="photoURL" lazy-src="" />
            </v-avatar>
          </a>
        </template>
        <span>Нажмите чтобы загрузить фото</span>
      </v-tooltip>
    </v-card-actions>

    <v-card-text>
      <h1 class="text-center">{{ firstName }} {{ lastName }}</h1>
    </v-card-text>
    <v-card-text class="text-center">
      <h3>{{ aboutMe }}</h3>
    </v-card-text>
    <v-card-text class="text-center" style="color: #FB8C00">
      <h3 v-if="user.club && user.club.creationTime">
        Член клуба MetaMorfosi <br />
        Cтатус активен до {{ statusActive }}
      </h3>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AvatarProfile',
  props: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    aboutMe: {
      type: String,
      required: true
    }
  },
  data: () => ({
    photoURL: ''
  }),
  computed: {
    user() {
      return this.$store.getters.user
    },
    statusActive() {
      return new Date(
        new Date(this.user.club.creationTime).setFullYear(
          new Date(this.user.club.creationTime).getFullYear() + 1
        )
      )
        .toISOString()
        .substr(0, 10)
    }
  },
  watch: {
    user: {
      deep: true,
      handler() {
        this.photoURL = this.user.photoURL || ''
      }
    }
  },
  created() {
    this.photoURL = this.user.photoURL || ''
  },
  methods: {
    inputFile() {
      this.$refs.fileInput.click()
    },
    changePhoto() {
      const typeFile = [
        'image/tiff',
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/x-icon',
        'image/svg+xml',
        'image/webp'
      ]
      const imageProfile = this.$refs.fileInput.files[0]
      if (imageProfile.size >= 1000000) {
        this.$store.commit('setError', 'Размерфайла не должен превышать 1000КБ')
      } else if (!typeFile.includes(imageProfile.type)) {
        this.$store.commit('setError', 'Неверный тип файла')
      } else {
        this.$store.dispatch('changePhotoUser', imageProfile)
      }
    }
  }
}
</script>

<style scoped />
