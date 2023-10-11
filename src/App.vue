<script setup>
import MenuPrincipal from './components/MenuPrincipal.vue'
</script>

<template>
    <router-view></router-view>

</template>
  
  <script>
  import MenuPrincipal from './components/MenuPrincipal.vue';
  import Agendamentos from './components/Agendamentos.vue';
  
  export default {
    components: {
      MenuPrincipal,
      Agendamentos,
    },
  };
  </script>

<style scoped> 
</style>

