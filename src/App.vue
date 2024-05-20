<script setup>
import MenuPrincipal from '../src/components/MenuPrincipal.vue';
import Agendamentos from '../src/components/Agendamentos.vue';
import Novo_Agendamento from '../src/components/Novo_Agendamento.vue';
import Tela_Medico from '../src/components/Tela_Medico.vue';
import Esqueci_Senha from '../src/components/Esqueci_Senha.vue';
import Layout from './components/Layout.vue';
import Confirmar_Senha from './components/Confirmar_Senha.vue';
import Editar_Consulta from'./components/Editar_Consulta.vue';
import Titulos from './components/Titulos.vue';
import Botoes_Agendamento from './components/Botoes_Agendamento.vue';

</script>

<template>
    <router-view></router-view>

</template>
  
  <script>

  export default {
    components: {
      MenuPrincipal,
      Agendamentos,
      Novo_Agendamento,
      Tela_Medico,
      Esqueci_Senha,
      Confirmar_Senha,
      Editar_Consulta,      
      Layout,
      Titulos,
      Botoes_Agendamento
    },
  };
  </script>

<style scoped> 
</style>

