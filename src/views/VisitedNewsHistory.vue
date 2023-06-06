<script setup lang="ts">
import type { Store } from '@/stores'
import { useStore } from 'vuex'
import TopHeadLineCard from '@/features/TopHeadlines/TopHeadLineCard.vue'
import { key } from '@/stores'

const store = useStore<Store>(key)
</script>

<template>
  <v-container>
    <h1 class="text-h3 my-6">History</h1>
    <v-alert v-if="store.state.histories.size === 0" type="info">There is no history</v-alert>
    <v-row v-else>
      <v-col
        v-for="[id] in store.getters.latestVisitedNews"
        :key="id"
        cols="12"
        md="6"
        lg="4"
        xl="3"
        xxl="2"
      >
        <TopHeadLineCard :id="id" v-bind="store.getters.getArticleById(id)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
