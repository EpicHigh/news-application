import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
// @ts-ignore
import { MotionPlugin } from '@vueuse/motion'
import { mount } from '@vue/test-utils'
import type { MountingOptions } from '@vue/test-utils'
import { key } from '@/stores'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})

function customMount(component: {}, store?: Plugin, options?: MountingOptions<any>) {
  const mockedStore = store ? [store, key] : []
  return mount(component, {
    ...options,
    global: {
      plugins: [mockedStore, router, vuetify, MotionPlugin]
    }
  })
}

export default customMount
