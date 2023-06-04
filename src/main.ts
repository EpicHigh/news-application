import { createApp } from 'vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { MotionPlugin } from '@vueuse/motion'
import router from './router'
import App from './App.vue'
import { store } from './stores'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives
})

app.use(router)
app.use(vuetify)
app.use(store)
app.use(MotionPlugin)

app.mount('#app')
