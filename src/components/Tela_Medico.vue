<!-- TelaMedico.vue -->
<template>
  <section>
    <header>
      <button class="home"><i class="fa fa-home"></i> Home</button>
      <h1>ÁREA DO MÉDICO</h1>
      <button class="sair"><i class="fa fa-sign-out"></i> Sair</button>
    </header>
    <main>
      <div class="container">
        <div class="box">
          <div class="square" style="--i: 0"></div>
          <div class="square" style="--i: 1">
            <img src="../assets/img/medico2.png" style="
              width: 150px;
              height: 150px;
              margin-left: -12px;
              margin-top: 15px;
            " />
          </div>

          <div class="square" style="--i: 2"></div>
          <div class="square" style="--i: 3"></div>
          <div class="square" style="--i: 4"></div>
          <div class="square" style="--i: 5">
            <img src="../assets/img/agenda.png" style="
              width: 110px;
              height: 100px;
              margin-left: -2px;
              margin-top: 15px;
            " />
          </div>
          <h1>Agenda de consultas </h1>
          <div class="container">
            <div class="form">
              <img src="../assets/img/HealthMe.png" />

              <form @submit.prevent="confirmar">

                <div class="inputBx">
                  <select id="TipoConsulta" v-model="TipoConsulta" required placeholder="Selecione o Tipo de consulta ">
                    <option value="" disabled>Selecione Tipo de consulta</option>
                    <option value="Agendada">Agendada</option>
                    <option value="Cancelada">Cancelada</option>
                    <option value="Finalizada">Finalizada</option>
                  </select>
                </div>

                <div class="inputBx">
                  <select id="especialidadeConsulta" v-model="especialidadeConsulta" required
                    placeholder="Selecione a especialidade">
                    <option value="" disabled>Selecione a especialidade da consulta </option>
                    <option value="psicologia">Psicologia</option>
                    <option value="psiquiatria">Psiquiatria</option>
                  </select>
                </div>

                <div class="inputBx confirmar">
                  <button class="btnMostrar">Mostrar Lista</button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  data() {
    return {
      TipoConsulta: "",
      especialidadeConsulta: "",
    };
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
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
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

.home,  .sair {
  margin: 20px;
  padding: 10px;
}
h1 {
  margin: auto;
}
.home,.sair {
  font-size: 20px;
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.2);
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

.box .square:nth-child(1) {
  width: 150px;
  height: 150px;
  top: -15px;
  right: -250px;
}

.box .square:nth-child(2) {
  width: 150px;
  height: 150px;
  top: 105px;
  left: -250px;
  z-index: 2;
}

.box .square:nth-child(3) {
  width: 150px;
  height: 150px;
  bottom: 15px;
  right: -250px;
  z-index: 2;
}

.box .square:nth-child(4) {
  width: 150px;
  height: 150px;
  bottom: 55px;
  left: -250px;
}

.box .square:nth-child(5) {
  width: 80px;
  height: 80px;
  top: -35px;
  left: -150px;
}

.box .square:nth-child(6) {
  width: 150px;
  height: 150px;
  top: 175px;
  right: -200px;
  z-index: 2;
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
  margin: 15px auto;
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

.form .inputBx {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}


.form .inputBx select {
  width: 88%;
  outline: none;
  border: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 10px;
  padding-left: 40px;
  border-radius: 15px;
  color: hwb(97 0% 93%);
  font-size: 16px;
  box-shadow: 0 5px 15px rgba(132, 165, 25, 0.05);
}

.form .inputBx input {
  width: 75%;
  outline: none;
  border: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 10px;
  padding-left: 40px;
  border-radius: 15px;
  color: hwb(225 0% 93%);
  font-size: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.form img {
  display: flex;
  width: 200px;
  margin: auto;
}

.form .inputBx .fas {
  position: absolute;
  top: 10px;
  left: 13px;
}

.form .inputBx button {
  width: 50%;
  outline: none;
  border: none;
  border: 1px solid #102fac33;
  background: rgb(0, 94, 255);
  padding: 8px 10px;
  padding-left: 20px;
  border-radius: 10px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}
</style>