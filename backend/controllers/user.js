var app = require('../app.js');
const bcrypt = require('bcrypt'); // Hachage
const jwt = require('jsonwebtoken');
const utils = require('../utils/decoded-token');
require('dotenv').config();

// Connection d'un utilisateur existant
exports.login = (req, res, next) => {
    let sql = `SELECT idUsers, password FROM users WHERE mail = ? `;
    let query = app.db.query(sql, req.body.mail,(err, results) => {
        if(err || results =='') {
            res.status(400).send('Utilisateur non trouvé');
        } else {
            bcrypt.compare(req.body.mdp, results[0].password) // Compare le hache du mdp de la base de donnée avec l'entrée de l'utilisateur
            .then(valid => {
              if (!valid) {
                res.status(401).json({ error: 'Mot de passe incorrect !' });
              } else {
                    res.status(200).json({
                        userId: results[0].idUsers, // Renvoie son identifiant
                        token: jwt.sign({ // Renvoie un Token
                            userId: results[0].idUsers },
                            process.env.TOKEN,
                            { expiresIn: '12h' })
                    });
                };
            });
        };
    });
};    

// Inscription d'un nouveau utilisateur
exports.signup = (req, res, next) => {
    // Vérification des input des formulaires
    if (req.body.lastName.length >= 1 && req.body.lastName.length <= 25 && req.body.firstName.length >=1 && req.body.firstName.length <= 25 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.mail) && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(req.body.password) && !/[\|\/\\\{\[\]\}=\^\`\<\>\!]/g.test(req.body.lastName) && !/[\|\/\\\{\[\]\}=\^\`\<\>\!]/g.test(req.body.firstName)) {
        bcrypt.hash(req.body.password, 10) // Hacher/crypter le mdp en 10 tours
        .then(hash => {
            const user = { // Création d'un nouveau utilisateur
            lastName: req.body.lastName.toUpperCase(),
            firstName: req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.substring(1).toLowerCase(),
            mail: req.body.mail,
            password: hash
            };
            let sql = `INSERT INTO users SET ?`;
            let query = app.db.query(sql, user, (err, results) => {
                if(err) {
                    res.status(400).send(err);
                } else {
                    res.status(200).json(results);
                };
            });
        })
        .catch(error => res.status(500).json({ error }));
    } else {
        res.status(400).json("Veuillez respecter les formats d'entrée")
    };
};

// Renvoie les données de l'utilisateur
exports.profil = (req, res, next) => {
    let id = utils.decodedUserId(req.headers.authorization);
    let sql = `SELECT LastName, FirstName, Mail FROM users WHERE idUsers = ?`;
    let query = app.db.query(sql, req.params.id, (err, results) => {
        if(err) {
            res.status(400).send(err);
        } else {
            res.status(200).json({results: results, auth: id == req.params.id || id == 30 });
        };
    });
};

// Supprime le compte d'un utilisateur
exports.delete = (req, res, next) => {
    let id = utils.decodedUserId(req.headers.authorization);
    // Vérification si l'utilisateur a les droits de supp le compte
    if (id == req.params.id || id == 30) {
        let sql = `DELETE FROM users WHERE idUsers = ?`;
        let query = app.db.query(sql, req.params.id, (err, results) => {
            if(err) {
                res.status(400).send(err);
            } else {
                res.status(200).send('Compte supprimé');
            };
        });
    } else {
        res.status(401).send('Suppression non autorisée');
    };
};

//Modifie le compte d'un utilisateur
exports.update = (req, res, next) => {
    // Vérification des input des formulaires
    if (req.body.data.LastName.length >= 1 && req.body.data.LastName.length <= 25 && req.body.data.FirstName.length >=1 && req.body.data.FirstName.length <= 25 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.data.Mail) && !/[\|\/\\\{\[\]\}=\^\`\<\>\!]/g.test(req.body.data.LastName) && !/[\|\/\\\{\[\]\}=\^\`\<\>\!]/g.test(req.body.data.FirstName)) {
        let id = utils.decodedUserId(req.headers.authorization);
        // Vérification si l'utilisateur a les droits de modfi le compte
        if (id == req.params.id || id == 30) {
            if (req.body.data.newPassword === undefined) { // Si pas de nouveau de mdp
                let sql = `UPDATE users SET LastName = ?, FirstName = ?, Mail = ? WHERE idUsers = ?`;
                    let query = app.db.query(sql, [req.body.data.LastName.toUpperCase(), req.body.data.FirstName.charAt(0).toUpperCase() + req.body.data.FirstName.substring(1).toLowerCase(), req.body.data.Mail, req.params.id], (err, results) => {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.status(200).send('Compte modifié');
                        };
                    });
            } else {
                if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(req.body.data.newPassword)) {
                    bcrypt.hash(req.body.data.newPassword, 10) // Hacher/crypter le mdp en 10 tours
                    .then(hash => {
                        let mdp = hash;
                        let sql = `UPDATE users SET LastName = ?, FirstName = ?, Mail = ?, Password = ? WHERE idUsers = ?`;
                        let query = app.db.query(sql, [req.body.data.LastName, req.body.data.FirstName, req.body.data.Mail, mdp, req.params.id], (err, results) => {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.status(200).send('Compte modifié');
                            };
                        });
                    })
                    .catch(error => res.status(500).json({ error }));
                } else {
                    res.status(400).json("Veuillez respecter les formats d'entrée")
                };
            };
        } else {
            res.status(401).send('Suppression non autorisée');
        };
    } else {
        res.status(400).json("Veuillez respecter les formats d'entrée")
    };
};