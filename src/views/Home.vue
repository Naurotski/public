<template>
  <v-container fluid class="smooth">
    <v-row no-gutters>
      <v-col class="hidden-sm-and-down" md="6">
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2Fsito5.jpg?alt=media&token=7b64f046-74ad-4af3-9ca8-2623eecfe79e"
          height="100%"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-row style="height: 100%" align="center" justify="center">
          <v-col cols="10" md="7" class="text-center">
            <p
              :class="{ 'display-2 v-heading font-weight-light': $vuetify.breakpoint.xs }"
              class="display-3 v-heading font-weight-light"
            >
              Добро пожаловать
            </p>
            <p class="title font-weight-light" style="line-height: 1.7 !important;">
              MetaMorfosi - виртуальное пространство психологических игр, погружения в
              бессознательное и арт-терапии. Психосоматика, психология отношений, мотивация,
              развитие творческого потенциала, раскрытие талантов, искусство.
            </p>
            <dialog-video />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row style="background-color: #4FC3F7" no-gutters>
      <v-col class="text-center pa-5" cols="12" md="6">
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="12">
            <h1
              :class="{ 'display-2 v-heading font-weight-light': $vuetify.breakpoint.xs }"
              class="display-3 v-heading mb-3 font-weight-light info--text"
            >
              MetaMorfosi
            </h1>
            <p class="title font-weight-light mb-5" style="line-height: 1.7 !important;">
              Погружайтесь в наше виртуальное пространство
            </p>
          </v-col>

          <v-col v-for="rubric in rubrics" :key="rubric.name" class="text-center" cols="12" sm="6">
            <router-link :to="rubric.url" style="text-decoration: none">
              <v-avatar class="elevation-6 mb-2" color="#FB8C00" size="64" tile>
                <v-icon dark size="52" v-text="rubric.icon" />
              </v-avatar>
            </router-link>
            <div>
              <p class="title font-weight-light" style="line-height: 1.7 !important;">
                <span class="mb-2" v-text="rubric.name" /> <br />
                <i v-text="rubric.blurb" />
              </p>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="hidden-sm-and-down" md="6">
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2Fsito3.jpg?alt=media&token=67dead76-9665-4a77-946f-a0fe25d687ed"
          height="100%"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="hidden-sm-and-down" md="6">
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2Fsito2.jpg?alt=media&token=5e047023-f369-465f-9c84-0500a431f43f"
          height="100%"
        />
      </v-col>
      <v-col style="background-color: #4FC3F7" cols="12" md="6">
        <v-row style="height: 100%" align="center" justify="center">
          <v-col class="text-center pa-5">
            <h1 class="display-3 v-heading mb-3 font-weight-light info--text">Новые студии</h1>
            <p class="title font-weight-light mb-5" style="line-height: 1.7 !important;">
              Здесь вы найдете новые арт-студии для самостоятельного погружения. <br />
              Это универсальный способ самостоятельной работы с запросом любого масштаба.
            </p>
            <v-row>
              <v-col v-for="studio in topListStudios" :key="studio.id" cols="12" md="6">
                <v-hover v-slot:default="{ hover }">
                  <v-card :elevation="hover ? 3 : 20" class="mx-auto">
                    <v-img
                      class="cursorPointer"
                      :src="studio.imageSrc"
                      @click="createPath(studio.id)"
                    />
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="white" no-gutters>
      <v-col cols="12" md="6">
        <v-row style="height: 100%" align="center" justify="center">
          <v-col cols="10" md="7" class="text-center">
            <p
              :class="{ 'display-2 v-heading font-weight-light': $vuetify.breakpoint.xs }"
              class="display-3 v-heading font-weight-light"
            >
              Обо мне
            </p>
            <p class="title font-weight-light" style="line-height: 1.7 !important;">
              Психолог, художник, арт-терапевт, телесный терапевт. Человек, который создает новые
              пространства и новые судьбы. Автор многочисленных программ и тренингов по раскрытию
              внутреннего потенциала, оздоровления, самопомощи. Основатель MetaMorfosi: Art. Game.
              Transformation и автор арт-терапевтического альбома «Маленькие шаги большой души».
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="hidden-sm-and-down" md="6">
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/first-project-6daea.appspot.com/o/admin%2Fsito4.jpg?alt=media&token=d64d1351-1bba-4aea-8ae6-d5a3840ff975"
          height="100%"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  metaInfo: {
    title: 'MetaMorfosi | Нейрографика, арт-терапия и психология',
    titleTemplate: null,
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content:
          'MetaMorfosi - виртуальное пространство психологических игр, нейрографики, погружения в бессознательное и арт-терапии. Психосоматика, психология отношений, мотивация, развитие творческого потенциала, раскрытие талантов, искусство.'
      }
    ]
  },
  components: {
    DialogVideo: () => import('../components/shared/DialogVideo')
  },
  data: () => ({
    rubrics: [
      {
        name: 'Психологические студии',
        icon: 'mdi-human-male-board',
        url: '/studios',
        blurb: ''
      },
      {
        name: 'Игры с картинами',
        icon: 'mdi-pirate',
        url: '/miniGames/GameWithPictures',
        blurb: ''
      },
      // {
      //   name: 'Арт-терапия',
      //   icon: 'mdi-brush',
      //   url: '/artTherapyList',
      //   blurb: ''
      // },
      {
        name: 'Арт-календарь',
        icon: 'mdi-calendar-heart',
        url: '/calendars',
        blurb: ''
      },
      {
        name: 'Нейрографика',
        icon: 'mdi-lead-pencil',
        url: '/neurographicsList',
        blurb: ''
      },
      {
        name: 'Галерея',
        icon: 'mdi-palette-outline',
        url: '/galleryList',
        blurb: ''
      },
      {
        name: 'Блог',
        icon: 'mdi-book-open-page-variant',
        url: '/blog',
        blurb: ''
      }
      // {
      //   name: 'Медитации',
      //   icon: 'mdi-meditation',
      //   url: '/studios/preview/Timelifes',
      //   blurb: ''
      // }
    ]
  }),
  computed: {
    listStudios() {
      return this.$store.getters.listStudios.filter(studio => !studio.draft)
    },
    topListStudios() {
      return this.$store.getters.listStudios.filter(studio => !studio.draft).slice(0, 6)
    },
    user() {
      return this.$store.getters.user
    },
    admin() {
      return this.$store.getters.admin
    },
    articles() {
      return this.$store.getters.articles
    }
  },
  created() {
    if (this.listStudios.length === 0) {
      this.$store.dispatch('getListStudios', 'studios')
    }
    if (this.$route.query['paymentError']) {
      this.$store.commit(
        'setError',
        'Пожалуйста, произведите оплату, чтобы получить доступ к этой странице'
      )
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
.smooth {
  transform-origin top
  animation: bounce-in 2s
}
@keyframes bounce-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
