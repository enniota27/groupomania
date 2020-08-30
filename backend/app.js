const express = require('express');
const app = express();
var mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const articlesRoutes = require('./routes/articles');
const messagesRoutes = require('./routes/messages');
const userRoutes = require('./routes/user');

// Création d'une connection à la base de donnée
const db = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.SQL_USER,
  password : process.env.SQL_PASSWORD,
  database : 'groupomania'
});

// Connexion
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connecté à Mysql');
});
 
// Ajoute CORS dans l'entête de toutes les requêtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //Verbe que l'on autorise
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

// racine des routes
app.use('/api/articles', articlesRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/auth', userRoutes);

exports.db = db;
module.exports = app;