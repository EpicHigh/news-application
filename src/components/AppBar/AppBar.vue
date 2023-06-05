<script setup lang="ts">
import { ref } from 'vue'

const tab = ref('top-headlines')
const drawer = ref(false)

function toggleDrawer() {
  drawer.value = !drawer.value
}

function goTopHeadlines() {
  tab.value = 'top-headlines'
  drawer.value = false
}

function goHistory() {
  tab.value = 'history'
  drawer.value = false
}
</script>

<template>
  <v-app-bar density="comfortable">
    <v-toolbar-title>News App</v-toolbar-title>
    <v-tabs v-model="tab" background-color="transparent" class="hidden-sm-and-down">
      <v-tab key="top-headlines" to="/">Top Headlines</v-tab>
      <v-tab key="history" to="/history">History</v-tab>
    </v-tabs>
    <template #prepend>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="toggleDrawer"></v-app-bar-nav-icon>
    </template>
    <template #append>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
        <v-tooltip activator="parent" location="bottom">Search</v-tooltip>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-filter</v-icon>
        <v-tooltip activator="parent" location="bottom">Filter by category</v-tooltip>
      </v-btn>
    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" temporary location="left">
    <v-list nav>
      <v-list-item to="/" @click="goTopHeadlines">
        <v-list-item-title>Top Headlines</v-list-item-title>
      </v-list-item>
      <v-list-item to="/history" @click="goHistory">
        <v-list-item-title>History</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped></style>
