import { createRouter, createWebHistory } from 'vue-router'
import MenuPrincipal from './components/MenuPrincipal.vue'
import App from './App.vue'
import Agendamentos from './components/Agendamentos.vue'

const routes = [
  { path: '/', component: MenuPrincipal },
  { path: '/App', component: App },
  { path: '/Agendamentos', component: Agendamentos }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router