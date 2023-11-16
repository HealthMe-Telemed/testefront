import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js' // Importe o arquivo de configuração de rotas, por exemplo, 'router.js'
import mitt from 'mitt';
const emitter = mitt();

const app = createApp(App)

// Use o Vue Router
app.use(router)

// Use o miit
app.config.globalProperties.emitter = emitter;

app.mount('#app')
