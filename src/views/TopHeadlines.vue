<script setup lang="ts">
import type { Store } from '@/stores'
import { useStore } from 'vuex'
import TopHeadLineCard from '@/components/TopHeadlines/TopHeadLineCard.vue'
import { onMounted } from 'vue'
import { ActionTypes } from '@/stores/action'

const store = useStore<Store>()

onMounted(() => {
  if (store.state.topHeadlines.length === 0) {
    store.dispatch(ActionTypes.FETCH_TOP_HEADLINES)
  }
})
</script>

<template>
  <h1 class="text-h1">Top Headlines</h1>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
        lg="4"
        xl="3"
        xxl="2"
        v-for="(article, index) in store.state.topHeadlines"
        :key="article.url"
      >
        <TopHeadLineCard
          :title="article.title"
          :description="article.description"
          :published-at="article.publishedAt"
          :url-to-image="article.urlToImage"
          :id="index"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
