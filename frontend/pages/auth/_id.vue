<!-- PAGE D'UN PROFIL UTILISATEUR -->

<template v-if="supp">
    <div class="container background-gray">
        <Loading v-if="loading"></Loading>
        <span v-if="errored" class="alert alert-danger" role="alert">Désolé, nous rencontrons actuellement des problèmes, veuillez-réessayer plus tard, merci de votre compréhension.</span>
        <div v-if="!loading">
            <h1 class="text-center">Page profil</h1>
            <h2>Informations</h2>
            <br>
            <p><span class="font-weight-bold">Nom:</span> {{ user.LastName }}</p>
            <p><span class="font-weight-bold">Prénom:</span> {{ user.FirstName }}</p>
            <p><span class="font-weight-bold">Adresse mail:</span> <a :href="`mailto:${user.Mail}`">{{ user.Mail }}</a></p>
            <br>
            <div v-if="this.auth && !this.form">
                <p>Modifier vos informations personnelles <button @click="updateUser" type="button" class="btn btn-secondary">Modifier le compte</button></p>
                <p>Attention, action irréversible, cela supprimera tous vos articles et tous vos messages <button @click="deleteUser" type="button" class="btn btn-danger">Supprimer le compte</button></p>
            </div>
        </div>
        <form v-if="this.form">
            <div class="row">
                <div class="col-md-6">
                    <label for="nom">Votre nom* :</label>
                    <input v-model="user.LastName" type="text" id="nom" class="form-control" placeholder="Nom de famille" maxlength="25" required>
                </div>
                <div class="col-md-6">
                    <label for="prenom">Votre prénom* :</label>
                    <input v-model="user.FirstName" type="text" id="prenom" class="form-control" placeholder="Prénom" maxlength="25" required>
                </div>
            </div>
            <div class="row">    
                <div class="col-md-6">
                    <label for="mail">Votre email* :</label>
                    <input v-model="user.Mail" type="email" id="mail" class="form-control" placeholder="Votre email" maxlength="45" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
                </div>
            </div>
            <div class="row">    
                <div class="col-md-6">
                    <label for="old-mdp">Votre mot de passe actuel* :</label>
                    <input v-model="user.oldPassword" type="password" id="old-mdp" class="form-control" placeholder="Votre mot de passe" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" minlength="8" maxlength="25" required>
                </div>
                <div class="col-md-6">
                    <label for="new-mdp">Votre nouveau mot de passe (falcultatif) :</label>
                    <input v-model="user.newPassword" type="password" id="new-mdp" class="form-control" placeholder="Votre nouveau mot de passe" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" minlength="8" maxlength="25">
                </div>
            </div>
            <small id="passwordHelpBlock" class="form-text text-muted">
                Le mot de passe doit avoir au minimun 8 caractères avec au moins une majuscule et un chiffre.
            </small>
            <br>
            <button @click="sendUpdate" class="btn btn-secondary mb-2 btn-center">Modifier</button>
        </form>
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
                oldPassword: '',
                newPassword: ''
            }],
            loading: true,
            errored: false,
            auth: false,
            form: false,
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
        },
        updateUser: function() {
            this.form = true;
        },
        // Modifie le compte
        sendUpdate: function() {
            if(this.user.LastName.length >= 1 && this.user.FirstName.length >= 1 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.Mail) && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(this.user.oldPassword)) {
                axios
                    .put(this.url, {
                        data: this.user
                    }, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                    }
                    })
                    .then(response => console.log(response))
                    .catch(error => {
                        console.log(error);
                        this.errored = true })
                    .finally(() => this.loading = false)
            }
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
.container {
    margin-bottom: 50px;
}
input:valid{
  box-shadow: 0 0 2px 1px green;
}
</style>