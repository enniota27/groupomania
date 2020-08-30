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
    let sql = 'SELECT idarticles, articles.idUsers, titre, corps, imageUrl, dateHeure, LastName, FirstName FROM articles INNER JOIN users ON articles.idUsers = users.idUsers ORDER BY idArticles DESC';
    let query = app.db.query(sql, (err, results) => {
        if(err) {
            res.status(400).json({err});
        };
        res.status(200).json(results);
    });
};

// Récupère un article en fonction de son id
exports.getOneArticle = (req, res, next) => {
    let id = decodedUserId(req.headers.authorization);
    let sql = `SELECT idarticles, articles.idUsers, titre, corps, imageUrl, dateHeure, LastName, FirstName FROM articles INNER JOIN users ON articles.idUsers = users.idUsers WHERE idarticles = ?`;
    let query = app.db.query(sql, req.params.id,(err, results) => {
        if(err) {
            res.status(400).json({err});
        };
        res.status(200).json({article: results, auth: id == results[0].idUsers || id == 30 });
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
            res.status(400).json({err});
        };
        res.status(200).json(results);
    });
};

// Supprime un article
exports.deleteArticle = (req, res, next) => {
    let id = decodedUserId(req.headers.authorization);
    let sql1 = `SELECT idUsers, imageUrl FROM articles WHERE idarticles = ?`;
    let query = app.db.query(sql1, req.params.id, (err1, results1) => {
        if(err1) {
            res.status(400).send(err1);
        } else {
            if (id == results1[0].idUsers || id == 30) {
                let sql = `DELETE FROM articles WHERE idarticles = ?`;
                let query = app.db.query(sql, req.params.id, (err, results) => {
                    if(err) {
                        res.status(400).send(err);
                    } else {
                        const filename = results1[0].imageUrl.split('/images/')[1]; // Nom de l'image
                        fs.unlink(`images/${filename}`, () => {});
                        res.status(200).send('Article supprimer');
                    }
                });
            } else {
                res.status(401).send('Suppression non autorisée');
            }
        };
    });
};

// Modifie un article
exports.updateArticle = (req, res, next) => {
    let id = decodedUserId(req.headers.authorization);
    let sql = `SELECT idUsers, imageUrl FROM articles WHERE idarticles = ?`;
    let query = app.db.query(sql, req.params.id, (err, results1) => {
        if(err) {
            res.status(400).send(err);
        } else {
            if (id == results1[0].idUsers || id == 30) {
                if (req.file) {
                    const filename = results1[0].imageUrl.split('/images/')[1]; // Nom de l'ancienne image
                    fs.unlink(`images/${filename}`,() => {}) // Supprime l'ancienne image
                    var newImageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; // http://localhost8080/images/nomdufichier
                } else {
                    var newImageUrl = results1[0].imageUrl;
                }
                let sql = `UPDATE articles SET titre = ?, corps = ?, imageUrl = ? WHERE idarticles = ?`;
                let query = app.db.query(sql, [req.body.titre, req.body.corps, newImageUrl, req.params.id], (err, results) => {
                    if(err) {
                        res.status(400).send(err);
                    };
                    res.status(200).send('Article modifié');
                });
            } else {
                res.status(401).send('Suppression non autorisée');
            }
        }
    })
}
