<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn text class="mr-2" v-on="on"> <v-icon left>mdi-wrench-outline</v-icon>ADMIN </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index" :to="item.url">
        <v-list-item-title
          ><v-icon left>{{ item.icon }}</v-icon
          >{{ item.title }}</v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'BarSettingsMenu',
  data: () => ({
    items: [
      { title: 'Мини Игры', icon: 'mdi-pirate', url: '/miniGames' },
      { title: 'Test Page', icon: 'mdi-skull', url: '/testPage' },
      {
        title: 'Арт-терапия',
        icon: 'mdi-brush',
        url: '/artTherapyList'
      },
      {
        title: 'Календарь',
        icon: 'mdi-calendar-heart',
        url: '/calendars'
      }
    ]
  })
}
</script>

<style scoped />
