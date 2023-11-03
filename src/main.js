import { createApp } from 'vue'
import 'primevue/resources/themes/lara-light-teal/theme.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

createApp(App)
  .use(PrimeVue)
  .use(router)
  .mount('#app')
