<template>
    <div class="container">
        <div>
        <h1>Forum</h1>
        <h2>Les derniers articles publiée</h2>
        <Loading v-if="loading"></Loading>
        <span v-if="errored" class="alert alert-danger" role="alert">Désolé, nous rencontrons actuellement des problèmes, veuillez-réessayer plus tard, merci de votre compréhension.</span>
        </div>
        <div class="row">
                <div v-for="article in articles" v-bind:key="article.idarticles" class="card shadow anim-opacity-scale">
                    <img :alt="article.titre" class="card-img-top" :src="article.imageUrl">
                    <div class="card-body">
                        <h3 class="card-title">{{ article.titre }}</h3>
                        <p class="card-text">{{ article.corps }}</p>
                        <p class="card-text font-weight-bold"></p>
                        <nuxt-link class="stretched-link" :to="`/articles/${article.idarticles}`"></nuxt-link>
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
.card {
    margin-top: 30px;
    margin-right: 30px;
    max-width: 350px;
}
p, h3 {
    max-height: 100px; /* à modifier selon vos besoins */
    overflow: hidden;
    text-overflow: ellipsis; 
}
.anim-opacity-scale:hover {
	opacity: 0.75;
	transform: scale(1.1);
	transition: transform 250ms ease-in-out, opacity 200ms ease-in-out;
}
</style>