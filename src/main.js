import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

// Importar estilos de SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')