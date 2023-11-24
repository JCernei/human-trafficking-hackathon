import { createApp } from 'vue'
import App from './App.vue'
import VueVectorMap from 'vuevectormap'
// import 'vuevectormap/src/scss/vuevectormap.scss'

// Import your preferred map
require('jsvectormap/dist/maps/world')

const app = createApp(App)

app.use(VueVectorMap, {
  // Set global options if any.
  backgroundColor: 'navy',
})

app.mount('#app')

// createApp(App).mount('#app')
