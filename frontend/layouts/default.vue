<template>
  <div id="app">
    <!-- MENU BOOTSTRAP -->
    <div class="bg-dark">
      <div class="container">
        <div class="row">
          <nav class="col navbar navbar-expand-lg navbar-dark">
            <nuxt-link class="navbar-brand" to="/">Groupomania</nuxt-link> <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler" data-target="#navbarContent" data-toggle="collapse" type="button"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarContent">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <nuxt-link class="nav-link" active-class="active" to="/">Accueil</nuxt-link>
                </li>
                <li v-if="logon" class="nav-item">
                  <nuxt-link class="nav-link" active-class="active" to="/articles">Actualiés</nuxt-link>
                </li>
                <li v-if="logon" class="nav-item" @click="deco">
                  <nuxt-link class="nav-link" active-class="active" to="/">Déconnexion</nuxt-link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
    <nuxt />
    <!-- FOOTER -->
    <footer>
      <div class="p-3 mb-2 bg-dark text-white text-center">© {{ new Date().getFullYear() }} Copyright - Groupomania</div>
    </footer>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      logon: false, // Si l'utilisateur est connecté : true
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
  // Vide le localStorage à la déconnexion
  methods: {
    deco: function() {
      if (this.logon === true) {
        localStorage.clear();
        this.logon = false;
      }
    }
  }
}
</script>

<style scoped>
footer {
  position: fixed;
  bottom: -8px;
  width: 100%;
}
</style>
