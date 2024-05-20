<script setup>
import Layout from './Layout.vue';
import Titulos from './Titulos.vue';
</script>

<template>
  <section>
    
    <Titulos :cabecalho="'Agendamento'"></Titulos>

      <button class="sair" v-on:click="Logout">
      <i class="fa fa-sign-out"></i> Sair
      </button>
      
      <main>
      <div class="container"
        v-if="agendamentos.length != 0"
        v-for="(agendamento, indice) in agendamentos"
        :key="indice">

        <div class="esquerda">
          <div class="item">
            <img src="../assets/img/agendamento.png" style="
              width: 100px;
              height: 80px;
              margin-top: 15px;"/>
          
          <div class="subtitulo">Agendamento {{ indice + 1 }}</div>
          <p v-if="agendamento.medicoId !== medicoId">Médico: {{ agendamento.nomeMedico }}</p>
          <p v-else>Paciente: {{agendamento.nomePaciente}}</p>
          <p>Especialidade: {{ agendamento.especialidade }}</p>
          <p>Tipo da consulta: {{ agendamento.tipoConsulta }}</p>
          <p>
            Data agendamento: {{ formattedDate(agendamento.dataAgendamento) }}
          </p>
          </div>
        </div>
        <div v-if="agendamento.statusConsultaId === 1" class="direita">
          <button class="botao-consulta" v-on:click="acessarConsulta">Entrar na Consulta</button>
          <button class="botao-secundario editar" v-if="agendamento.pacienteId == pacienteId">Editar</button>
          <button class="botao-secundario cancelar" v-on:click="cancelarAgendamento(agendamento)">Cancelar</button>
        </div>
        <div v-else class="direita" style="margin: auto">
          <div class="cancelado">{{ agendamento.statusConsulta }}</div>
        </div>
      </div>
      <div class="container" v-else>Não há agendamentos a serem listados</div>
    </main>
    <footer>
      <button class="novo" v-on:click="novoAgendamento">Novo Agendamento</button>
    </footer>
  </section>
</template>

<script>
export default {
    components: {
      Layout,
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
    this.perfis = this.usuario.perfis
    if(this.perfis.length > 1 || this.perfis[0].idPerfil == 2)
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
    if(this.usuario !== null && this.medicoId !== 0){
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
    async cancelarAgendamento(agendamento){
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
      await axios.delete(`https://localhost:7231/agendamentos/${agendamento.id}`,
          axiosConfig) 
      window.location.reload()
    },
    acessarConsulta(){
      this.$router.push("/Consulta");
    },
    novoAgendamento(){
      this.$router.push("/Novo_Agendamento");
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

.sair {
  margin: 20px;
  padding: 10px;
  font-size: 20px;
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  color: #fff;
  transform: translateX(1750px) translateY(-85px);
}

.container {
  width: 80%;
  margin: 70px auto;
  display: flex;
  box-shadow: 0 5px 25px #70b8d6;
  justify-content: space-between;
  padding-right: 20px;
  transform: translateY(-50px);
}

.esquerda {
  width: 50%;
  padding: 30px;
}

.esquerda h2 {
  margin-bottom: 10px;
}

.direita {
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  background-color: black;
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
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

footer {
  text-align: center;
}

.novo {
  text-align: center;
  padding: 20px 50px;
  font-size: 20px;
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  color: #fff;
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
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  transform: translateY(-55px) translateX(-80px);
}

.cancelado{
  color: rgb(195, 195, 195);
  font-size: 30px;
}
</style>
