<template>
  <div id="app">
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
                <li class="nav-item">
                  <nuxt-link class="nav-link" active-class="active" to="/forum">Forum</nuxt-link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      </div>
      <nuxt />
  </div>
</template>

<style>
</style>
