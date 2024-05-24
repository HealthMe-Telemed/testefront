<template>
    <header>

      <button class="perfil" v-on:click="dadosusuario">
        <img src="../assets/Icons/Icon Usuario.png" style="width: 50px; height: 50px;"/>
        <p>{{ nome }}</p></button>

      <button class="novo" v-on:click="novoAgendamento">
        <img src="../assets/Icons/Adicionar.png" style="width: 50px; height: 50px;"/>
        <p> Novo Agendamento </p></button>

      <div class="titulo">{{cabecalho}}</div>

      <button class="sair" v-on:click="Logout">
        <i class="fa fa-sign-out"></i> <img src="../assets/Icons/Sair.png" style="width: 50px; height: 50px;"/>
        <p>Sair</p></button>
    </header>
</template>
<style>
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
  font-size: 40px;
}

button {
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  background-color: black;
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  justify-content: center;
}

.novo {
  margin: 20px;
  padding: 10px;
  font-size: 20px;
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  color: #fff;
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
  align-items: end;
}

.titulo {
  display: flex;
  font-size: 40px;
  align-items: center;
}

.perfil {
  margin: 20px;
  padding: 10px;
  font-size: 20px;
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  color: #fff;
  text-align: center;
}
</style>

<script>
export default{
    props:['cabecalho', 'nome'],
    methods: {
        Logout() {
            this.$router.push("/");
        },
        novoAgendamento(){
          this.$router.push("/Novo_Agendamento");
        },
        dadosusuario(){
          this.$router.push("/DadosPerfil");
        }
    }
}

</script>