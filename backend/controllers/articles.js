var app = require('../app.js');
const fs = require('fs'); // Avoir accès à des opérations liés aux systèmes de fichiers
const utils = require('../utils/decoded-token'); // Avoir accès à la fonction decodedIdUser

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
    let id = utils.decodedUserId(req.headers.authorization);
    let sql = `SELECT idarticles, articles.idUsers, titre, corps, imageUrl, dateHeure, LastName, FirstName FROM articles INNER JOIN users ON articles.idUsers = users.idUsers WHERE idarticles = ?`;
    let query = app.db.query(sql, req.params.id,(err, results) => {
        if(err) {
            res.status(400).json({err});
        };
        res.status(200).json({article: results, auth: id == results[0].idUsers || id == 30 }); // Renvoie l'article avec auth: true si l'utilisateur est l'auteur sinon false
    });
};

// Enregistre un article
exports.createArticle = (req, res, next) => {
    // Vérification des input des formulaires
    if (!/[\|\/\\\{\[\]\}=\^\`\<\>]/g.test(req.body.titre) && !/[\|\/\\\{\[\]\}=\^\`\<\>]/g.test(req.body.corps) && req.body.titre.length >= 20 && req.body.corps.length >= 100) {
        let date = new Date();
        const articleObject = req.body;
        let post = {
            ...articleObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, // http://localhost8080/images/nomdufichier
            idUsers: utils.decodedUserId(req.headers.authorization),
            dateHeure: `${date.getFullYear()}-${parseInt(date.getMonth())+1}-${date.getDate()} ${parseInt(date.getHours())+2}:${date.getMinutes()}:${date.getSeconds()}`
        };
        let sql = `INSERT INTO articles SET ?`;
        let query = app.db.query(sql, post, (err, results) => {
            if(err) {
                res.status(400).json({err});
            };
            res.status(200).json(results);
        });
    } else {
        res.status(400).json({message: "Veuillez respecter les formats d'entrée"})
    };
};

// Supprime un article
exports.deleteArticle = (req, res, next) => {
    let id = utils.decodedUserId(req.headers.authorization);
    let sql1 = `SELECT idUsers, imageUrl FROM articles WHERE idarticles = ?`;
    let query = app.db.query(sql1, req.params.id, (err1, results1) => {
        if(err1) {
            res.status(400).send(err1);
        } else {
            // Vérification si l'utilisateur a les droits de supp l'article
            if (id == results1[0].idUsers || id == 30) {
                let sql = `DELETE FROM articles WHERE idarticles = ?`;
                let query = app.db.query(sql, req.params.id, (err, results) => {
                    if(err) {
                        res.status(400).send(err);
                    } else {
                        const filename = results1[0].imageUrl.split('/images/')[1]; // Nom de l'image
                        fs.unlink(`images/${filename}`, () => {}); // Supprime l'image
                        res.status(200).send('Article supprimer');
                    };
                });
            } else {
                res.status(401).send({message: 'Suppression non autorisée'});
            };
        };
    });
};

// Modifie un article
exports.updateArticle = (req, res, next) => {
    // Vérification des input des formulaires
    if (!/[\|\/\\\{\[\]\}=\^\`\<\>]/g.test(req.body.titre) && !/[\|\/\\\{\[\]\}=\^\`\<\>]/g.test(req.body.corps) && req.body.titre.length >= 20 && req.body.corps.length >= 100) {
        let id = utils.decodedUserId(req.headers.authorization);
        let sql = `SELECT idUsers, imageUrl FROM articles WHERE idarticles = ?`;
        let query = app.db.query(sql, req.params.id, (err, results1) => {
            if(err) {
                res.status(400).send(err);
            } else {
                // Vérification si l'utilisateur a les droits de modif l'article
                if (id == results1[0].idUsers || id == 30) {
                    if (req.file) { // Si il y a une nouvelle image
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
                };
            };
        })
    } else {
        res.status(400).json("Veuillez respecter les formats d'entrée")
    };
};