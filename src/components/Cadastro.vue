<!-- Cadastro.vue -->
<script setup>
import Layout from './Layout.vue';
import { vMaska } from "maska"

</script>
<template>
  <section>
    <!----<Layout :cabecalho='titulo'>
    </Layout>-->
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
          <h1>Cadastro </h1>
          <div class="container">
            <div class="form">
              <img src="../assets/img/HealthMe.png" />

              <form @submit.prevent="confirmar">

                <div class="inputBx">
                  <input type="text" required="true" placeholder="Nome Completo" v-model="nome"/>
                </div>

                <div class="inputBx password">
                  <input type="password" required="true" placeholder="Senha" v-model="senha"/>
                </div>

                <div class="inputBx">
                  <input type="email" required="true" placeholder="Email" v-model="email"/>
                </div>

                <div class="inputBx">
                  <input v-maska data-maska="['(##) #####-####','(##) ####-####']" required v-model="telefone" placeholder="Insira o telefone: (99) 99999-9999">
                  <p v-if="!validatePhoneNumber(telefone) && telefone != ''">Por favor, insira 10 ou 11 dígitos de telefone.</p>
                </div>

                <div class="inputBx">
                  <input type="date" required="true" placeholder="Data de Nascimento" v-model="dataNascimento"/>
                </div>

                <div class="inputBx">
                  <input type="text" required="true" @input="formatarCPF()" placeholder="CPF, apenas números" maxlength="11" minlength="11" v-model="cpf"/>
                </div>
                
                <label class="checkmedico"><input type="checkbox" v-model="checked"/>É Médico</label>
                
                <div class="inputBx" v-if="checked">
                  <select id="nomeMedico" v-model="uf" required placeholder="Selecione a UF do CRM">
                    <option value="">Selecione a UF do CRM</option>
                    <option v-for="estado in estados" :value="estado" :key="estado">
                    {{ estado }}
                    </option>
                  </select>
                </div>

                <div class="inputBx" v-if="checked">
                  <input type="text" required="true" @input="formatarCRM()" placeholder="Digite o seu CRM, apenas números" minlength="4" maxlength="10" v-model="crm"/>
                </div>

                <div class="inputBx confirmar">
                  <button class="btnVoltar" formnovalidate v-on:click="voltar">Voltar</button>
                  <button class="btnConfirmar" :disabled="!validatePhoneNumber(telefone)">Confirmar</button>
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
  components: {
    Layout,
  },
  data() {
    return {
      nome: "",
      email: "",
      senha: "",
      telefone: "",
      dataNascimento: "",
      cpf: "",
      titulo: 'CADASTRO',
      checked: false,
      uf: '',
      estados: ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'],
      crm: ''
    };
  },
  watch: {
    checked(newVal) {
      if (!newVal) {
        this.uf = '';
        this.crm = '';
      }
    }
  },
  methods: {
    validatePhoneNumber(telefone) {
    const regex = /^(\d{2}) \d{5}-\d{4}|\d{4}-\d{4}$/;
    return regex.test(telefone);
  },
  formatarCPF() {
      // Remova quaisquer caracteres não numéricos do valor do campo
      this.cpf = this.cpf.replace(/\D/g, '');
  },
  formatarCRM() {
      // Remova quaisquer caracteres não numéricos do valor do campo
      this.crm = this.crm.replace(/\D/g, '');
  },
  validarCPF(cpf){
      return cpf.length == 11 ? true: false; 
  },
    async confirmar() {
      const md5Password = CryptoJS.MD5(this.senha).toString();
      const crmMedico = this.checked ? `${this.crm}/${this.uf}` : ''
      const cadastro = {
        nome: this.nome,
        email: this.email,
        senha: md5Password,
        numero: this.telefone,
        dataNascimento: this.dataNascimento,
        cpf: this.cpf,
        medico: this.checked,
        crm: crmMedico
      };
      await axios.post('https://localhost:7146/Usuario/Cadastro', cadastro)
        .then(response => {
          // Verificar se a resposta da API indica sucesso (por exemplo, status 200)
          if (response.status === 200) {
            console.log(response.data);
          } else {
            console.log("Erro: " + response.message);
          }
        });
        
      await axios.post('https://localhost:7146/Usuario/Login', {cpf: this.cpf, senha: md5Password})
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
        });
    },
    voltar(){
      this.$router.push('/')
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
  margin: 0px auto;
  text-align: center;
}

.container::after {
  content: "";
  position: absolute;
  top: 15px;
  right: 15px;
  bottom: 15px;
  left: 15px;
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


.form .inputBx select {
  width: 88%;
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

.form .inputBx select option {
  width: 88%;
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

.form .inputBx .btnConfirmar {
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

.form .inputBx .btnVoltar {
  width: 30%;
  outline: none;
  border: none;
  border: 1px solid #102fac33;
  background: rgb(71, 71, 71);
  margin-right: 8px;
  padding: 8px 10px;
  padding-left: 20px;
  border-radius: 10px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}


.checkmedico {
  position: relative;
  display: inline-block;
  color: #fff;
  margin-bottom: 10px;
  cursor: pointer;
}

</style>