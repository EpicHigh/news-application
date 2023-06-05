<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { ActionTypes } from '@/stores/action'
import type { Store } from '@/stores'
import { useStore } from 'vuex'
import AppBar from '@/components/AppBar/AppBar.vue'

const store = useStore<Store>()

onMounted(() => {
  if (store.state.topHeadlines.length === 0) {
    store.dispatch(ActionTypes.FETCH_TOP_HEADLINES)
  }
})
</script>

<template>
  <v-layout>
    <AppBar />
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
