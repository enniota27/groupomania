<!-- PAGE D'ACCUEIL -->

<template>
  <div class="container">
    <div>
      <h1>Bienvenue sur le réseau social de Groupomania</h1>
      <img class="logo img-fluid" src="../assets/icon-above-font.png" alt="logo-de-groupomania">
    </div>
    <!-- si l'utilisateur est connecté alors on cache les boutons "se connecter" et "s'inscrire" -->
    <div v-if="!logon" class="box">
      <button type="button" class="btn btn-center"><nuxt-link class="btn btn-primary btn-center btn-lg" to="auth/login">Se connecter</nuxt-link></button>
      <button type="button" class="btn btn-center"><nuxt-link class="btn btn-primary btn-center btn-lg" to="auth/signup">S'inscrire</nuxt-link></button>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      logon: false
    }
  },
  // Vérifie si l'utilisateur est connecté
  mounted: function() {
    if (localStorage.getItem("token")) {
      this.logon = true;
    }
    else {
      this.logon = false;
    }
  },
}
</script>

<style>
h1 {
  margin-top: 50px;
  text-align: center;
}
.logo {
  margin:auto;
  width:500px;
  display:block
}
.box {
  display: flex;
  justify-content: space-around;
}
</style>
