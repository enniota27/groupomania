<!-- PAGE D'UN ARTICLE -->

<template v-if="supp">
    <div class="container background-gray">
        <Loading v-if="loading"></Loading>
        <span v-if="errored" class="alert alert-danger" role="alert">Désolé, nous rencontrons actuellement des problèmes, veuillez-réessayer plus tard, merci de votre compréhension.</span>
        <h1 class="text-center">{{ article.titre }}</h1>
        <h2 class="text-center font-weight-light h5">Ecrit par {{ article.FirstName }} {{ article.LastName }}, le {{ dateTransform(article.dateHeure) }} </h2>
        <div class="text-center">
            <img :src=article.imageUrl class="img-fluid" :alt=article.titre> 
        </div>
            <p class="corps">{{ article.corps }}</p>
        <div>
            <button v-if="this.auth" @click="deleteArticle" type="button" class="btn btn-danger btn-center btn-lg">Supprimer l'article</button>
        </div>
    <div>
        <Message></Message> <!-- COMPOSANT MESSAGE -->
    </div>
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
                dateHeure: '',
                LastName: '',
                FirstName: ''
            }],
            loading: true,
            errored: false,
            supp: false,
            auth: false
        }
    },
    methods: {
        // Supprime l'article
        deleteArticle: function() {
            axios
            .delete(this.url, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })
            .then(response => console.log('Article supprimé !'))
            .catch(error => {
                console.log(error);
                this.errored = true })
        },
        // Transforme la date
        dateTransform: function (dateHeureParam) {
            if (this.loading == false) {
                let date = dateHeureParam.split('T')[0].split('-');
                let heure = dateHeureParam.split('T')[1].split(':');
                return `${date[2]}/${date[1]}/${date[0]} à ${heure[0]}:${heure[1]}`
            }
        }
    },
    // Récupére les infos de l'article
    mounted: function() {
        axios
            .get(this.url, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })
            .then(response => (this.article = response.data.article[0], this.auth = response.data.auth))
            .catch(error => {
                console.log(error);
                this.errored = true })
            .finally(() => this.loading = false);
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
    margin-top: 20px;
    color: RGB(219, 0, 121);
}
h2 {
    margin-top: 50px;
}
.corps{
    margin-top: 50px;
    font-size: 20px;
    text-indent: 100px;
    text-align: justify;
}
.background-gray{
  background-color: #F5F5F5 ;
  padding: 40px 40px 60px 40px;
}
.btn-center {
    margin: auto;
    display: block;
    margin-top: 50px;
}
.container {
    margin-bottom: 50px;
}
</style>