<template>
    <div class="container">
        <div>
        <h1>Les derniers articles publiée</h1>
        <Loading v-if="loading"></Loading>
        <span v-if="errored" class="alert alert-danger" role="alert">Désolé, nous rencontrons actuellement des problèmes, veuillez-réessayer plus tard, merci de votre compréhension.</span>
        </div>
        <div class="row">
                <div v-for="article in articles" v-bind:key="article.idarticles" class="card shadow anim-opacity-scale">
                    <img :alt="article.titre" class="card-img-top" :src="article.imageUrl">
                    <div class="card-body">
                        <h2 class="card-title h4">{{ article.titre }}</h2>
                        <p class="card-text">{{ article.corps }}</p>
                        <p class="card-text font-weight-bold"></p>
                        <nuxt-link class="stretched-link" :to="`/articles/${article.idarticles}`"></nuxt-link>
                        <div class="card-footer text-muted text-center">Antoine NAGY</div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue'

const axios = require('axios');
 export default {
            data: function () {
                return {
                    url: 'http://localhost:8080/api/articles',
                    articles: [],
                    loading: true,
                    errored: false
                }
            },
            created: function() {
                axios
                    .get(this.url)
                    .then(response => (this.articles = response.data))
                    .catch(error => {
                        console.log(error);
                        this.errored = true })
                    .finally(() => this.loading = false)
                }
        }
</script>

<style scoped>
h1 {
    margin: 50px;
    color: RGB(219, 0, 121);
}
.card {
    margin-top: 30px;
    margin-right: 30px;
    max-width: 350px;
}
p {
    display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden; 
}
.anim-opacity-scale:hover {
	opacity: 0.75;
	transform: scale(1.1);
	transition: transform 250ms ease-in-out, opacity 200ms ease-in-out;
}

</style>