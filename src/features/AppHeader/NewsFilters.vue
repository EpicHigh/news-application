<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/stores'
import { ActionTypes } from '@/stores/action'

interface Props {
  disabled?: boolean
}

const menu = ref(false)
const store = useStore(key)
const sources = ref<string[]>([])
const prop = withDefaults(defineProps<Props>(), {
  disabled: false
})

function applyFilters() {
  store.dispatch(ActionTypes.FETCH_TOP_HEADLINES_BY_SOURCE, sources.value)
  menu.value = false
}

function resetFilers() {
  sources.value = []
  applyFilters()
}
</script>

<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="end">
    <template #activator="{ props }">
      <v-btn icon :disabled="prop.disabled" v-bind="props">
        <v-icon>mdi-filter</v-icon>
      </v-btn>
    </template>
    <v-form @submit.prevent="applyFilters" @reset="resetFilers">
      <v-card>
        <v-virtual-scroll :items="store.getters.sourceNames" height="272" class="px-4">
          <template #default="{ item }">
            <v-checkbox v-model="sources" hide-details :label="item.name" :value="item.id" />
          </template>
        </v-virtual-scroll>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" type="reset">Reset</v-btn>
          <v-btn color="blue" variant="text" type="submit">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-menu>
</template>

<style scoped></style>
