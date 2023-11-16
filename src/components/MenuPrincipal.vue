<template>
  <section>
    <div class="rt-container">
      <div class="box">
        <div class="square" style="--i: 0">
          <img
            src="../assets/img/agenda.png"
            style="
              width: 100px;
              height: 100px;
              margin-left: 15px;
              margin-top: 10px;
            "
          />
        </div>
        <div class="square" style="--i: 1">
          <img
            src="../assets/img/HealthMe-1.png"
            style="
              width: 150px;
              height: 150px;
              margin-left: -5px;
              margin-top: -5px;
            "/>
        </div>
        <div class="square" style="--i: 2">
        
          <img
            src="../assets/img/consulta.png"
            style="
              width: 120px;
              height: 120px;
              margin-left: 30px;
              margin-top: 2px;
            "
          />
        </div>     
        <div class="square" style="--i: 3">
          <img
            src="../assets/img/medico2.png"
            style="
              width: 150px;
              height: 150px;
              margin-left: -5px;
              margin-top: 2px;
            "
          />
        
        </div>
        <div class="square" style="--i: 4">
          <img
            src="../assets/img/cerebro2.png"
            style="
              width: 100px;
              height: 100px;
              margin-left: 20px;
              margin-top: 25px;
            "
          />
        </div>
        <div class="square" style="--i: 5">
          <img
            src="../assets/img/HealthMe.png"
            style="
              width: 150px;
              height: 150px;
              margin-left: 2px;
              margin-top: -5px;
            "
          />
        </div>

        
        <div class="container">
          <div class="form">
            <img src="../assets/img/HealthMe.png" />

            <form @submit.prevent="submitForm">
              <div class="inputBx">
                <input
                  type="text"
                  v-model="username"
                  required="true"
                  @input="formatarCPF"
                  placeholder="Digite apenas numeros"
                  maxlength="11"
                  minlength="11"
                />
                <span>Login: CPF</span>
                <i class="fas fa-user-circle"></i>
              </div>

              <div class="inputBx password">
                <input
                  id="password-input"
                  v-model="password"
                  :type="passwordVisible ? 'text' : 'password'"
                  name="password"
                  required="true"
                />
                <span>Password</span>
                <!--<button type="button" @click="togglePasswordVisibility">-
      {{ passwordVisible ? "Ocultar Senha" : "Mostrar Senha" }}
    </button> -->
                <i class="fas fa-key"></i>
              </div>

              <label class="remember"><input type="checkbox" />Lembrar</label>

              <div class="inputBx acessar">
                <button type="submit" value="Entrar" v-on:click="submitForm">Entrar</button>
                <p><a href="#">Esqueceu sua Senha? </a></p>
              </div>
            </form>

            <p style="margin: auto"><a href="#">Cadastrar Nova Conta</a></p>
          </div>
        </div>
      </div>
    </div>
    <div v-show="showError" class="modal">
      <div class="modal-content">
        <span class="modal-close" @click="closeErrorModal">&times;</span>
        <div class="modal-header">
          <h2>Erro</h2>
        </div>
        <div class="modal-body">
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      senha: "",
      passwordVisible: false,
      showError: false,
      errorMessage: '',
    };
  },
  created(){
    sessionStorage.clear();
  },
  methods: {
    openErrorModal(errorMessage) {
      this.errorMessage = errorMessage;
      this.showError = true;
    },
    closeErrorModal() {
      this.showError = false;
      this.errorMessage = '';
    },
    formatarCPF() {
      // Remova quaisquer caracteres não numéricos do valor do campo
      this.username = this.username.replace(/\D/g, '');
    },
    validarCPF(cpf){
      return cpf.length == 11 ? true: false; 
    },
    togglePasswordVisibility() {
      console.log("Clicado")
      this.passwordVisible = !this.passwordVisible;
      console.log(this.passwordVisible)
    },
    submitForm() {
      const cpfValido = this.validarCPF(this.username);
      const md5Password = CryptoJS.MD5(this.password).toString();
      const data = {
        cpf: this.username,
        senha: md5Password
      };

      if(cpfValido){
      axios.post('https://localhost:7146/Usuario/Login', data)
        .then(response => {
          // Verificar se a resposta da API indica sucesso (por exemplo, status 200)
          if (response.status === 200) {
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('usuario', JSON.stringify(response.data.usuario));
            console.log(sessionStorage.getItem('usuario'))
            this.$router.push('/Agendamentos');
          } else {
            console.log("Erro: " + response.message);
          }
        })
        .catch(error => {
          console.log(error.response.data);
          this.openErrorModal(error.response.data);
        });
      }
    },
  },
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
  width: 150px;
  height: 150px;
  top: -15px;
  right: -45px;
}

.box .square:nth-child(2) {
  width: 150px;
  height: 150px;
  top: 150px;
  left: 45px;
  z-index: 2;
}

.box .square:nth-child(3) {
  width: 120рх;
  height: 120px;
  bottom: 75px;
  right: -15px;
  z-index: 2;
}

.box .square:nth-child(4) {
  width: 150px;
  height: 150px;
  bottom: 45px;
  left: -35px;
}

.box .square:nth-child(5) {
  width: 150px;
  height: 150px;
  top: -50px;
  left: 2px;
}

.box .square:nth-child(6) {
  width: 150px;
  height: 150px;
  top: 180px;
  right: 45px;
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
  background: linear-gradient
    (to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 2%);
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

.form .inputBx .password-control {
  position: absolute;
  top: 11px;
  right: 10px;
  display: inline-block;
  width: 20px;
  height: 20px;
  transition: 0.5s;
}

.form .inputBx .view {
  transition: 0.5s;
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
  font-size: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}
form .inputBx button[type="submit"] {
  background: #fff;
  color: #111;
  max-width: 100px;
  padding: 8px 10px;
  box-shadow: none;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 1.5s;
}

.form .inputBx button[type="submit"]:hover {
  background: linear-gradient
    (115deg, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.25));
  color: #fff;
  transition: 0.5s;
}

.form .inputBx input::placeholder {
  color: #fff;
}

.form .inputBx span {
  position: absolute;
  left: 30px;
  padding: 10px;
  display: inline-block;

  color: #fff;
  transition: 0.5s;
  pointer-events: none;
}

.form .inputBx input:focus ~ span ,
.form .inputBx input:invalid ~ span,  form .inputBx input:valid ~ span {
  transform: translateX(-30px) translateY(-25px);
  font-size: 12px;
}
.form p {
  color: #fff;
  font-size: 15px;
  margin-top: 5px;
}

.form p a {
  color: #fff;
}

.form p a:hover {
  background-color: transparent;
  background-image: linear-gradient (to right, #434343 0%, black 100%);
  -webkit-text-fill-color: transparent;
}

.remember {
  position: relative;
  display: inline-block;
  color: #fff;
  margin-bottom: 10px;
  cursor: pointer;
}

@media (min-width: 768px) {
  .rt-container {
    width: 750px;
  }
  [class="col-rt-"] {
    float: left;
    width: 49.9999999999%;
  }
  .col-rt-6,
  .col-rt-12 {
    width: 100%;
  }
}

@media (min-width: 1200px) {
  .rt-container {
    width: 1170px;
  }
  .col-rt-1 {
    width: 16.6%;
  }
  .col-rt-2 {
    width: 30.33%;
  }
  .col-rt-3 {
    width: 50%;
  }
  .col-rt-4 {
    width: 67.664%;
  }
  .col-rt-5 {
    width: 83.33%;
  }
}

@media only screen and (min-width: 240px) and (max-width: 768px) {
  .ScriptTop h1,
  .ScriptTop ul {
    text-align: center;
  }

  .ScriptTop h1 {
    margin-top: 0;
    margin-bottom: 15px;
  }

  .ScriptTop ul {
    margin-top: 12px;
  }

  .ScriptHeader h1,
  .ScriptHeader h2,
  .scriptnav ul {
    text-align: center;
  }

  .scriptnav ul {
    margin-top: 12px;
  }

  #float-right {
    float: none;
  }
}
.rt-container {
  margin: 0 auto;
  padding-left: 12px;
  padding-right: 12px;
  position: relative;
  top: 50%;
  transition: translatey(-50%);
}

.rt-row:before,
.rt-row:after {
  display: table;
  line-height: 0;
  content: "";
}

.rt-row:after {
  clear: both;
}

[class="col-rt-"] {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  padding: 15px;
  min-height: 1px;
  position: relative;
}

.inputBx,
.acessar {
  display: flex;
  justify-content: space-between;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999; /* Garante que o modal esteja acima de outros elementos */
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 300px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.modal-header {
  font-size: 18px;
  margin-bottom: 10px;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
}

.modal-body {
  font-size: 16px;
}
</style>

