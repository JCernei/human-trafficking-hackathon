import { createApp } from 'vue'
import App from './App.vue'
require('jsvectormap/dist/maps/world')
require('jsvectormap/dist/maps/world-merc')

const app = createApp(App)

app.mount('#app')
