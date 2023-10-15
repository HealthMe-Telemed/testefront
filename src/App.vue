<script setup>
import MenuPrincipal from './components/MenuPrincipal.vue'
</script>

<template>
    <router-view></router-view>

</template>
  
  <script>
  import MenuPrincipal from './components/MenuPrincipal.vue';
  import Agendamentos from './components/Agendamentos.vue';
  import Layout from './components/Layout.vue';
  export default {
    components: {
      MenuPrincipal,
      Agendamentos,
      Layout
    },
  };
  </script>

<style scoped> 
</style>

