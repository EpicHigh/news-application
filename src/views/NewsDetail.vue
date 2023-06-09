<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { key } from '@/stores'
import { computed, onMounted } from 'vue'
import { getRandomColor } from '@/utils'
import type { Article } from '@/types'
import { format } from 'date-fns'
import { ActionTypes } from '@/stores/action'

const route = useRoute()
const store = useStore(key)
const maxLength = 100

const article: Article = store.getters.getArticleById(route.params.id)

const backgroundColor = computed(() => {
  return getRandomColor()
})

const truncatedTitle = computed(() => {
  if (article.title.length > maxLength) {
    return `${article.title.substring(0, maxLength)}...`
  }
  return article.title
})

onMounted(() => {
  store.dispatch(ActionTypes.PUSH_TO_HISTORY, route.params.id)
})
</script>

<template>
  <v-sheet v-if="article" class="text-white" :color="backgroundColor" height="calc(100vh - 56px)">
    <v-container>
      <h1 class="title my-6">{{ truncatedTitle }}</h1>
      <p class="date">{{ format(new Date(article.publishedAt), 'd MMMM yyyy') }}</p>
      <p class="content">{{ article.description }}</p>
      <p class="content">{{ article.content }}</p>
    </v-container>
    <v-img
      v-if="article.urlToImage"
      class="image w-100"
      :src="article.urlToImage"
      :alt="article.description || ''"
    />
  </v-sheet>
</template>

<style scoped>
.title {
  font-weight: bolder;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-size: 1.6rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
}

.date {
  font-size: 1.4rem;
  font-weight: bold;
  line-height: 1.5;
  letter-spacing: 0.2rem;
  text-transform: uppercase;

  @media (min-width: 768px) {
    font-size: 1.6rem;
  }
}

.content {
  font-size: 1.2rem;
  line-height: 1.65;
}

.image {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: cover;
}
</style>
