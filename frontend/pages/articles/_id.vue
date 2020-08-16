<template>
    <div class="container background-gray">
        <Loading v-if="loading"></Loading>
        <span v-if="errored" class="alert alert-danger" role="alert">Désolé, nous rencontrons actuellement des problèmes, veuillez-réessayer plus tard, merci de votre compréhension.</span>
        <h1 class="text-center">{{ article.titre }}</h1>
        <h2 class="text-center font-weight-light h5">Ecrit par Antoine NAGY, le </h2>
        <div class="text-center">
            <img :src=article.imageUrl> 
        </div>
            <p class="corps">{{ article.corps }}</p>

    </div>
</template>

<script>
const axios = require('axios');
 export default {
    data: function () {
        return {
            url: `http://localhost:8080/api/articles/${this.$route.params.id}`,
            article: [{
                idarticles: '',
                idUsers: '',
                titre: '',
                corps: '',
                imageUrl: '',
                dateHeure: ''
            }],
            loading: true,
            errored: false
        }
    },
    /*methods: {
        ddmmyy: function () {
            let date = this.article.dateHeure.split('T')[0].split('-');
            let heure = this.article.dateHeure.split('T')[1].split(':');
            return `${date[2]}/${date[1]}/${date[0]} à ${heure[0]}:${heure[1]}`
        }
    },*/
    mounted: function() {
        axios
            .get(this.url)
            .then(response => (this.article = response.data[0]))
            .catch(error => {
                console.log(error);
                this.errored = true })
            .finally(() => this.loading = false)
        }
}
    </script>

<style scoped>
.center-vert-horizo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%, -50%);
}
h1 {
    margin: 50px;
    color: RGB(219, 0, 121);
}
img {
    max-width: 500px;
    height: auto;
}
.corps{
    margin-top: 50px;
    font-size: 20px;
    text-indent: 100px;
    text-align: justify;
}
.background-gray{
  background-color: #F5F5F5 ;
  padding: 20px;
}
</style>