<script setup lang="ts">
import { computed, ref } from 'vue'
import { format } from 'date-fns'
import { getRandomColor } from '@/utils'
import NewsMenu from './NewsMenu.vue'

interface Props {
  title: string
  description: string | null
  publishedAt: string
  urlToImage: string | null
  id: string
}

const content = ref(false)

function expandContent() {
  content.value = true
}

function hideContent() {
  content.value = false
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  publishedAt: '',
  urlToImage: null,
  id: ''
})

const cardColor = computed(() => {
  if (!props.urlToImage) {
    return getRandomColor()
  }
  return ''
})
</script>

<template>
  <v-card
    :color="cardColor"
    :image="props.urlToImage ? props.urlToImage : ''"
    elevation="2"
    class="card text-white"
    density="comfortable"
    height="350px"
    @mouseover="expandContent"
    @focusin="expandContent"
    @mouseleave="hideContent"
    @focusout="hideContent"
  >
    <div class="d-flex flex-column justify-space-between h-100">
      <v-row class="pt-4">
        <v-col cols="6">
          <v-card-subtitle class="subtitle pt-4">
            {{ format(new Date(props.publishedAt), 'd MMMM yyyy') }}
          </v-card-subtitle>
        </v-col>
        <v-col class="text-right" cols="6">
          <div class="pr-4">
            <NewsMenu :id="props.id" :title="props.title" />
          </div>
        </v-col>
      </v-row>
      <div class="transparent">
        <v-card-title class="pt-4 title" :class="{ 'pb-3': !content }"
          >{{ props.title }}
        </v-card-title>
        <v-card-text
          v-if="content"
          v-motion
          :initial="{
            y: 100
          }"
          :enter="{
            y: 0
          }"
          :leave="{
            y: -100
          }"
        >
          <p data-test="news-description">{{ props.description }}</p>
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.title {
  font-size: 1rem;
  font-weight: bold;
}

.transparent {
  background-color: rgba(0, 0, 0, 0.5);
}

.subtitle {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.8);

  &.v-card-subtitle {
    opacity: 1;
  }
}

.card {
  background-size: cover;
}
</style>
