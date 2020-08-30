var app = require('../app.js');
const jwt = require('jsonwebtoken'); // Token
const bcrypt = require('bcrypt'); // Hachage

function decodedUserId (headersAuth) {
    const token = headersAuth.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    return decodedToken.userId;
}

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
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' })
                    });
                };
            });
        };
    });
};    

// Inscription d'un nouveau utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // Hacher/crypter le mdp en 10 tours
      .then(hash => {
        const user = { // Création d'un nouveau utilisateur
          ...req.body,
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
};

// Renvoie les données de l'utilisateur
exports.profil = (req, res, next) => {
    let id = decodedUserId(req.headers.authorization);
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
    let id = decodedUserId(req.headers.authorization);
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
    }
};

//Modifie le compte d'un utilisateur
exports.update = (req, res, next) => {
    let id = decodedUserId(req.headers.authorization);
    if (id == req.params.id || id == 30) {
        if (req.body.data.newPassword === undefined) {
            let sql = `UPDATE users SET LastName = ?, FirstName = ?, Mail = ? WHERE idUsers = ?`;
                let query = app.db.query(sql, [req.body.data.LastName, req.body.data.FirstName, req.body.data.Mail, req.params.id], (err, results) => {
                    if(err) {
                        res.status(400).send(err);
                    } else {
                        res.status(200).send('Compte modifié');
                    };
                });
        } else {
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
        };
    } else {
        res.status(401).send('Suppression non autorisée');
    };
};