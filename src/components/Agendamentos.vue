<script setup>
import Layout from './Layout.vue';
</script>

<template>
  <section>
    <Layout :cabecalho="titulo">
    </Layout>
    <main>
      <div class="container">
        <div class="esquerda">
          <h2>Consulta 1</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A et at
            neque sequi tempora labore ratione. Placeat iusto illo, pariatur
            fugit dolorum voluptatem aliquam sint voluptatum sequi, consequatur
            architecto repellendus labore autem beatae, laudantium similique
            quis temporibus.
          </p>
        </div>
        <div class="direita">
          <button class="botao-consulta">Entrar na Consulta</button>
          <button class="botao-secundario editar">Editar</button>
          <button class="botao-secundario cancelar">Cancelar</button>
        </div>
      </div>
      <div class="container">
        <div class="esquerda">
          <h2>Consulta 2</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A et at
            neque sequi tempora labore ratione. Placeat iusto illo, pariatur
            fugit dolorum voluptatem aliquam sint voluptatum sequi, consequatur
            architecto repellendus labore autem beatae, laudantium similique
            quis temporibus.
          </p>
        </div>
        <div class="direita">
          <button class="botao-consulta">Entrar na Consulta</button>
          <button class="botao-secundario editar">Editar</button>
          <button class="botao-secundario cancelar">Cancelar</button>
        </div>
      </div>
      <div
        class="container"
        v-if="agendamentos.length != 0"
        v-for="(agendamento, indice) in agendamentos"
        :key="indice"
      >
        <div class="esquerda">
          <h2>Agendamento {{ indice + 1 }}</h2>
          <p>Médico: {{ agendamento.nomeMedico }}</p>
          <p>Especialidade: {{ agendamento.especialidade }}</p>
          <p>Tipo da consulta: {{ agendamento.tipoConsulta }}</p>
          <p>
            Data agendamento: {{ formattedDate(agendamento.dataAgendamento) }}
          </p>
        </div>
        <div class="direita">
          <button class="botao-consulta">Entrar na Consulta</button>
          <button class="botao-secundario editar">Editar</button>
          <button class="botao-secundario cancelar">Cancelar</button>
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
      titulo: 'AGENDAMENTOS',  
      agendamentos: [],
      token: "",
      usuario: "",
      datasAgendamento: [],
      indiceDatas: 0,
    };
  },
  created() {
    this.token = sessionStorage.getItem("token");
    this.usuario = JSON.parse(sessionStorage.getItem("usuario"));
  },
  mounted() {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    if (this.usuario !== null) {
        axios
        .get(
          `https://localhost:7231/Agendamentos/Paciente/${this.usuario.id}`,
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
  },
  methods: {
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
    },
  computed: {},
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

header {
  display: flex;
  border-bottom: white 2px solid;
  text-align: center;
}

.home,
.sair {
  margin: 20px;
  padding: 10px;
}

h1 {
  margin: auto;
}

.container {
  width: 80%;
  margin: 50px auto;
  display: flex;
  justify-content: space-between;
}

.esquerda {
  width: 50%;
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
  background-color: #ee7752;
}

.cancelar {
  background-color: #e73c7e;
}

.direita button {
  margin: 10px;
}

footer {
  text-align: center;
}

.novo,
.home,
.sair {
  font-size: 20px;
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  color: #fff;
}

.novo {
  padding: 20px 50px;
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
</style>
