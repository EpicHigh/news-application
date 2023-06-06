import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
// @ts-ignore
import { MotionPlugin } from '@vueuse/motion'
import type { MountingOptions } from '@vue/test-utils'
// @ts-ignore
import { render } from '@testing-library/vue'
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

function customRender(component: {}, store: Plugin, options?: MountingOptions<any>) {
  return render(component, {
    ...options,
    global: {
      plugins: [[store, key], router, vuetify, MotionPlugin]
    }
  })
}

export default customRender
