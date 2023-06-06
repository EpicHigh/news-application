<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { ActionTypes } from '@/stores/action'
import { useStore } from 'vuex'
import AppHeader from '@/features/AppHeader/AppHeader.vue'
import { key } from '@/stores'
import ErrorDialog from '@/features/ErrorDialog.vue'

const store = useStore(key)

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
    <AppHeader />
    <ErrorDialog />
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
