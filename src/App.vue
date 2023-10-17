<script setup>
import MenuPrincipal from '../src/components/MenuPrincipal.vue';
import Agendamentos from '../src/components/Agendamentos.vue';
import Novo_Agendamento from '../src/components/Novo_Agendamento.vue';
import Layout from './components/Layout.vue';
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
      Layout,
    },
  };
  </script>

<style scoped> 
</style>

