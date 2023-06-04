<script setup lang="ts">
import { computed, ref } from 'vue'
import { format } from 'date-fns'
import getRandomColor from '@/utils'

const expand = ref(false)

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: ''
  },
  description: {
    type: String,
    required: true,
    default: ''
  },
  publishedAt: {
    type: String,
    required: true,
    default: ''
  },
  urlToImage: {
    type: String,
    default: ''
  },
  id: {
    type: Number,
    required: true
  }
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
    hover
    link
    :color="cardColor"
    :image="props.urlToImage ? props.urlToImage : ''"
    :to="`/news/${props.id}`"
    @mouseover="expand = true"
    @focusin="expand = true"
    @mouseleave="expand = false"
    @focusout="expand = false"
    class="card text-white"
    density="comfortable"
    height="350px"
  >
    <div class="content-wrapper h-100">
      <div class="pt-4">
        <v-card-subtitle class="subtitle">
          {{ format(new Date(props.publishedAt), 'd MMMM yyyy') }}
        </v-card-subtitle>
      </div>
      <div class="transparent">
        <v-card-title class="pt-4 title" :class="{ 'pb-3': !expand }"
          >{{ props.title }}
        </v-card-title>
        <v-card-text
          v-if="expand"
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
          <p>{{ props.description }}</p>
          <p class="caption">Read more</p>
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

.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.transparent {
  background-color: rgba(0, 0, 0, 0.5);
}

.caption {
  font-size: 0.8rem;
  text-decoration: underline;
  font-weight: bold;
}

.subtitle {
  font-size: 1.2rem;
  font-weight: bold;
  font-color: white;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.8);

  &.v-card-subtitle {
    opacity: 1;
  }
}

.card {
  background-size: cover;
}
</style>
