<template>
    <div class="container">
        <h1>S'inscrire</h1>
        <br>
        <form action="/auth/login">
            <div class="row">
                <div class="col-md-6">
                    <label for="nom">Votre nom* :</label>
                    <input v-model="lastName" type="text" id="nom" class="form-control" placeholder="Nom de famille" maxlength="25" required>
                </div>
                <div class="col-md-6">
                    <label for="prenom">Votre prénom* :</label>
                    <input v-model="firstName" type="text" id="prenom" class="form-control" placeholder="Prénom" maxlength="25" required>
                </div>
            </div>
            <div class="row">    
                <div class="col-md-6">
                    <label for="mail">Votre email* :</label>
                    <input v-model="mail" type="email" id="mail" class="form-control" placeholder="Votre email" maxlength="45" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
                </div>
                <div class="col-md-6">
                    <label for="mdp">Votre mot de passe* :</label>
                    <input v-model="password" type="password" id="mdp" class="form-control" placeholder="Votre mot de passe" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" minlength="8" maxlength="25" required>
                    <small id="passwordHelpBlock" class="form-text text-muted">
                        Le mot de passe doit avoir au minimun 8 caractères avec au moins une majuscule et un chiffre.
                    </small>
                </div>
            </div>
            <button @click="signup" class="btn btn-primary mb-2 btn-center">S'inscrire</button>
        </form>
    </div>
</template>

<script>
const axios = require('axios');

export default {
    data: function () {
        return {
            lastName: '',
            firstName: '',
            mail: '',
            password: ''
        }
    },
    methods: {
        // Envoi des données pour l'inscription
        signup: function() {
            axios
                .post('http://localhost:8080/api/auth/signup', {
                    lastName: this.lastName,
                    firstName: this.firstName,
                    mail: this.mail,
                    password: this.password
                })
                .then(response => console.log(response))
                .catch(error => {
                    console.log(error);
                    this.errored = true })
                .finally(() => this.loading = false)
        }
    }
}
</script>

<style scoped>
input:valid {
  box-shadow: 0 0 2px 1px green;
}
form .row {
    margin: 10px 0 10px 0;
}
.btn-center {
    margin-left: 15px;
}
</style>