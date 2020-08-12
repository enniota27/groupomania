<template>
    <div class="container">
        <h1>Forum</h1>
        <h2>Les derniers articles publiée</h2>
        <p>{{ articles }}</p>
        <ul v-for="article in articles" v-bind:key="article.idarticles">
            <li>{{ article.article }}</li>
        </ul>
    </div>
</template>

<script>
const axios = require('axios');
 export default {
            data: function () {
                return {
                    url: 'http://localhost:8080/api/articles',
                    articles: []
                }
            },
            created: function() {
                axios
                    .get(this.url)
                    .then(response => (this.articles = response.data))
                }
        }
    </script>

<style>
</style>