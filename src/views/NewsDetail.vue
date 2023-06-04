<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Store } from '@/stores'
import { computed, onMounted } from 'vue'
import { ActionTypes } from '@/stores/action'
import getRandomColor from '@/utils'
import type { Article } from '@/types'
import { format } from 'date-fns'

const route = useRoute()
const store = useStore<Store>()

onMounted(() => {
  if (store.state.topHeadlines.length === 0) {
    store.dispatch(ActionTypes.FETCH_TOP_HEADLINES)
  }
})

const article = computed<Article>(() => {
  return store.state.topHeadlines?.[route.params.id]
})
const backgroundColor = computed(() => {
  return getRandomColor()
})
</script>

<template>
  <div v-if="article">
    <v-sheet class="text-white" :color="backgroundColor" height="100vh">
      <v-container>
        <h1 class="title my-6">{{ article.title }}</h1>
        <p class="date">{{ format(new Date(article.publishedAt), 'd MMMM yyyy') }}</p>
        <p class="content">{{ article.description }}</p>
        <p class="content">{{ article.content }}</p>
      </v-container>
      <v-img
        class="image w-100"
        v-if="article.urlToImage"
        :src="article.urlToImage"
        :alt="article.description || ''"
      />
    </v-sheet>
  </div>
</template>

<style scoped>
.title {
  font-weight: bolder;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-size: 2.4rem;
}

.date {
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1.5;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
}

.content {
  font-size: 1.2rem;
  line-height: 1.65;
}

.image {
  position: absolute;
  bottom: 0;
}
</style>
