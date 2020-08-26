<!-- PAGE D'UN ARTICLE -->

<template v-if="supp">
    <div class="container background-gray">
        <Loading v-if="loading"></Loading>
        <span v-if="errored" class="alert alert-danger" role="alert">Désolé, nous rencontrons actuellement des problèmes, veuillez-réessayer plus tard, merci de votre compréhension.</span>
        <h1 class="text-center">{{ article.titre }}</h1>
        <h2 class="text-center font-weight-light h5">Ecrit par {{ article.FirstName }} {{ article.LastName }}, le {{ dateTransform(article.dateHeure) }} </h2>
        <div class="text-center">
            <img :src=article.imageUrl class="img-fluid taille" :alt=article.titre> 
        </div>
            <p class="corps">{{ article.corps }}</p>
        <div class="btn-center">
            <button v-if="this.auth" @click="deleteArticle" type="button" class="btn btn-danger btn-lg">Supprimer l'article</button>
            <button v-if="this.auth" @click="updateArticle" type="button" class="btn btn-primary btn-lg">Modifier l'article</button>
        </div>
        <div class="modif" v-if="modif">
            <form action="/articles">
                 <div class="form-group">
                     <label for="titre" class="font-weight-bold">Modifiez le titre de votre article* :</label>
                     <input v-model="article.titre" type="text" class="form-control" id="titre" placeholder="Titre de l'article" minlength="20" maxlength="150" required>
                     <p class="font-italic">Nombre de caractères : {{ article.titre.length }}/150 - minimum 20</p>
                 </div>
                 <div class="form-group">
                    <label for="corpsArticle" class="font-weight-bold">Modifiez le corps de l'article* :</label>
                    <textarea v-model="article.corps" class="form-control" id="corpsArticle" rows="10" placeholder="Corps de l'article" minlength="100" maxlength="1000" required></textarea>
                     <p class="font-italic">Nombre de caractères : {{ article.corps.length }}/1000 - minimum 100</p>
                </div>
                <div class="form-group">
                    <label for="image" class="font-weight-bold">Changez l'image (facultatif) :</label>
                    <input v-on:change="handleFileUpload($event)" type="file" class="form-control-file" id="image" accept="image/*">
                </div>
                <p>* champs obligatoires</p>
                <hr>
                <button @click="sendUptade" type="submit" class="btn btn-primary mb-2">Envoyer les modifications</button>
             </form>
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
                FirstName: '',
            }],
            loading: true,
            errored: false,
            supp: false,
            auth: false, 
            modif: false,
            file: '',
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
        updateArticle: function() {
            this.modif = true;
        },
        handleFileUpload: function(event) {
            this.file = event.target.files[0];
            //console.log(this.file);
        },
        // Transforme la date
        dateTransform: function (dateHeureParam) {
            if (this.loading == false) {
                let date = dateHeureParam.split('T')[0].split('-');
                let heure = dateHeureParam.split('T')[1].split(':');
                return `${date[2]}/${date[1]}/${date[0]} à ${heure[0]}:${heure[1]}`
            }
        },
        sendUptade: function() {
            const formData = new FormData();
            formData.append('file', this.file);
            formData.append('titre', this.article.titre);
            formData.append('corps', this.article.corps);
            console.log(formData);
                axios
                    .put(this.url, formData,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        },
                    })
                    .then(response => console.log(response))
                    .catch(error => {
                        console.log(error);
                        this.errored = true })
                    .finally(() => this.loading = false)
        },
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
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
}
.container {
    margin-bottom: 50px;
}
.taille {
    max-height: 700px;
}
.modif {
    margin-top: 50px;
}
input:valid, textarea:valid {
  box-shadow: 0 0 2px 1px green;
}
</style>