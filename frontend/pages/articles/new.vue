<template>
    <div class="container">
             <h1>Ajouter un nouvel article</h1>
             <form action="/articles">
                 <div class="form-group">
                     <label for="titre">Entrez le titre de votre article* :</label>
                     <input v-model="titre" type="text" class="form-control" id="titre" placeholder="Titre de l'article" minlength="10" maxlength="150" required>
                 </div>
                 <div class="form-group">
                    <label for="corpsArticle">Entrez le corps de l'article* :</label>
                    <textarea v-model="corps" class="form-control" id="corpsArticle" rows="10" placeholder="Corps de l'article" minlength="100" maxlength="1000" required></textarea>
                </div>
                <div class="form-group">
                    <label for="image">Photo d'illustraction* :</label>
                    <input type="file" class="form-control-file" id="image" accept="image/png, image/jpeg" required>
                </div>
                <p>* champs obligatoires</p>
                <hr>
                <button @click="donnees" type="submit" class="btn btn-primary mb-2">Envoyer l'article</button>
             </form>
         </div>
</template>

<script>
const axios = require('axios');

export default {
    data: function () {
        return {
            titre: '',
            corps: '',
            imageUrl: ''
        }
    },
    methods: {
        donnees: function() {
                axios
                    .post('http://localhost:8080/api/articles')
                    .then(response => console.log(response))
                    .catch(error => {
                        console.log(error);
                        this.errored = true })
                    .finally(() => this.loading = false)
                }
    }
    /*created: function() {
                axios
                    .post('http://localhost:8080/api/articles')
                    .then(response => console.log(response))
                    .catch(error => {
                        console.log(error);
                        this.errored = true })
                    .finally(() => this.loading = false)
                }*/
  
}

</script>

<style scoped>
h1 {
    margin-bottom: 50px;
}
input:valid, textarea:valid {
  box-shadow: 0 0 2px 1px green;
}
</style>