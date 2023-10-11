import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js' // Importe o arquivo de configuração de rotas, por exemplo, 'router.js'

const app = createApp(App)

// Use o Vue Router
app.use(router)

app.mount('#app')