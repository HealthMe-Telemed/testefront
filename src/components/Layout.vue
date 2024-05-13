<template>
    <header>
      <button class="home" v-on:click="home"><i class="fa fa-home"></i> Home</button>
      <h1>{{cabecalho}}</h1>
      <button class="sair" v-on:click="Logout">
        <i class="fa fa-sign-out"></i> Sair
      </button>
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
}

.home,
.sair {
  margin: 20px;
  padding: 10px;
}

h1 {
  margin: auto;
}
button {
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  background-color: black;
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
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

header {
    display: flex;
    border-bottom: white 2px solid;
    text-align: center;
}

</style>

<script>
export default{
    props:['cabecalho'],
    methods: {
        Logout() {
            this.$router.push("/");
        },
        home(){
          this.$router.push('/Agendamentos');
        }
    }
}
</script>