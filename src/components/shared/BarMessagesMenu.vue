<template>
  <v-menu :close-on-content-click="false" offset-y>
    <template v-slot:activator="{ on }">
      <v-badge
        class="ml-n3 mr-6"
        :content="numberNewMessages"
        :value="numberNewMessages"
        color="green"
        overlap
      >
        <v-hover v-slot:default="{ hover }">
          <v-btn
            :elevation="hover ? 5 : 0"
            class=" mr-n3"
            icon
            v-on="on"
            @click="writeTimeViewingMessages"
          >
            <v-icon large>mdi-bell-outline</v-icon>
          </v-btn>
        </v-hover>
      </v-badge>
    </template>

    <v-list v-if="listMessagesUser.length" max-width="400" max-height="500">
      <div v-for="message in listMessagesUser" :key="message.id" style="background-color: white">
        <v-list-item>
          <v-list-item-content>
            <a style="text-decoration: none" :href="message.url"
              ><span style="color:black">{{ message.title }}</span></a
            >
            <p
              style="white-space: pre-line"
              class="body-2 text-justify font-weight-light"
              v-text="message.body"
            />
            <v-list-item-subtitle
              class="font-italic caption"
              v-text="new Date(message.date).toLocaleString()"
            />
          </v-list-item-content>
          <v-btn
            small
            class="mt-2 mr-n2 align-self-start"
            text
            icon
            color="red"
            @click="deleteMessage(message.id)"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-list-item>
        <v-divider />
      </div>
    </v-list>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BarMessagesMenu',
  data: () => ({
    numberNewMessages: 0
  }),
  computed: {
    ...mapState({
      listMessagesUser: state => state.messages.listMessagesUser
    }),
    user() {
      return this.$store.getters.user
    }
  },
  watch: {
    listMessagesUser: {
      deep: true,
      handler() {
        if (localStorage.getItem('timeViewingMessages') && this.listMessagesUser.length) {
          this.numberNewMessages = this.listMessagesUser.filter(
            message => +message.date > +localStorage.getItem('timeViewingMessages')
          ).length
        }
        if (this.listMessagesUser && this.listMessagesUser.length > 20) {
          this.listMessagesUser.forEach((messages, index) => {
            if (index > 19) {
              this.$store.dispatch('deleteMessageFromDatabase', { id: messages.id })
            }
          })
        }
      }
    }
  },
  methods: {
    writeTimeViewingMessages() {
      localStorage.setItem('timeViewingMessages', +new Date())
      this.numberNewMessages = 0
    },
    deleteMessage(id) {
      this.$store.dispatch('deleteMessageFromDatabase', { id })
    }
  }
}
</script>

<style scoped></style>
