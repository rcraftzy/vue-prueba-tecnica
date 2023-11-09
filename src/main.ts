import { createApp } from 'vue'
import 'primevue/resources/themes/lara-light-teal/theme.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import store from './store'
import ToastService from 'primevue/toastservice'

createApp(App)
  .use(store)
  .use(PrimeVue)
  .use(ToastService)
  .mount('#app')
document.title = 'Prueba tecnica Vue3 | Berht'
