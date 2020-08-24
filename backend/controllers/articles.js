var app = require('../app.js');
const jwt = require('jsonwebtoken');
const fs = require('fs'); // Avoir accès à des opérations liés aux systèmes de fichiers

function decodedUserId (headersAuth) {
    const token = headersAuth.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    return decodedToken.userId;
}

// Récupère tous les articles
exports.getAllArticles = (req, res, next) => {
    let sql = 'SELECT * FROM articles INNER JOIN users ON articles.idUsers = users.idUsers ORDER BY idArticles DESC';
    let query = app.db.query(sql, (err, results) => {
        if(err) {
            throw err
        };
        res.status(200).json(results);
    });
};

// Récupère un article en fonction de son id
exports.getOneArticle = (req, res, next) => {
    let sql = `SELECT * FROM articles INNER JOIN users ON articles.idUsers = users.idUsers WHERE idarticles = ${req.params.id}`;
    let query = app.db.query(sql, (err, results) => {
        if(err) {
            throw err
        };
        res.status(200).json({article: results, auth: decodedUserId(req.headers.authorization) === results[0].idUsers });
    });
};

// Enregistre un article
exports.createArticle = (req, res, next) => {
    let date = new Date();
    const articleObject = req.body;
    let post = {
        ...articleObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, // http://localhost8080/images/nomdufichier
        idUsers: decodedUserId(req.headers.authorization),
        dateHeure: `${date.getFullYear()}-${parseInt(date.getMonth())+1}-${date.getDate()} ${parseInt(date.getHours())+2}:${date.getMinutes()}:${date.getSeconds()}`
    };
    let sql = `INSERT INTO articles SET ?`;
    let query = app.db.query(sql, post, (err, results) => {
        if(err) {
            throw err
        };
        res.status(200).json(results);
    });
};

// Supprime un article
exports.deleteArticle = (req, res, next) => {
    let sql = `SELECT idUsers, imageUrl FROM articles WHERE idarticles = ${req.params.id}`;
    let query = app.db.query(sql, (err, results1) => {
        if(err) {
            throw err
        } else {
            if (decodedUserId(req.headers.authorization) === results1[0].idUsers) {
                let sql = `DELETE FROM articles WHERE idarticles = ${req.params.id}`;
                let query = app.db.query(sql, (err, results) => {
                    if(err) {
                        throw err
                    };
                    const filename = results1[0].imageUrl.split('/images/')[1]; // Nom de l'image
                    fs.unlink(`images/${filename}`, () => { 
                        res.status(200).send('Article supprimer');
                    });
                });
            };
        };
        res.status(401).send('Suppression non autorisée');
    });
};