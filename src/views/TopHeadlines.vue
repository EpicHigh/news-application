<script setup lang="ts">
import type { Store } from '@/stores'
import { useStore } from 'vuex'
import TopHeadLineCard from '@/components/TopHeadlines/TopHeadLineCard.vue'
import { computed } from 'vue'
import { compareDesc } from 'date-fns'
import type { State } from '@/stores/state'

const store = useStore<Store>()

const latestNews = computed<State['news']>(() => {
  return new Map(
    [...store.state.news.entries()].sort((a, b) =>
      compareDesc(new Date(a[1].publishedAt), new Date(b[1].publishedAt))
    )
  )
})
</script>

<template>
  <v-container>
    <h1 class="text-h3 my-6">Top Headlines</h1>
    <v-row>
      <v-col
        v-for="[id, article] in latestNews.entries()"
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
