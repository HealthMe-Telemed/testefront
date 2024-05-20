<script setup>
import Layout from './Layout.vue';
</script>

<template>
  <section>
    <Layout :cabecalho="'Consulta'"></Layout>
    <main>
      <div class="container">
        <div class="form">
          <div class="box">
          <div class="square" style="--i: 0"></div>
          <div class="square" style="--i: 1">
            <img src="../assets/img/saudeMental.png" style="
              width: 110px;
              height: 110px;
              margin-left: -2px;
              margin-top: 15px;
            " />
          </div>

          <div class="square" style="--i: 2"></div>
          <div class="square" style="--i: 3"></div>
          <div class="square" style="--i: 4"></div>
          <div class="square" style="--i: 5">
            <img src="../assets/img/saudeMental.png" style="
              width: 110px;
              height: 100px;
              margin-left: -2px;
              margin-top: 15px;
            " />
          </div>

        </div>
          <div>
            <iframe src="https://meet.google.com/phh-ztgp-kmo" frameborder="0"></iframe>
          </div>
      </div>
      </div>
    </main>
    <footer>
    </footer>
  </section>
</template>

<script>
export default {
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

.box {
  position: relative;
}

.box .square {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  animation: square 10s linear infinite;
  animation-delay: calc(-1s * var(--i));
}
  
  @keyframes square {
  
    0%,

    100% {
      transform: translateY(-20px);
    }
  
    50% {
      transform: translateY(20px);
    }
  }


/* 1º lado direito   */
.box .square:nth-child(1) {
  width: 150px;
  height: 150px;
  top: -150px;
  right: -500px;
}

/* 2º lado direito   */
.box .square:nth-child(6) {
  width: 150px;
  height: 150px;
  top: 80px;
  right: -350px;
  z-index: 2;
}

/* 3º lado direito   */
.box .square:nth-child(3) {
  width: 150px;
  height: 150px;
  right: -450px;
  top: 270px;
}

/* 1º lado esquerdo   */
.box .square:nth-child(5) {
  width: 150px;
  height: 150px;
  top: -150px;
  left: -500px;
}

/* 2º lado esquerdo   */
.box .square:nth-child(2) {
  width: 150px;
  height: 150px;
  top: 80px;
  left: -350px;
}

/* 3º lado esquerdo   */
.box .square:nth-child(4) {
  width: 150px;
  height: 150px;
  left: -450px;
  top: 270px
}

.container {
  position: relative;
  padding: 20px;
  width: 400px;
  min-height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  /* backdrop-filter: blur(5px);  */
  border-radius: 10px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  margin: 50px auto;
  text-align: center;
}

.container::after {
  content: "";
  position: absolute;
  top: 15px;
  right: 15px;
  bottom: 15px;
  left: 15px;
  border-radius: 15px;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(175, 33, 33, 0.1) 0%, rgba(255, 255, 255, 0.1) 2%);
}

.form {
  position: relative;
  width: 100%;
  top: 15px;
}
  </style>