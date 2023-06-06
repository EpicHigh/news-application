<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { key } from '@/stores'
import { ActionTypes } from '@/stores/action'

interface Props {
  title: string
  id: string
}

const properties = withDefaults(defineProps<Props>(), {
  title: '',
  id: ''
})

const router = useRouter()
const dialog = ref(false)
const menu = ref(false)
const valid = ref(true)
const newTitle = ref(properties.title)
const titleRules = [(v) => v.length <= 255 || 'Title must be less than 255 characters']
const store = useStore(key)

function closeDialog() {
  dialog.value = false
}

function openDialog() {
  dialog.value = true
}

function saveContent() {
  closeDialog()
  store.dispatch(ActionTypes.UPDATE_TOP_HEADLINE_TITLE, {
    id: properties.id,
    title: newTitle.value
  })
}

function goToDetail() {
  router.push({ name: 'NewsDetail', params: { id: properties.id } })
}
</script>

<template>
  <v-menu v-model="menu">
    <template #activator="{ props }">
      <v-btn data-test="expand-toolbar-btn" v-bind="props" icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-btn @click="goToDetail">Read</v-btn>
    <v-btn @click="openDialog">Edit</v-btn>
  </v-menu>

  <v-dialog v-model="dialog" max-width="500px">
    <v-form v-model="valid" @submit.prevent="saveContent" @reset="closeDialog">
      <v-card>
        <v-card-title>
          <span class="headline">Modify Title</span>
        </v-card-title>

        <v-card-text>
          <v-textarea
            v-model="newTitle"
            :rules="titleRules"
            auto-grow
            label="New title"
            placeholder="Enter new title here"
          ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text type="reset">Close</v-btn>
          <v-btn :disabled="!valid" color="blue darken-1" text type="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style scoped></style>
