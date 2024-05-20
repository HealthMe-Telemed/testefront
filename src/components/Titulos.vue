<template>
    <header>
      <div class="titulo">{{cabecalho}}</div>
    </header>
</template>
<style>
@import url("https://fonts.googleapis.com/cssz?family=El+Messiri:wght@700&display=swap");
* {
  margin: 0;
  padding: 0;
  font-family: "El Messiri", sans-serif;
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
  text-align: center;
  font-size: 40px;
  align-items: center;
}

.titulo {
  margin: 20px auto;
  display: flex;
  font-size: 40px;
  align-items: center;

}
</style>

<script>
export default{
    props:['cabecalho'],
}
</script>