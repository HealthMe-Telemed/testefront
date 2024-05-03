<script setup>
import { NavigationFailureType } from 'vue-router';
import Layout from './Layout.vue';
</script>
<template>
  <section>
    <Layout :cabecalho="titulo">
    </Layout>
    <main>
      <div class="container">
        <div class="box">
          <div class="square" style="--i: 0"></div>
          <div class="square" style="--i: 1">
            <img src="../assets/img/medico2.png" style="
              width: 110px;
              height: 110px;
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
          <div class="container">
            <div class="form">
              <img src="../assets/img/HealthMe.png" />

              <form @submit.prevent="confirmarConsulta">

                <div class="inputBx">
                  <select id="nomeMedico" v-model="selectedMedicos" @change="atualizaEspecialidadesEDatas" required placeholder="Selecione o Nome do Médico">
                    <option value="">{{ selecaoMedico }}</option>
                    <option v-if="medicos.count != 0" v-for="medico in medicos" :value="medico.id" :key="medico.id">
                    {{ medico.nome }} - CRM {{ medico.crm }}
                    </option>
                  </select>
                </div>

                <div class="inputBx">
                  <select id="especialidade" v-model="selectedEspecialidade" @change="buscarMedicosPorEspecialidade" required placeholder="Selecione a especialidade">
                    <option id="selecaoEspecialidade" value="">{{ selecaoEspecialidade }} </option>
                    <option v-if="especialidades.count != 0" v-for="especialidade in especialidades" :value="especialidade.id" :key="especialidade.id">
                    {{ especialidade.nomeEspecialidade }}</option>
                  </select>
                </div>

                <div class="inputBx">
                  <input type="text" v-model="dataConsulta" :disabled="selectedMedicos === null || selectedMedicos === ''" required :list="dateListId" @input="checkIfDateIsValid" @change="filtrarHorario" placeholder="Selecione uma data:"/>
                  <datalist :id="dateListId">
                    <option value="">Selecione uma data</option>
                    <option v-for="date in datasDisponiveis" :key="date" :value="date"></option>
                  </datalist>
                </div>

                <div class="inputBx">
                  <input type="text" v-model="horarioConsulta" :disabled="dataConsulta === ''" required @input="checkIfTimeIsValid" :list="timesListId" placeholder="Selecione um horário"/>
                  <datalist :id="timesListId">
                    <option v-for="hora in horasDisponiveis" :key="hora" :value="hora"></option>
                  </datalist>
                </div>

                <div class="inputBx confirmar">
                  <button class="btnVoltar" formnovalidate v-on:click="voltar">Voltar</button>
                  <button type="submit" class="btnConfirmar" >Confirmar</button>
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
      medicos:[],
      selectedMedicos: "",
      selecaoMedico: "Selecione o médico",
      especialidades:[],
      selectedEspecialidade: '',
      selecaoEspecialidade: 'Selecione a Especialidade',
      dataHorasDisponiveis: [],
      horasDisponiveis: [],
      datasDisponiveis: [],
      dataConsulta: "",
      horarioConsulta: "",
      titulo: 'NOVO AGENDAMENTO',
      token: '', 
      usuario: '',
      paciente: '',
      dateListId: 'datesList',
      timesListId: 'timesList',
      medico: 0

    };
  },
  created() {
    this.token = sessionStorage.getItem("token");
    this.usuario = JSON.parse(sessionStorage.getItem("usuario"));
    this.buscarIdPaciente();
    this.buscarIdMedico();
  },
  mounted(){
    if(this.token !== null)
    { 
      this.carregarMedicos();
      this.carregarEspecialidades();
    }
  },
  methods:{
    atualizaEspecialidadesEDatas(){
      this.buscarEspecialidadesPorMedico();
      this.dataConsulta = '';
      this.horarioConsulta = '';
      if(this.selectedMedicos !== ''){ 
        this.carregarDataEHora(this.selectedMedicos);
      }
    },
    buscarIdPaciente()
    {
        const perfis = this.usuario.perfis.filter(x => x.idPerfil === 1);
        this.paciente = perfis[0].idPaciente

    },
    buscarIdMedico(){
      const perfis = this.usuario.perfis.filter(x => x.idPerfil === 2);
      if (perfis.length > 0)
        this.medico = perfis[0].idMedico
        console.log(this.medico)
    },
    filtrarHorario(){
      if(this.dataConsulta){
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
    formatarDataParaBR(){
      const [day, month, year] = this.dataConsulta.split('/');
      const dataEscolhida = new Date(`${year}-${month}-${day}`);
      return dataEscolhida.toISOString().split('T')[0];
    },
    async carregarDataEHora(){
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
    buscarMedicosPorEspecialidade(){
      if (this.selectedEspecialidade === '') {
        this.carregarMedicos(); // Se nenhum valor estiver selecionado, busca todos os dados
      } else {
        this.carregarMedicos(this.selectedEspecialidade);
         // Se um valor estiver selecionado, passa o ID como parâmetro
      }
    },
    buscarEspecialidadesPorMedico(){
      if (this.selectedMedicos === '') {
        this.carregarEspecialidades(); // Se nenhum valor estiver selecionado, busca todos os dados
      } else {
        this.carregarEspecialidades(this.selectedMedicos);
         // Se um valor estiver selecionado, passa o ID como parâmetro
      }
    },
    async confirmarConsulta() {
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
    await axios.post(`https://localhost:7231/agendamentos`, body,
      axiosConfig)
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
    limparFormulario(){
      this.selectedMedicos = '',
      this.selectedEspecialidade = '',
      this.dataConsulta = '',
      this.horarioConsulta = ''
    },
    async carregarMedicos(id = 0){
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
          else if(response.status == 204){
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
    async carregarEspecialidades(id = 0){
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
          else if (response.status === 204){
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
    voltar(){
      this.$router.push('/Agendamentos');
    },
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
  background: linear-gradient(-45deg, #3d93b7, #70b8d6);
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

button {
  margin: 5px;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  background-color: black;
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2)
}

.fas {
  width: 32px;
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
  margin: auto;
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
</style>
