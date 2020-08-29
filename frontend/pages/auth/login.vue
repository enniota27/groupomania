<template>
    <div class="container">
        <h1>Se connecter</h1>
        <br>
        <span v-if="errored" class="alert alert-danger" role="alert">Adresse e-mail ou mot de passe invalide</span>
        <form action="/articles">
            <div class="form-group">
                <label for="mail">Entrez votre adresse mail* :</label>
                <input v-model="mail" type="email" class="form-control" id="mail" placeholder="Votre email" maxlength="45" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
            </div>
            <div class="form-group">
                <label for="mdp">Entrez votre mot de passe* :</label>
                <input v-model="mdp" type="password" class="form-control" id="mdp" placeholder="Votre mot de passe" minlength="8" maxlength="25" required>
            </div>
            <br>
            <button @click="auth(event)" class="btn btn-primary mb-2">Se connecter</button>
        </form>
    </div>
</template>

<script>
const axios = require('axios');

export default {
    data: function () {
        return {
            mail: '',
            mdp: '',
            errored: false
        }
    },
    methods: {
        // Envoi du mail/mdp
        auth: function(event) {
            localStorage.clear();
            if (this.mail.length >= 3 && this.mdp.length >=8) {
                axios
                    .post('http://localhost:8080/api/auth/login', {
                        mail: this.mail,
                        mdp: this.mdp,
                    })
                    // Si le mail/mdp est bon, l'API nous renvoie un token que l'on stoke dans le localStorage
                    .then(response => (localStorage.setItem('token', response.data.token), localStorage.setItem('userId', response.data.userId)))
                    .catch(error => {
                        console.log(error);
                        this.errored = true;
                        event.preventDefault(); })
                    .finally(() => this.loading = false)
            }
        }
    }
}

</script>

<style scoped>
input:valid, textarea:valid {
  box-shadow: 0 0 2px 1px green;
}
</style>