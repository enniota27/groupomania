<!-- PAGE D'UN PROFIL UTILISATEUR -->

<template v-if="supp">
    <div class="container background-gray">
        <Loading v-if="loading"></Loading>
        <span v-if="errored" class="alert alert-danger" role="alert">Désolé, nous rencontrons actuellement des problèmes, veuillez-réessayer plus tard, merci de votre compréhension.</span>
        <div v-if="!loading">
            <h1 class="text-center">Page profil</h1>
            <h2>Informations</h2>
            <br>
            <p>Nom: {{ user.LastName }}</p>
            <p>Prénom: {{ user.FirstName }}</p>
            <p>Adresse mail: <a :href="`mailto:${user.Mail}`">{{ user.Mail }}</a></p>
            <div>
                <button v-if="this.auth" @click="deleteUser" type="button" class="btn btn-danger btn-center">Supprimer le compte</button>
            </div>
        </div>
    <div>
    </div>
    </div>
</template>

<script>
const axios = require('axios');
 export default {
    data: function () {
        return {
            url: `http://localhost:8080/api/auth/profil/${this.$route.params.id}`,
            user: [{
                LastName: '',
                FirstName: '',
                Mail: '',
            }],
            loading: true,
            errored: false,
            auth: false
        }
    },
    methods: {
        // Supprime le compte
        deleteUser: function() {
            axios
            .delete(this.url, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })
            .then(response => console.log('Compte supprimé !'), localStorage.clear(), document.location.href="/")
            .catch(error => {
                console.log(error);
                this.errored = true })
        }
    },
    // Récupére les infos de l'user
    mounted: function() {
        axios
            .get(this.url, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })
            .then(response => (this.user = response.data.results[0], this.auth = response.data.auth))
            .catch(error => {
                console.log(error);
                this.errored = true })
            .finally(() => this.loading = false);
    }
}
</script>

<style scoped>
h1 {
    margin-top: 20px;
    color: RGB(219, 0, 121);
}
h2 {
    margin-top: 50px;
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