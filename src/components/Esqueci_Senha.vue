<!-- Esqueci_Senha.vue -->
<script setup>
import Titulos from './Titulos.vue';
</script>


<template>
  <section>
    <Titulos :cabecalho="'Redefinir Senha'"></Titulos>
    <main>
      <div class="container">
        <div class="box">
          <div class="square" style="--i: 0"></div>
          <div class="square" style="--i: 1">
            <img src="../assets/img/HealthMe.png" style="
                    width: 150px;
                    height: 150px;
                    margin-left: 0px;
                    margin-top: 10px;" />
          </div>
          <div class="square" style="--i: 2"></div>
          <div class="square" style="--i: 3"></div>
          <div class="square" style="--i: 4"></div>
          <div class="square" style="--i: 5">
            <img src="../assets/img/HealthMe.png" style="
                    width: 150px;
                    height: 150px;
                    margin-left: 0px;
                    margin-top: 10px;" />
          </div>

          <div class="form">
            <form @submit.prevent="confirmar">

              <div class="iconemaileusuario">
                <img src="../assets/Icons/Icon Email.png" style="
                width: 30px;"/>
              </div>

              <div class="texto">
              <span> Insira seu E-mail: </span>
              <i class="fas fa-user-circle"></i>
              </div>
            
              <div class="inputBx">
                <br>
                <input 
                type="email" 
                id="InserirEmail" 
                v-model="email" 
                required="true" 
                placeholder="" />
              </div>

              <div class="iconemaileusuario">
                <img src="../assets/Icons/Icon Usuario.png" style="
                width: 30px;"/>
              </div>

              <div class="texto">
              <span> Digite seu CPF:</span>
              <i class="fas fa-user-circle"></i>
              </div>

              <div class="inputBx">
                <br>
                <input 
                type="text" 
                id="cpf_senha"
                v-model="cpf_senha" 
                required="true"
                @input="formatarCPF"                 
                placeholder="Digite apenas números" 
                maxlength="11"
                minlength="11"
                />
              </div>

              <div class="inputBx Reenviar">
                <button class="btnVoltar" formnovalidate v-on:click="voltar">Voltar</button>
                <button class="btnReenviar">Reenviar</button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>

import MenuPrincipal from './MenuPrincipal.vue';
import Titulos from './Titulos.vue';

export default {
  data() {
    return {
      email: "",
      cpf_senha: "",
    };
  },

  methods: {
    voltar() {
      this.$router.push('/');
    },
    formatarCPF() {
      // Remova quaisquer caracteres não numéricos do valor do campo
      this.cpf_senha = this.cpf_senha.replace(/\D/g, '');
      },
      validarCPF(cpf){
      return cpf.length == 11 ? true: false; 
      },
      async confirmar(){
        const mensagem = ""
        const cpfValido = this.validarCPF(this.cpf_senha);
        const body = {
          cpf: this.cpf_senha,
          email: this.email
        }

        if(cpfValido){
          await axios.post('https://localhost:7146/Usuario/PasswordReset', body)
        .then(response => {
          // Verificar se a resposta da API indica sucesso (por exemplo, status 200)
          if (response.status === 200) {
            window.alert("Um link de redefinição de senha será enviado ao email fornecido")
            this.$router.push('/');
          } 
        })
        .catch(error => {
          alert(error.response.data);
          this.cpf_senha = "",
          this.email = ""
        });
      
      }
    }
  },

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
  top: -50px;
  right: -500px;
}

/* 2º lado direito   */
.box .square:nth-child(6) {
  width: 150px;
  height: 150px;
  top: 150px;
  right: -350px;
  z-index: 2;
}

/* 3º lado direito   */
.box .square:nth-child(3) {
  width: 150px;
  height: 150px;
  bottom: 100px;
  right: -450px;
  top: 350px
}

/* 1º lado esquerdo   */
.box .square:nth-child(5) {
  width: 150px;
  height: 150px;
  top: -60px;
  left: -500px;
}

/* 2º lado esquerdo   */
.box .square:nth-child(2) {
  width: 150px;
  height: 150px;
  top: 150px;
  left: -350px;
}

/* 3º lado esquerdo   */
.box .square:nth-child(4) {
  width: 150px;
  height: 150px;
  bottom: 100px;
  left: -450px;
  top: 350px;
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
  top: 15px;
  right: 15px;
  bottom: 15px;
  left: 15px;
  border-radius: 15px;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(175, 33, 33, 0.1) 0%, rgba(255, 255, 255, 0.1) 2%);
}

.form {
  width: 100%;
}

.form .inputBx {
  position: relative;
  width: 100%;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
}


/* retangulos- campo digitavel  */
.form .inputBx input {
  width: 80%;
  outline: none;
  border: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 20px;
  padding-left: 40px;
  border-radius: 15px;
  color: #fff;
  font-size: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transform: translateY(15px);
}

.form img {
  display: flex;
  width: 200px;
  margin: auto;
}

.form .inputBx span {
  color: rgb(253, 253, 253);
  font-size: 16px;
}

.form .inputBx .fas {
  position: absolute;
  top: 10px;
  left: 13px;
}

.texto {
  margin-left: 40px;
}

.form .inputBx input::placeholder {
  color: #fff;
}

/* Botãoo reenviar   */
.form .inputBx .btnReenviar {
  width: 40%;
  outline: none;
  border: none;
  border: 1px solid #102fac33;
  background: rgb(0, 94, 255);
  padding: 8px 10px;
  padding-left: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.form .inputBx .btnVoltar {
  width: 40%;
  outline: none;
  border: none;
  border: 1px solid #102fac33;
  background: rgb(71, 71, 71);
  margin-right: 50px;
  padding: 8px 10px;
  padding-left: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.iconemaileusuario {
  display: flex;
  position: relative;
  width: 10px;
  margin-bottom: -25px;
}
</style>