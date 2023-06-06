<script setup lang="ts">
import { ref } from 'vue'
import { debounce } from '@/utils'
import { useStore } from 'vuex'
import { key } from '@/stores'
import { ActionTypes } from '@/stores/action'
import NewsFilters from './NewsFilters.vue'

const tab = ref<number>(0)
const drawer = ref(false)
const search = ref(false)
const keyword = ref('')
const store = useStore(key)

const debounceKeyword = debounce(() => {
  store.dispatch(ActionTypes.SEARCH_NEWS, keyword.value)
}, 500)

function toggleDrawer() {
  drawer.value = !drawer.value
}

function goTopHeadlines() {
  drawer.value = false
}

function goHistory() {
  drawer.value = false
}

function toggleSearch() {
  search.value = !search.value
}

function triggerError() {
  store.dispatch(ActionTypes.FETCH_WITHOUT_API_KEY)
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
      <v-btn icon @click="triggerError">
        <v-icon>mdi-sign-caution</v-icon>
        <v-tooltip activator="parent" location="bottom">Trigger API error</v-tooltip>
      </v-btn>
      <v-btn icon :disabled="tab === 1" @click="toggleSearch">
        <v-icon>mdi-magnify</v-icon>
        <v-tooltip activator="parent" location="bottom">Toggle search</v-tooltip>
      </v-btn>
      <NewsFilters :disabled="tab === 1" />
    </template>
    <template v-if="search" #extension>
      <v-text-field
        v-model="keyword"
        class="pt-3"
        hide-details
        prepend-inner-icon="mdi-magnify"
        single-line
        autofocus
        @input="debounceKeyword"
        @keydown.enter="debounceKeyword"
      />
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
