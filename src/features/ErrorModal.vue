<script setup lang="ts">
import { useStore } from 'vuex'
import { Store } from '@/stores'
import { ActionTypes } from '@/stores/action'

const store = useStore<Store>()

const closeDialog = () => {
  store.commit(ActionTypes.SET_ERROR, '')
}
</script>

<template>
  <v-dialog :model-value="!!store.state.error" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Error</span>
      </v-card-title>

      <v-card-text>
        {{ store.state.error }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" variant="outlined" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
