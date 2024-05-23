<script setup>
import { NavigationFailureType } from 'vue-router';
import Layout from "./Layout.vue";
import Titulos from './Titulos.vue';
import { vMaska } from "maska";
</script>

<template>
  <section>

    <Titulos :cabecalho="'Editar Agendamento'"></Titulos>

    <main>
      <div class="container">
        <div class="box">
          <div class="square" style="--i: 0"></div>
          <div class="square" style="--i: 1">
            <img src="../assets/img/agenda.png" style="
                    width: 140px;
                    height: 130px;
                    margin-left: 0px;
                    margin-top: 10px;" />
          </div>
          <div class="square" style="--i: 2"></div>
          <div class="square" style="--i: 3"></div>
          <div class="square" style="--i: 4"></div>
          <div class="square" style="--i: 5">
            <img src="../assets/img/agenda.png" style="
                    width: 140px;
                    height: 130px;
                    margin-left: 0px;
                    margin-top: 10px;" />
          </div>
          <div class="form">
            <img src="../assets/img/HealthMe.png" style="margin-top:-35px;" />

            <form @submit.prevent="editarConsulta">

              <div class="iconMedico">
              <img src="../assets/Icons/Icon Médico.png" style="width: 40px; height: 40px;"/>
              </div>

              <div class="inputBx">
                <select id="nomeMedico" v-model="selectedMedicos" required @change="atualizaDatas"
                  placeholder="Selecione o Nome do Médico">
                  <option value="">Selecione o Nome do Médico</option>
                  <option :value="agendamento.medicoId" :key="agendamento.medicoId">
                    {{ agendamento.nomeMedico }} - CRM {{ agendamento.crmMedico }}
                  </option>
                </select>
              </div>

              <div class="iconEsp">
              <img src="../assets/Icons/Icon NumCRM.png" style="width: 40px; height: 40px;"/>
              </div>

              <div class="inputBx">
                <select id="especialidade" v-model="selectedEspecialidade"
                  required="true" placeholder="Selecione a especialidade">
                  <option id="selecaoEspecialidade" value="">Selecione a especialidade</option>
                  <option :selected="true" :value="agendamento.especialidadeId" :key="agendamento.especialidadeId">
                    {{ agendamento.especialidade }}</option>
                </select>
              </div>

              <div class="iconData">
              <img src="../assets/Icons/Calendário2.png" style="width: 40px; height: 40px;"/>
              </div>

              <div class="inputBx">
                <input type="text" v-model="dataConsulta" :disabled="selectedMedicos === null || selectedMedicos === ''"
                  required :list="dateListId" @input="checkIfDateIsValid" @change="filtrarHorario"
                  placeholder="Selecione uma data:"/>
                <datalist :id="dateListId">
                  <option value="">Selecione uma data</option>
                  <option v-for="date in datasDisponiveis" :key="date" :value="date"></option>
                </datalist>
              </div>

              <div class="iconHora">
              <img src="../assets/Icons/IconHora.png" style="width: 40px; height: 40px;"/>
              </div>

              <div class="inputBx">
                <input type="text" v-model="horarioConsulta" :disabled="dataConsulta === ''" required
                  @input="checkIfTimeIsValid" :list="timesListId" placeholder="Selecione um horário" />
                <datalist :id="timesListId">
                  <option v-for="hora in horasDisponiveis" :key="hora" :value="hora"></option>
                </datalist>
              </div>

              <div class="inputBx editar">
                <button class="btnVoltar" formnovalidate v-on:click="voltar">Voltar</button>
                <button type="submit" class="btnAlterar">Alterar</button>
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
  data() {
    return {
      agendamento: "",
      selectedMedicos: "",
      selectedEspecialidade: '',
      especialidade: "",
      dataHorasDisponiveis: [],
      horasDisponiveis: [],
      datasDisponiveis: [],
      dataConsulta: "",
      horarioConsulta: "",
      token: '',
      usuario: '',
      paciente: '',
      dateListId: 'datesList',
      timesListId: 'timesList',
      medico: 0

    };
  },
  created() {
    this.buscarAgendamento();
    this.token = sessionStorage.getItem("token");
    this.usuario = JSON.parse(sessionStorage.getItem("usuario"));
    this.selectedMedicos = this.agendamento.medicoId
    this.buscarIdPaciente();
    this.buscarIdMedico();
  },

  mounted() {
    this.selectedEspecialidade = this.agendamento.especialidadeId;
    this.especialidade = this.agendamento.especialidade;
  },

  methods: {
    buscarAgendamento(){
      axios
        .get(
          `https://localhost:7231/Agendamentos/${this.$route.params.id}`
        )
        .then((response) => {
          // Verificar se a resposta da API indica sucesso (por exemplo, status 200)
          if (response.status === 200) {
            // Redirecionar para a página de sucesso
            console.log(response.data);
            this.agendamento = response.data;
          } else {
            console.log("Erro: " + response.message);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    
    atualizaDatas() {
      this.dataConsulta = '';
      this.horarioConsulta = '';
      if (this.selectedMedicos !== '') {
        this.carregarDataEHora(this.selectedMedicos);
      }
    },
    buscarIdPaciente() {
      const perfis = this.usuario.perfis.filter(x => x.idPerfil === 1);
      this.paciente = perfis[0].idPaciente

    },
    buscarIdMedico() {
      const perfis = this.usuario.perfis.filter(x => x.idPerfil === 2);
      if (perfis.length > 0)
        this.medico = perfis[0].idMedico
      console.log(this.medico)
    },
    filtrarHorario() {
      if (this.dataConsulta) {
        this.horarioConsulta = '';
        this.horasDisponiveis = [];
        const dataFormatada = this.formatarDataParaBR();
        const horariosNoDia = this.dataHorasDisponiveis.filter(hora => {
          const horaLimite = new Date(`${dataFormatada}T18:00:00`);
          const horaInicio = new Date(`${dataFormatada}T08:59:00`);
          return horaLimite > new Date(hora.dataHora) && horaInicio < new Date(hora.dataHora); // Retorna apenas as horas após a hora selecionada
        });
        horariosNoDia.forEach(horario => {
          const dataHora = new Date(horario.dataHora)
          const time = dataHora.toTimeString().split(' ')[0]; // Obtém a hora no formato hh:mm:ss
          if (!this.horasDisponiveis.includes(time)) {
            this.horasDisponiveis.push(time); // Adiciona a hora ao array de horas, se ainda não estiver lá
          }
        });
      }

    },
    formatarDataParaBR() {
      const [day, month, year] = this.dataConsulta.split('/');
      const dataEscolhida = new Date(`${year}-${month}-${day}`);
      return dataEscolhida.toISOString().split('T')[0];
    },
    async carregarDataEHora() {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      await axios.get(`https://localhost:7231/agendamentos/DataHora/paciente/${this.paciente}/medico/${this.selectedMedicos}`, axiosConfig)
        .then(response => {
          // Verificar se a resposta da API indica sucesso (por exemplo, status 200)
          if (response.status === 200) {
            this.dataHorasDisponiveis = response.data
            this.datasDisponiveis = [];
            this.horasDisponiveis = [];
          } else {
            console.log("Erro: " + response.message);
          }
        })
        .catch(error => {
          console.log(error.response.data);
        });
      this.separateDateTime();
    },
    separateDateTime() {
      // Itera sobre os registros para extrair as datas e horas
      this.dataHorasDisponiveis.forEach(record => {

        const date = new Date(record.dataHora).toLocaleDateString('pt-BR');
        if (!this.datasDisponiveis.includes(date)) {
          this.datasDisponiveis.push(date); // Adiciona a data ao array de datas, se ainda não estiver lá
        }

      });
    },
    checkIfDateIsValid() {
      // Verifica se a data inserida pelo usuário está presente na lista de datas disponíveis
      if (!this.datasDisponiveis.includes(this.dataConsulta)) {
        // Limpa o campo se a data não for válida
        this.dataConsulta = '';
      }
    },
    checkIfTimeIsValid() {
      // Verifica se a data inserida pelo usuário está presente na lista de datas disponíveis
      const horario = `${this.horarioConsulta}`
      if (!this.horasDisponiveis.includes(horario)) {
        // Limpa o campo se a data não for válida
        this.horarioConsulta = '';
      }
    },
    async editarConsulta() {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      const data = this.formatarDataParaBR();
      const body = {
        idMedico: this.selectedMedicos,
        idPaciente: this.paciente,
        idEspecialidade: this.selectedEspecialidade,
        idTipoConsulta: 1,
        idStatusConsulta: 0,
        dataAgendada: new Date(`${data}T${this.horarioConsulta}Z`)
      };
      await axios.patch(`https://localhost:7231/agendamentos/${this.$route.params.id}`, body)
        .then(response => {
          // Verificar se a resposta da API indica sucesso (por exemplo, status 200)
          if (response.status === 200) {
            this.limparFormulario();
            this.$router.push('/Agendamentos')
          } else {
            console.log("Erro: " + response.message);
          }
        })
        .catch(error => {
          console.log(error.response.data);
        });
    },
    limparFormulario() {
      this.selectedMedicos = '',
        this.selectedEspecialidade = '',
        this.dataConsulta = '',
        this.horarioConsulta = ''
    },
    async carregarMedicos(id = 0) {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      await axios.get(`https://localhost:7231/agendamentos/Medicos?idEspecialidade=${id}&idMedico=${this.medico}`, axiosConfig)
        .then(response => {
          // Verificar se a resposta da API indica sucesso (por exemplo, status 200)
          if (response.status === 200) {
            this.medicos = response.data;
            this.selecaoMedico = "Selecione um médico";
          }
          else if (response.status == 204) {
            this.medicos = [];
            this.selecaoMedico = "Não há médicos para esta especialidade";
          }
          else {
            console.log("Erro: " + response.message);
          }
        })
        .catch(error => {
          console.log(error.response.data);
        });
    },
    async carregarEspecialidades(id = 0) {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      await axios.get(`https://localhost:7231/agendamentos/Especialidades?idMedico=${id}`, axiosConfig)
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
    voltar() {
      this.$router.push('/Agendamentos');
    },
    alterar(){
      this.$router.push('./Agendamentos')
    }
  }
};
</script>

<!-- ESTILOS -->

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

/*CONTAINER PRINCIPAL  */
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
  top: -15px;
  right: -500px;
}

/* 2º lado direito   */
.box .square:nth-child(6) {
  width: 150px;
  height: 150px;
  top: 175px;
  right: -350px;
  z-index: 2;
}

/* 3º lado direito   */
.box .square:nth-child(3) {
  width: 150px;
  height: 150px;
  bottom: 100px;
  right: -450px;
  top: 370px;
}

/* 1º lado esquerdo   */
.box .square:nth-child(5) {
  width: 150px;
  height: 150px;
  top: -35px;
  left: -500px;
}

/* 2º lado esquerdo   */
.box .square:nth-child(2) {
  width: 150px;
  height: 150px;
  top: 175px;
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
  padding: 20px;
  width: 450px;
  min-height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
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
  top: 5px;
}

.form .inputBx {
  position: relative;
  width: 100%;
  top: 50px;
  left: 20px;
  margin-bottom: 20px;
}

/* Barras de Medico e CRM  */
.form .inputBx select {
  width: 110%;
  outline: none;
  border: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 30px;
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
  padding: 8px 30px;
  padding-left: 20px;
  border-radius: 15px;
  color: hwb(225 0% 93%);
  font-size: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transform: translateY(-90px) translateX(-35px);
}

/* Barras Data e Horário  */
.form .inputBx input {
  width: 88%;
  outline: none;
  border: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 41px;
  padding-left: 20px;
  border-radius: 15px;
  color: hwb(225 0% 93%);
  font-size: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transform: translateY(-90px) translateX(-20px);
}

.form img {
  display: flex;
  width: 250px;
  margin: auto;
}

.form .inputBx .fas {
  position: absolute;
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
  transform: translateY(-80px);
}

.form .inputBx .btnAlterar {
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
  transform: translateY(-80px);
}

.iconMedico {
  display: flex;
  position: absolute;
  margin-top: -41px;
  margin-left: -55px;
}

.iconEsp {
  display: flex;
  position: absolute;
  margin-top: -41px;
  margin-left: -55px;
}

.iconData {
  display: flex;
  position: absolute;
  margin-top: -41px;
  margin-left: -55px;
}

.iconHora {
  display: flex;
  position: absolute;
  margin-top: -41px;
  margin-left: -55px;
}
</style>