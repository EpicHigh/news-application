<script setup lang="ts">
import type { Store } from '@/stores'
import { useStore } from 'vuex'
import TopHeadLineCard from '@/components/TopHeadlines/TopHeadLineCard.vue'

const store = useStore<Store>()
</script>

<template>
  <v-container>
    <h1 class="text-h3 my-6">History</h1>
    <v-alert v-if="store.state.histories.length === 0" type="info">There is no history </v-alert>
    <v-row v-if="store.state.histories.length !== 0">
      <v-col v-for="id in store.state.histories" :key="id" cols="12" md="6" lg="4" xl="3" xxl="2">
        <TopHeadLineCard
          :id="id"
          :title="store.state.news.get(id).title"
          :description="store.state.news.get(id).description"
          :published-at="store.state.news.get(id).publishedAt"
          :url-to-image="store.state.news.get(id).urlToImage"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
