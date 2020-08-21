<template>
    <div class="container">
        <h1>Se connecter</h1>
        <br>
        <form>
            <div class="form-group">
                <label for="mail">Entrez votre adresse mail* :</label>
                <input v-model="mail" type="email" class="form-control" id="mail" placeholder="Votre email" maxlength="45" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
            </div>
            <div class="form-group">
                <label for="mdp">Entrez votre mot de passe* :</label>
                <input v-model="mdp" type="password" class="form-control" id="mdp" placeholder="Votre mot de passe" maxlength="25" required>
            </div>
            <br>
            <button @click="auth" class="btn btn-primary mb-2">Se connecter</button>
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
        }
    },
    methods: {
        auth: function() {
                axios
                    .post('http://localhost:8080/api/auth/login', {
                        mail: this.mail,
                        mdp: this.mdp,
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

<style>
input:valid, textarea:valid {
  box-shadow: 0 0 2px 1px green;
}
</style>