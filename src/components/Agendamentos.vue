<script setup>
import Botoes_Agendamento from './Botoes_Agendamento.vue';
</script>

<template>
  <section>
    <Botoes_Agendamento :cabecalho="'Agendamento'" :nome="nome"></Botoes_Agendamento>
      <div class="container" v-if="agendamentos.length != 0" v-for="(agendamento, indice) in agendamentos"
        :key="indice">
        <div class="esquerda">
          <div class="item">
            <img src="../assets/Icons/AguardandoCalendário.png" style="
              width: 80px;
              height: 80px;
              margin-top: 15px;" />
            <div class="subtitulo">Agendamento {{ indice + 1 }}</div>
            <p v-if="agendamento.medicoId !== medicoId">Médico: {{ agendamento.nomeMedico }}</p>
            <p v-else>Paciente: {{ agendamento.nomePaciente }}</p>
            <p>Especialidade: {{ agendamento.especialidade }}</p>
            <p>Tipo da consulta: {{ agendamento.tipoConsulta }}</p>
            <p>Data agendamento: {{ formattedDate(agendamento.dataAgendamento) }}</p>
          </div>
        </div>
        <div v-if="agendamento.statusConsultaId === 1" class="direita">
          <a :href="agendamento.linkConsulta" target="_blank" v-on:click="finalizarConsulta(agendamento)"><button class="botao-consulta">
            <img src="../assets/Icons/AceitarCalendário.png" style="width: 70px; height: 70px;"/>
            <p>Entrar na Consulta</p></button></a>

          <button class="botao-secundario editar" v-on:click="editarAgendamento(agendamento)">
            <img src="../assets/Icons/EditarCalendário.png" style="width: 50px; height: 50px;"/>
            <p>Editar</p></button>

          <button class="botao-secundario cancelar" v-on:click="cancelarAgendamento(agendamento)">
            <img src="../assets/Icons/CancelarCalendário.png" style="width: 50px; height: 50px;"/>
            <p>Cancelar</p></button>
        </div>
        <div v-else class="direita" style="margin: auto">
          <div class="cancelado">{{ agendamento.statusConsulta }}</div>
        </div>
      </div>
      <div class="container" v-else>Não há agendamentos a serem listados</div>
  </section>
</template>

<script>
export default {
  components: {
    Botoes_Agendamento,
  },
  data() {
    return {
      agendamentos: [],
      token: "",
      usuario: "",
      datasAgendamento: [],
      indiceDatas: 0,
      perfis: [],
      medicoId: 0,
      pacienteId: 0,
      linkConsulta: ''
    };
  },
  created() {
    this.token = sessionStorage.getItem("token");
    this.usuario = JSON.parse(sessionStorage.getItem("usuario"));
    this.nome = this.usuario.nome;
    this.perfis = this.usuario.perfis
    if (this.perfis.length > 1 || this.perfis[0].idPerfil == 2)
      this.medicoId = this.perfis.find(x => x.idPerfil == 2).idMedico
    this.pacienteId = this.perfis.find(x => x.idPerfil == 1).idPaciente
  },
  mounted() {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    if (this.usuario !== null && this.pacienteId !== 0) {
      axios
        .get(
          `https://localhost:7231/Agendamentos/Paciente/${this.pacienteId}`,
          axiosConfig
        )
        .then((response) => {
          // Verificar se a resposta da API indica sucesso (por exemplo, status 200)
          if (response.status === 200) {
            // Redirecionar para a página de sucesso
            console.log(response.data);
            this.agendamentos = response.data;
          } else {
            console.log("Erro: " + response.message);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
    if (this.usuario !== null && this.medicoId !== 0) {
      axios
        .get(
          `https://localhost:7231/Agendamentos/Medico/${this.medicoId}`,
          axiosConfig
        )
        .then((response) => {
          // Verificar se a resposta da API indica sucesso (por exemplo, status 200)
          if (response.status === 200) {
            // Redirecionar para a página de sucesso
            console.log(this.agendamentos)
            this.agendamentos = this.agendamentos.concat(response.data)
          } else {
            console.log("Erro: " + response.message);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  },
  methods: {
    Logout() {
      this.$router.push("/");
    },
    async cancelarAgendamento(agendamento) {
      
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
      await axios.delete(`https://localhost:7231/agendamentos/${agendamento.id}`,
        axiosConfig)
      window.location.reload()
    },
    async finalizarConsulta(agendamento) {
      
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
      await axios.delete(`https://localhost:7231/Agendamentos/${agendamento.id}/encerrar`,
        axiosConfig)
      window.location.reload()
    },
    acessarConsulta(agendamento) {
      let reuniaoId = (agendamento.linkConsulta.substr(25)).split('?');
      localStorage.setItem("linkConsulta", reuniaoId);
      this.$router.push("/Consulta");
    },
    dadosusuario(){
      this.$router.push("/DadosPerfil");
    },
    novoAgendamento() {
      this.$router.push("/Novo_Agendamento");
    },
    editarAgendamento(agendamento) {
      this.$router.push({name: "Editar_Consulta", params: { id: agendamento.id}});
    },
    formattedDate(dataAgendamento) {
      const date = new Date(
        dataAgendamento
      );
      return date.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      });
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

header {
  display: flex;
  border-bottom: white 2px solid;
  text-align: center;
}

.container {
  width: 80%;
  margin: auto;
  margin-top: 40px;
  display: flex;
  box-shadow: 0 5px 25px #70b8d6;
  justify-content: space-between;
  padding-right: 20px;
}

.esquerda {
  width: 50%;
  margin-left: 30px;
  padding: 30px;
}

.esquerda h2 {
  margin-bottom: 10px;
}

.direita {
  display: flex;
  align-items: center;
  justify-content: end;
}

.botao-consulta {
  padding: 20px;
  font-size: 20px;
  border: white 2px solid;
  background-color: #23d5ab;
}

.editar {
  font-size: 16px;
  padding: 10px 30px;
  border: white 2px solid;
  background-color: #ee7752;
}

.cancelar {
  font-size: 16px;
  padding: 10px 20px;
  border: white 2px solid;
  background-color: #e73c7e;
}

.direita button {
  margin: 10px;
}

@media (max-width: 800px) {
  .container {
    width: 100%;
    text-align: center;
  }

  .direita {
    flex-direction: column;
  }
}

.subtitulo {
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  transform: translateY(-55px) translateX(-80px);
}

.cancelado {
  color: rgb(195, 195, 195);
  font-size: 30px;
}
</style>
