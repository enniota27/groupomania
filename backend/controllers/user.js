var app = require('../app.js');
const jwt = require('jsonwebtoken');

function decodedUserId (headersAuth) {
    const token = headersAuth.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    return decodedToken.userId;
}

// Connection d'un utilisateur existant
exports.login = (req, res, next) => {
    let sql = `SELECT idUsers FROM users WHERE mail = '${req.body.mail}' AND password = '${req.body.mdp}' `;
    let query = app.db.query(sql, (err, results) => {
        if(err) {
            throw err
        };
    res.status(200).json({
        userId: results[0].idUsers, // Renvoie son identifiant
        token: jwt.sign({ // Renvoie un Token
            userId: results[0].idUsers },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
            )
        });
    });
};    

// Inscription d'un nouveau utilisateur
exports.signup = (req, res, next) => {
    const userObject = req.body;
    let sql = `INSERT INTO users SET ?`;
    let query = app.db.query(sql, userObject, (err, results) => {
        if(err) {
            throw err
        };
        res.status(200).json(results);
    });
};

// Renvoie les données de l'utilisateur
exports.profil = (req, res, next) => {
    let sql = `SELECT LastName, FirstName, Mail FROM users WHERE idUsers = ${req.params.id}`;
    let query = app.db.query(sql, (err, results) => {
        if(err) {
            throw err
        };
        res.status(200).json({results: results, auth: decodedUserId(req.headers.authorization) == req.params.id });
    });
};

// Supprime le compte d'un utilisateur
exports.delete = (req, res, next) => {
    if (decodedUserId(req.headers.authorization) == req.params.id) {
        let sql = `DELETE FROM users WHERE idUsers = ${req.params.id}`;
        let query = app.db.query(sql, (err, results) => {
            if(err) {
                throw err
            };
            res.status(200).send('Compte supprimé');
        });
    }
};