<script setup>
import Titulos from './Titulos.vue';
</script>

<template>
    <section>
      
      <Titulos :cabecalho="'Confirmar Nova Senha'"></Titulos>

      <main>
        <div class="container">
          <div class="box">
            <div class="square" style="--i: 0"></div>
          <div class="square" style="--i: 1">
            <img src="../assets/img/HealthMe.png"
                  style="
                    width: 150px;
                    height: 150px;
                    margin-left: 0px;
                    margin-top: 10px;"/>
            </div>
          <div class="square" style="--i: 2"></div>
          <div class="square" style="--i: 3"></div>
          <div class="square" style="--i: 4"></div>
          <div class="square" style="--i: 5">
            <img src="../assets/img/HealthMe.png"
                  style="
                    width: 150px;
                    height: 150px;
                    margin-left: 0px;
                    margin-top: 10px;"/>
          </div>

              <div class="form">  
                <form @submit.prevent="confirmar">
                                                
                <i class="fas fa-user-circle"></i>
                
                <span> Digite seu CPF (apenas números) </span>
                <i class="fas fa-user-circle"></i>
                          
                <div class="inputBx">
                  <br>
                    <input 
                    id="cpf_senha" 
                    v-model="cpf_senha" 
                    required
                    @input="formatarCPF"
                    placeholder="Digite apenas números"
                    maxlength="11"
                    minlength="11"/>                 
                </div>
   
                <span> Digite a Nova Senha: </span>                     
            <i class="fas fa-user-circle"></i>            
               <div class="inputBx">
                <br>
                <input 
                type="password"
                id="Digitar_NovaSenha" 
                v-model="NovaSenha" 
                required placeholder="Digite a sua senha"
                  />                                           
              </div>

              <span> Repita a Nova Senha: </span>                     
            <i class="fas fa-user-circle"></i>            
               <div class="inputBx">
                <br>
                <input 
                type="password"
                id="Confirmar_NovaSenha" 
                v-model="NovaSenhaConfirmar" 
                required placeholder="Confirme a sua senha"
                  />                                           
              </div>
              
                 <div class="inputBx Redefinir">                    
                    <button class="btnRedefinir">Redefinir</button>
  
                  </div>
                </form>
              </div>
          </div>
        </div>
      </main>
    </section>
  </template>
  
  <script>

  import MenuPrincipal from './MenuPrincipal.vue';

  export default {
    data() {
      return {
         cpf_senha: "",
         token: "",
         NovaSenha: "",
         NovaSenhaConfirmar: ""
      };
    },

    created(){
      this.token = this.$route.query.token
      console.log(this.token)
      this.verificarToken();
    },
    methods:{
      voltar(){
        this.$router.push('/');
      },
      formatarCPF() {
      // Remova quaisquer caracteres não numéricos do valor do campo
      this.cpf_senha = this.cpf_senha.replace(/\D/g, '');
      },
      validarCPF(cpf){
      return cpf.length == 11 ? true: false; 
      },
      async verificarToken(){
          await axios.get("https://localhost:7146/Usuario/RecoveryPassword", { params: {token: `${this.token}`}}).then(response => {
          // Verificar se a resposta da API indica sucesso (por exemplo, status 200)
          if (response.status === 200) {
            console.log("O token fornecido é valido")
          } 
        })
        .catch(error => {
          alert(error.response.data);
          this.$router.push('/');
        });
      },
      async confirmar(){
        const mensagem = ""
        const cpfValido = this.validarCPF(this.cpf_senha);
        const body = {
          cpf: this.cpf_senha,
          token: this.token,
          senha: CryptoJS.MD5(this.NovaSenha).toString(),
          confirmarSenha: CryptoJS.MD5(this.NovaSenhaConfirmar).toString()
        }

        if(cpfValido){
          await axios.post('https://localhost:7146/Usuario/RecoveryPassword', body)
        .then(response => {
          // Verificar se a resposta da API indica sucesso (por exemplo, status 200)
          if (response.status === 200) {
            window.alert("A senha foi alterada com sucesso!! Voce será redirecionado para a tela de login da aplicação")
            this.$router.push('/');
          } 
        })
        .catch(error => {
          if(error.status === 401){
            alert("CPF e token inválidos!!");
            this.$router.push('/');
          }
          if(error.status === 400){
            alert("Não foi possível alterar senha!!")
            this.cpf_senha = ""
            this.NovaSenha = ""
            this.NovaSenhaConfirmar = ""
          }
        });
      
      }
    }
    },

  }
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
    background: linear-gradient(-45deg,  #80caea);
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
    border: 1px solid rgba(10, 177, 155, 0.15);
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
  top: -35px;
  right: -450px;
  z-index: 2;
}

/* 2º lado direito   */
.box .square:nth-child(6) {
  width: 150px;
  height: 150px;
  top: 170px;
  right: -350px;
  z-index: 2;
  
}

/* 3º lado direito   */
.box .square:nth-child(3) {
  width: 150px;
  height: 150px;
  right: -450px;
  top: 350px;

}

/* 1º lado esquerdo   */
.box .square:nth-child(5) {
  width: 150px;
  height: 150px;
  top: -35px;
  left: -450px;
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
  
  left: -450px;
  top: 350px
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
  }
  
  .form .inputBx {
    position: relative;
    width: 100%;
    margin-bottom: 20px;
  }
    
  /* retangulos- campo digitavel  */
  .form .inputBx input {
    width: 85%;
    outline: none;
    border:none;
    border: 2px solid rgba(255, 255, 255, 255);
    background:rgb(157, 194, 205);
    padding: 12px 10px;
    padding-left: 40px;
    border-radius: 15px;
    color: hwb(225 0% 93%);
    font-size: 20px;
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


  /* Botãoo reenviar   */
  .form .inputBx .btnRedefinir {
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
  }

/* Cor fonte - Inserir os dadas  */
  .form span {
    color: rgb(253, 253, 253);
    font-size: 16px;
  }

  .titulo {
  display: flex;
  font-size: 40px;
  transform: translateX(580px) translateY(5px);
}

  </style>