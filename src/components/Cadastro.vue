<!-- Cadastro.vue -->
<script setup>
import Layout from "./Layout.vue";
import Titulos from './Titulos.vue';
import { vMaska } from "maska";
</script>

<template>
  <section>

    <Titulos :cabecalho="'Cadastro'"></Titulos>

    <main>

          <div class="iconuser">
          <img src="../assets/Icons/Adicionar User.png"/>
          </div>
          <div class="iconsenha">
          <img src="../assets/Icons/Icon Senha.png"/>
          </div>
          <div class="iconemail">
          <img src="../assets/Icons/Email2.png"/>
          </div>
          <div class="icontel">
          <img src="../assets/Icons/Telefone.png"/>
          </div>
          <div class="icondata">
          <img src="../assets/Icons/Calendário2.png"/>
          </div>
          <div class="iconcpf">
          <img src="../assets/Icons/CPF.png"/>
          </div>

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
              <br><br>

              <div class="inputBx">
                <input type="text" required="true" placeholder="Nome Completo" v-model="nome" />
              </div>

              <div class="inputBx password">
                <input type="password" required="true" placeholder="Senha" v-model="senha" />
              </div>

              <div class="inputBx">
                <input type="email" required="true" placeholder="Email" v-model="email" />
              </div>

              <div class="inputBx">
                <input v-maska data-maska="['(##) #####-####','(##) ####-####']" required="true" v-model="telefone"
                  placeholder="Insira o telefone: (99) 99999-9999" />
                <p v-if="!validatePhoneNumber(telefone) && telefone != ''">
                  Por favor, insira 10 ou 11 dígitos de telefone.
                </p>
              </div>

              <div class="inputBx">
                <input type="date" required="true" placeholder="Data de Nascimento" v-model="dataNascimento" />
              </div>

              <div class="inputBx">
                <input type="text" required="true" @input="formatarCPF()" placeholder="CPF, apenas números"
                  maxlength="11" minlength="11" v-model="cpf" />
              </div>

              <label class="checkmedico">
                <input type="checkbox" v-model="checked" /> Sou Médico</label>

              <div class="inputBx" v-if="checked">
                <select id="especialidade" v-model="selectedEspecialidade" @change="buscarMedicosPorEspecialidade"
                  required placeholder="Selecione a especialidade">

                  <option id="selecaoEspecialidade" value="">
                    {{ selecaoEspecialidade }}
                  </option>

                  <option v-if="especialidades.count != 0" v-for="especialidade in especialidades"
                    :value="especialidade.id" :key="especialidade.id">
                    {{ especialidade.nomeEspecialidade }}
                  </option>
                </select>
              </div>

              <div class="inputBx" v-if="checked">

                <div class="iconesp">
                <img src="../assets/Icons/Icon Médico.png"/>
                </div>

                <div class="iconcrm">
                <img src="../assets/Icons/Icon CRM.png"/>
                </div>

                <div class="iconnumcrm">
                <img src="../assets/Icons/Icon NumCRM.png"/>
                </div>

                <select id="nomeMedico" v-model="uf" required placeholder="Selecione a UF do CRM">

                  <option value="">Selecione a UF do CRM</option>

                  <option v-for="estado in estados" :value="estado" :key="estado">
                    {{ estado }}
                  </option>
                </select>
              </div>

              <div class="inputBx" v-if="checked">
                <input type="text" required="true" @input="formatarCRM()" placeholder="Digite o seu CRM, apenas números"
                  minlength="4" maxlength="10" v-model="crm" />
              </div>

              <div class="inputBx confirmar">
                <button class="btnVoltar" formnovalidate v-on:click="voltar">
                  Voltar
                </button>
                <button class="btnConfirmar" :disabled="!validatePhoneNumber(telefone)">
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
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
      titulo: "CADASTRO",
      checked: false,
      uf: "",
      estados: [
        "AC",
        "AL",
        "AM",
        "AP",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MG",
        "MS",
        "MT",
        "PA",
        "PB",
        "PE",
        "PI",
        "PR",
        "RJ",
        "RN",
        "RO",
        "RR",
        "RS",
        "SC",
        "SE",
        "SP",
        "TO",
      ],
      idEspecialidade: 0,
      crm: "",
      selectedEspecialidade: 0,
      selecaoEspecialidade: "Selecione a Especialidade",
      especialidades: []
    };
  },
  watch: {
    checked(newVal) {
      if (!newVal) {
        this.uf = "";
        this.crm = "";
      }
    },
  },
  mounted() {
    this.carregarEspecialidades();
  },
  methods: {
    validatePhoneNumber(telefone) {
      const regex = /^(\d{2}) \d{5}-\d{4}|\d{4}-\d{4}$/;
      return regex.test(telefone);
    },
    formatarCPF() {
      // Remova quaisquer caracteres não numéricos do valor do campo
      this.cpf = this.cpf.replace(/\D/g, "");
    },
    formatarCRM() {
      // Remova quaisquer caracteres não numéricos do valor do campo
      this.crm = this.crm.replace(/\D/g, "");
    },
    validarCPF(cpf) {
      return cpf.length == 11 ? true : false;
    },
    async carregarEspecialidades(id = 0) {
      await axios.get(`https://localhost:7231/agendamentos/Especialidades?idMedico=${id}`)
        .then(response => {
          // Verificar se a resposta da API indica sucesso (por exemplo, status 200)
          if (response.status === 200) {
            this.especialidades = response.data
            this.selecaoEspecialidade = "Selecione uma especialidade"
          }
          else if (response.status === 204) {
            this.especialidades = [];
            this.selecaoEspecialidade = "Não há especialidades para este médico"
          }
          else {
            console.log("Erro: " + response.message);
          }
        })
        .catch(error => {
          console.log(error.response.data);
        });
    },
    async confirmar() {
      const md5Password = CryptoJS.MD5(this.senha).toString();
      const crmMedico = this.checked ? `${this.crm}/${this.uf}` : "";
      const cadastro = {
        nome: this.nome,
        email: this.email,
        senha: md5Password,
        numero: this.telefone,
        dataNascimento: this.dataNascimento,
        cpf: this.cpf,
        medico: this.checked,
        crm: crmMedico,
        idEspecialidade: this.selectedEspecialidade
      };
      await axios
        .post("https://localhost:7146/Usuario/Cadastro", cadastro)
        .then((response) => {
          // Verificar se a resposta da API indica sucesso (por exemplo, status 200)
          if (response.status === 200) {
            console.log(response.data);
          } else {
            console.log("Erro: " + response.message);
          }
        }).catch(error => {
          alert(error.response.data);
        });

      await axios
        .post("https://localhost:7146/Usuario/Login", {
          cpf: this.cpf,
          senha: md5Password,
        })
        .then((response) => {
          // Verificar se a resposta da API indica sucesso (por exemplo, status 200)
          if (response.status === 200) {
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem(
              "usuario",
              JSON.stringify(response.data.usuario)
            );
            console.log(sessionStorage.getItem("usuario"));
            this.$router.push("/Agendamentos");
          } else {
            console.log("Erro: " + response.message);
          }
        });
    },
    voltar() {
      this.$router.push("/");
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
  top: -40px;
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
  top: -40px;
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
  top: 350px
}

.container {
  position: relative;
  padding: 40px;
  width: 500px;
  min-height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  /* backdrop-filter: blur(5px);  */
  border-radius: 10px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  margin: 20px auto;
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
  top: 50px;
  margin-bottom: 20px;
}

/* Barras de Especialidade e CRM  */
.form .inputBx select {
  width: 112%;
  outline: none;
  border: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 40px;
  padding-left: 20px;
  border-radius: 15px;
  color: hwb(225 0% 93%);
  font-size: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transform: translateY(-90px) translateX(-19px);
}

/* Barras gerais  */
.form .inputBx select option {
  width: 88%;
  outline: none;
  border: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 50px;
  padding-left: 20px;
  border-radius: 15px;
  color: hwb(225 0% 93%);
  font-size: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transform: translateY(-90px) translateX(-35px);
}

.form .inputBx input {
  width: 88%;
  outline: none;
  border: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 50px;
  padding-left: 20px;
  border-radius: 15px;
  color: hwb(225 0% 93%);
  font-size: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transform: translateY(-90px) translateX(-20px);
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
  padding-left: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transform: translateY(-70px);
}

.form .inputBx .btnVoltar {
  width: 30%;
  outline: none;
  border: none;
  border: 1px solid #102fac33;
  background: rgb(71, 71, 71);
  margin-right: 8px;
  padding: 8px 10px;
  padding-left: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transform: translateY(-70px);
}

.checkmedico {
  position: relative;
  display: inline-block;
  color: #fff;
  margin-bottom: 10px;
  cursor: pointer;
  transform: translateY(-40px);
}

.iconuser {
  display: flex;
  position: absolute;
  width: 40px;
  height: 42px;
  margin-left: 540px;
  margin-top: 36px;  
}


.iconsenha {
  display: flex;
  position: absolute;
  width: 40px;
  height: 40px;
  margin-left: 540px;
  margin-top: 93px;  
}

.iconemail {
  display: flex;
  position: absolute;
  width: 40px;
  height: 40px;
  margin-left: 540px;
  margin-top: 146px; 
}

.icontel {
  display: flex;
  position: absolute;
  width: 40px;
  height: 40px;
  margin-left: 540px;
  margin-top: 203px; 
}

.icondata {
  display: flex;
  position: absolute;
  width: 40px;
  height: 40px;
  margin-left: 540px;
  margin-top: 260px; 
}

.iconcpf {
  display: flex;
  position: absolute;
  width: 40px;
  height: 40px;
  margin-left: 540px;
  margin-top: 317px; 
}

.iconesp {
  display: flex;
  position: absolute;
  width: 40px;
  height: 40px;
  margin-left: -70px;
  margin-top: -150px; 
}

.iconcrm {
  display: flex;
  position: absolute;
  width: 40px;
  height: 40px;
  margin-left: -70px;
  margin-top: -90px;  
}

.iconnumcrm {
  display: flex;
  position: absolute;
  width: 40px;
  height: 40px;
  margin-left: -70px;
  margin-top: -32px;  
}
</style>
