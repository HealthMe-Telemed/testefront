<script setup>
import Layout from './Layout.vue';
import ConsultaExemplo from './ConsultaExemplo.vue';
</script>

<template>
  <section>
    <Layout :cabecalho="'Consulta'"></Layout>
    <main>
          <div class="img">
          <img src="../assets/Icons/ReuniaoZoom.png" style="width: 950px; height: 590px;"/>
          </div>

          <div class="imglogo">
          <img src="../assets/img/HealthMe.png" style="width: 250px; height: 250px;"/>
          </div>

          <div class="imglogo2">
          <img src="../assets/img/HealthMe.png" style="width: 250px; height: 250px;"/>
          </div>

          <div>
            <iframe :src="consultaUrl" sandbox="allow-scripts " frameborder="0" width="500"></iframe>
          </div>
    </main>
  </section>
</template>

<script>
export default {
  data(){
    return {
      consultaUrl: ""
    }
  },
  methods: {

  }
}
</script>
  
 <style scoped>
  @import url("https://fonts.googleapis.com/cssz?family=El+Messiri:wght@700&display=swap");
  
  * {
  margin: 0;
  padding: 0;
  font-family: "El Messiri", sans-serif;
  color: white;
}

section {
  min-height: 100vh;
  background: linear-gradient(-45deg, #80caea);
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
}

header {
  display: flex;
  border-bottom: white 2px solid;
  text-align: center;
}

.img {
  display: flex;
  position: relative;
  justify-content: center;
}

.imglogo {
  display: flex;
  position: relative;
  margin-top: -450px;
}

.imglogo2 {
  display: flex;
  position: relative;
  margin-left: 1250px;
  margin-top: -225px;
}

  </style>