<script setup lang="ts">
import { useStore } from 'vuex'
import TopHeadLineCard from '@/features/TopHeadlines/TopHeadLineCard.vue'
import { key } from '@/stores'

const store = useStore(key)
</script>

<template>
  <v-container>
    <h1 class="text-h3 my-6">Top Headlines</h1>
    <v-row>
      <v-col
        v-for="[id, article] in store.getters.latestNews"
        :key="id"
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
