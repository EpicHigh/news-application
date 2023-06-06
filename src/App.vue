<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { ActionTypes } from '@/stores/action'
import type { Store } from '@/stores'
import { useStore } from 'vuex'
import AppBar from '@/features/AppBar/AppBar.vue'
import ErrorModal from '@/features/ErrorModal.vue'

const store = useStore<Store>()

onMounted(() => {
  if (store.state.news.size === 0) {
    store.dispatch(ActionTypes.FETCH_TOP_HEADLINES)
  }
  if (store.state.sources.length === 0) {
    store.dispatch(ActionTypes.FETCH_SOURCES)
  }
})
</script>

<template>
  <v-layout>
    <AppBar />
    <ErrorModal />
    <v-main>
      <v-progress-circular v-if="store.state.isLoading" indeterminate size="96" class="spinner" />
      <RouterView v-else />
    </v-main>
  </v-layout>
</template>

<style scoped>
.spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
