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
            <div class="square" style="--i: 0">
              <img src="../assets/img/saudeMental.png" style="
                  width: 130px;
                  height: 130px;
                  margin-left: 2px;
                  margin-top: 10px;"/></div>
            <div class="square" style="--i: 1"></div>
            <div class="square" style="--i: 2"></div>     
            <div class="square" style="--i: 3"></div>
            <div class="square" style="--i: 4">
              <img src="../assets/img/saudeMental.png" style="
                  width: 130px;
                  height: 130px;
                  margin-left: 0px;
                  margin-top: 10px;"/></div>
            <div class="square" style="--i: 5"></div>
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
    background: linear-gradient(-45deg,  #80caea);
    background-size: 400% 400%;
    animation: gradient 10s ease infinite;
  }
  
  
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
  
    50% {
      background-position: 100% 50%;
    }
  
    100% {
      background-position: 0% 50%;
    }
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
    border: 1px solid rgba(10, 177, 155, 0.15);
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
  top: -15px;
  right: -255px;
}

/* 2º lado Direito   */
.box .square:nth-child(6) {
  width: 150px;
  height: 150px;
  top: 160px;
  right: -450px; 
}

/* 3º lado Direito   */
.box .square:nth-child(3) {
  width: 150px;
  height: 150px;
  top: -200px;
  left: 700px;
  
}

/* 1º lado Esquerdo   */
.box .square:nth-child(5) {
  width: 150px;
  height: 150px;
  top: -50px;
  left: -250px;
}

/* 2º lado Esquerdo   */
.box .square:nth-child(2) {
  width: 150px;
  height: 150px;
  top: 150px;
  left: -400px;
}

/* 3º lado Esquerdo   */
.box .square:nth-child(4) {
  width: 150px;
  height: 150px;
  bottom: 50px;
  left: -500px;
}
  
  .container {
    position: relative;
    padding: 40px;
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
}
  </style>