const express = require('express');
const app = express();
var mysql = require('mysql');

// Création d'une connection à la base de donnée
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Antoine27130',
  database : 'groupomania'
});

// Connexion
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connecté à Mysql');
});
 
//db.end();

app.use((req, res, next) => { // Ajoute CORS dans l'entête de toutes les requêtes
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //Verbe que l'on autorise
    next();
});

// Récupère tous les articles
app.get('/api/articles', (req, res) => {
    let sql = 'SELECT * FROM articles';
    let query = db.query(sql, (err, results) => {
        if(err) {
            throw err
        };
        res.status(200).json(results);
    });
 });

 // Récupère un article en fonction de son id
app.get('/api/articles/:id', (req, res) => {
    let sql = `SELECT * FROM articles WHERE idarticles = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) {
            throw err
        };
        res.status(200).json(results);
    });
 });

 // Enregistre un article
app.post('/api/articles', (req, res) => {
    let date = new Date();
    let post = {idUsers: 1, article: "premier article ajouté avec l'API", dateHeure: date.getFullYear() + '-' + date.getDay() + '-' + date.getMonth() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() };
    let sql = `INSERT INTO articles SET ?`;
    let query = db.query(sql, post, (err, results) => {
        if(err) {
            throw err
        };
        res.status(200).json(results);
    });
 });

 // Supprime un article
 app.delete('/api/articles/:id', (req, res) => {
    let sql = `DELETE FROM articles WHERE idarticles = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) {
            throw err
        };
        res.send('Article supprimer');
    });
 });



 module.exports = app;