import { createRouter, createWebHistory } from 'vue-router'
import MenuPrincipal from './components/MenuPrincipal.vue'
import App from './App.vue'
import Agendamentos from './components/Agendamentos.vue'
import Novo_Agendamento from './components/Novo_Agendamento.vue'
import Tela_Medico from './components/Tela_Medico.vue'

const routes = [
  { path: '/', component: MenuPrincipal },
  { path: '/App', component: App },
  { path: '/Agendamentos', component: Agendamentos },
  { path: '/Novo_Agendamento', component: Novo_Agendamento},
  { path: '/Tela_Medico', component: Tela_Medico}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router