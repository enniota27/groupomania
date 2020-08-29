<template>
    <div class="container">
             <h1>Ajouter un nouvel article</h1>
             <form action="/articles">
                 <div class="form-group">
                     <label for="titre" class="font-weight-bold">Entrez le titre de votre article* :</label>
                     <input v-model="titre" type="text" class="form-control" id="titre" placeholder="Titre de l'article" minlength="20" maxlength="150" required>
                     <p class="font-italic">Nombre de caractères : {{ titre.length }}/150 - minimum 20</p>
                 </div>
                 <div class="form-group">
                    <label for="corpsArticle" class="font-weight-bold">Entrez le corps de l'article* :</label>
                    <textarea v-model="corps" class="form-control" id="corpsArticle" rows="10" placeholder="Corps de l'article" minlength="100" maxlength="1000" required></textarea>
                     <p class="font-italic">Nombre de caractères : {{ corps.length }}/1000 - minimum 100</p>
                </div>
                <div class="form-group">
                    <label for="image" class="font-weight-bold">Ajouter une image* :</label>
                    <input v-on:change="handleFileUpload($event)" type="file" class="form-control-file" id="image" accept="image/*" required>
                </div>
                <p>* champs obligatoires</p>
                <hr>
                <button @click="sendArticle" type="submit" class="btn btn-secondary mb-2">Envoyer l'article</button>
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
            file: ''
        }
    },
    methods: {
        // Envoi l'article
        sendArticle: function() {
            if (this.titre.length >= 20 && this.titre.length <= 150 && this.corps.length >= 100 && this.corps.length <= 1000 && this.file != '') {
                const formData = new FormData();
                formData.append('file', this.file);
                formData.append('titre', this.titre);
                formData.append('corps', this.corps);
                    axios
                        .post('http://localhost:8080/api/articles', formData,
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
            }
        },
        handleFileUpload: function(event) {
            this.file = event.target.files[0];
            //console.log(this.file);
        },
    }
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