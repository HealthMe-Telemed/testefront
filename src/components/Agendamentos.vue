<script setup>
import Layout from './Layout.vue'
</script>

<template>
  
    <div class="body">
        <Layout></Layout>
        <main>
            <div class="container">
                <div class="esquerda">
                    <h2>Consulta 1</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        A et at neque sequi tempora labore ratione.
                        Placeat iusto illo, pariatur fugit dolorum voluptatem aliquam sint voluptatum sequi,
                        consequatur architecto repellendus labore autem beatae, laudantium similique quis temporibus.</p>
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
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        A et at neque sequi tempora labore ratione.
                        Placeat iusto illo, pariatur fugit dolorum voluptatem aliquam sint voluptatum sequi,
                        consequatur architecto repellendus labore autem beatae, laudantium similique quis temporibus.</p>
                </div>
                <div class="direita">
                    <button class="botao-consulta">Entrar na Consulta</button>
                    <button class="botao-secundario editar">Editar</button>
                    <button class="botao-secundario cancelar">Cancelar</button>
                </div>
            </div>
        </main>
        <footer>
            <button class="sair">Sair</button>
        </footer>
    </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/cssz?family=El+Messiri:wght@700&display=swap");

* {
    margin: 0;
    padding: 0;
    font-family: "El Messiri", sans-serif;
    color: white;
}

.body {
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

.sair,
.home {
    font-size: 20px;
    outline: none;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    color: #fff;
}

.sair {
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