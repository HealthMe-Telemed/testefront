import { createRouter, createWebHistory } from 'vue-router'
import MenuPrincipal from './components/MenuPrincipal.vue'
import App from './App.vue'
import Agendamentos from './components/Agendamentos.vue'
import Novo_Agendamento from './components/Novo_Agendamento.vue'
import Tela_Medico from './components/Tela_Medico.vue'
import Cadastro from './components/Cadastro.vue'
import Consulta from './components/Consulta.vue'
import Esqueci_Senha from './components/Esqueci_Senha.vue'
import Confirmar_Senha from './components/Confirmar_Senha.vue'
import Editar_Consulta from './components/Editar_Consulta.vue'
import Titulos from './components/Titulos.vue'
import Botoes_Agendamento from './components/Botoes_Agendamento.vue'
import ConsultaExemplo from './components/ConsultaExemplo.vue'
import DadosPerfil from './components/DadosPerfil.vue'


const routes = [
  { path: '/', component: MenuPrincipal },
  { path: '/App', name: "App", component: App },
  { path: '/Agendamentos', name: "Agendamentos",component: Agendamentos },
  { path: '/Novo_Agendamento', name: "Novo_Agendamento",component: Novo_Agendamento},
  { path: '/Tela_Medico', component: Tela_Medico},
  { path: '/Cadastro', component: Cadastro},
  { path: '/Consulta', component: Consulta},
  { path: '/Esqueci_Senha', component: Esqueci_Senha},
  { path: '/Confirmar_Senha', component: Confirmar_Senha},
  { path: '/Editar_Consulta/:id', name:"Editar_Consulta", component:Editar_Consulta},
  { path: '/Titulos',component:Titulos},
  { path: '/Botoes_Agendamento',component:Botoes_Agendamento},
  { path: '/ConsultaExemplo', component:ConsultaExemplo},
  { path: '/DadosPerfil',component:DadosPerfil}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router