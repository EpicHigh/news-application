<script setup lang="ts">
import type { Store } from '@/stores'
import { useStore } from 'vuex'
import TopHeadLineCard from '@/components/TopHeadlines/TopHeadLineCard.vue'

const store = useStore<Store>()
</script>

<template>
  <v-container>
    <h1 class="text-h3 my-6">History</h1>
    <v-alert v-if="store.state.histories.size === 0" type="info">There is no history </v-alert>
    <v-row v-if="store.state.histories.size !== 0">
      <v-col
        v-for="[id, article] in store.state.histories.entries()"
        :key="article.url"
        cols="12"
        md="6"
        lg="4"
        xl="3"
        xxl="2"
      >
        <TopHeadLineCard
          :id="id"
          :title="article.title"
          :description="article.description"
          :published-at="article.publishedAt"
          :url-to-image="article.urlToImage"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
