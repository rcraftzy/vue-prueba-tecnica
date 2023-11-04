import { createApp } from 'vue'
import 'primevue/resources/themes/lara-light-teal/theme.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import store from './store'

createApp(App)
  .use(store)
  .use(PrimeVue)
  .mount('#app')
