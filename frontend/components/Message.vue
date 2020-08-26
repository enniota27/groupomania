<template>
    <div>
        <div>
            <h3>Liste des messages</h3>
            <div v-for="(message, index) in messages" v-bind:key="message.idmessages" class="rounded" >
                <div class="message">
                    <div class="nom">
                        <a :href="`../auth/${message.idUser}`">{{ message.FirstName }}  {{ message.LastName }}</a><br><br>Le {{ dateTransform(message.dateHeure) }}<br><br><button v-if="auth[index]" class="btn btn-danger btn-sm" @click="deleteMessage(message.idmessages)">Supprimer</button>
                    </div>
                    <div class="corpsMessage">
                        {{ message.message }}
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h3>Ajouter un message</h3>
            <form>
                <div class="form-group">
                        <label for="corpsMessage">Entrez votre message :</label>
                        <textarea v-model="corpsMessage" class="form-control" id="corpsMessage" rows="4" placeholder="Message" minlength="1" maxlength="255" required></textarea>
                        <p class="font-italic">Nombre de caractères : {{ corpsMessage.length }}/255</p>
                </div>
                <button @click="donnees" type="submit" class="btn btn-primary mb-2">Envoyer</button>
            </form>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

export default {
    data: function () {
        return {
            messages: [],
            corpsMessage: '',
            idarticles: this.$route.params.id,
            loading: true,
            errored: false,
            auth: null // change en fonction de l'userId des messages
        }
    },
    // Récupère les messages de l'article
    mounted: function() {
        axios
            .get(`http://localhost:8080/api/messages/${this.$route.params.id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => (this.messages = response.data.message, this.auth = response.data.auth, console.log(response)))
            .catch(error => {
                console.log(error);
                this.errored = true })
            .finally(() => this.loading = false)
    },
    methods: {
        // Enregistre un message
        donnees: function() {
            axios
                .post('http://localhost:8080/api/messages', {
                    message: this.corpsMessage,
                    idarticles: this.idarticles
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
        },
        // Supprimer un message
        deleteMessage: function(id) {
            axios
                .delete(`http://localhost:8080/api/messages/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
                .then(response => {
                    console.log('Message supprimé');
                    document.location.reload(true) })
                .catch(error => {
                    console.log(error);
                    this.errored = true })
        },
        // Transforme la date ex: '01/01/2010 à 12h15'
        dateTransform: function (dateHeureParam) {
            if (this.loading == false) {
                let date = dateHeureParam.split('T')[0].split('-');
                let heure = dateHeureParam.split('T')[1].split(':');
                return `${date[2]}/${date[1]}/${date[0]} à ${heure[0]}:${heure[1]}`
            }
        }
    }
}
</script>

<style scoped>
h3 {
    margin: 30px 0 30px 0;
}
.message {
    display: flex;
    border: 1px solid #ccc;
    min-height: 200px;
}
.nom {
    width: 30%;
    text-align: center;
    padding: 15px;
    margin: auto;
}
.corpsMessage {
    width: 70%;
    background-color: #FFF;
    padding: 15px;
}
textarea:valid {
  box-shadow: 0 0 2px 1px green;
}
</style>