<template>
  <section>
    <div class="container">
      <div class="box">
        <div class="square" style="--i: 0"></div>
        <div class="square" style="--i: 1">
          <img src="../assets/img/HealthMe.png" style="
              width: 200px;
              height: 200px;
              margin-left: -25px;
              margin-top: -30px;
            " />
        </div>

        <div class="square" style="--i: 2"></div>
        <div class="square" style="--i: 3"></div>
        <div class="square" style="--i: 4"></div>
        <div class="square" style="--i: 5">
          <img src="../assets/img/HealthMe.png" style="
              width: 110px;
              height: 110px;
              margin-left: -10px;
              margin-top: -5px;
            " />
        </div>
        <div class="container">
          <div class="form">
            <img src="../assets/img/HealthMe.png" />

            <form @submit.prevent="confirmarConsulta">
              <div class="inputBx">
                <input type="text" v-model="nomeMedico" required placeholder="Nome do Médico" />
              </div>

              <div class="inputBx">
                <input type="text" v-model="especialidade" required placeholder="Especialidade" />
              </div>

              <div class="inputBx">
                <input type="date" v-model="dataConsulta" required />
              </div>

              <div class="inputBx">
                <input type="time" v-model="horarioConsulta" required />
              </div>

              <div class="inputBx acessar">
                <button type="submit">Confirmar Consulta</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      nomeMedico: "",
      especialidade: "",
      dataConsulta: "",
      horarioConsulta: "",
    };
  },
  methods: {
    confirmarConsulta() {
      // Adicione a lógica para confirmar o agendamento, por exemplo, envio para o servidor
      const dadosConsulta = {
        nomeMedico: this.nomeMedico,
        especialidade: this.especialidade,
        dataConsulta: this.dataConsulta,
        horarioConsulta: this.horarioConsulta,
      };

      console.log(dadosConsulta);
      // Envie os dados para o servidor ou realize as ações necessárias
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/cssz?family=El+Messiri:wght@700&display=swap");

* {
  margin: 0;
  padding: 0;
  font-family: "El Messiri", sans-serif;
}

body {
  background: #031323;
  overflow: hidden;
}

.fas {
  width: 32px;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 100px;
  height: 100px;
  top: -15px;
  right: -45px;
}

.box .square:nth-child(2) {
  width: 150px;
  height: 150px;
  top: 105px;
  left: -125px;
  z-index: 2;
}

.box .square:nth-child(3) {
  width: 60px;
  height: 60px;
  bottom: 85px;
  right: -45px;
  z-index: 2;
}

.box .square:nth-child(4) {
  width: 50px;
  height: 50px;
  bottom: 35px;
  left: -95px;
}

.box .square:nth-child(5) {
  width: 50px;
  height: 50px;
  top: -15px;
  left: -25px;
}

.box .square:nth-child(6) {
  width: 85px;
  height: 85px;
  top: 165px;
  right: -155px;
  z-index: 2;
}

.container {
  position: relative;
  padding: 50px;
  width: 360px;
  min-height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  /* backdrop-filter: blur(5px);  */
  border-radius: 10px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  margin: 15px auto;
}

.container::after {
  content: "";
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;
  border-radius: 5px;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 2%);
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

.form .inputBx input {
  width: 80%;
  outline: none;
  border: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 10px;
  padding-left: 40px;
  border-radius: 15px;
  color: #fff;
  font-size: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.form img {
  display: flex;
  width: 250px;
  margin: auto;
}

.form .inputBx .fas {
  position: absolute;
  top: 13px;
  left: 13px;
}

.form .inputBx button {
  width: 80%;
  outline: none;
  border: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 10px;
  padding-left: 40px;
  border-radius: 15px;
  color: #fff;
  font-size:20px;
}

</style>
