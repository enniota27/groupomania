var app = require('../app.js');
const jwt = require('jsonwebtoken');

// Connection d'un utilisateur existant
exports.login = (req, res, next) => {
    let sql = `SELECT idUsers FROM users WHERE mail = '${req.body.mail}' AND password = '${req.body.mdp}' `;
    let query = app.db.query(sql, (err, results) => {
        if(err) {
            throw err
        };
    res.status(200).json({
        userId: results[0].idUsers, // Renvoie son identifiant
        token: jwt.sign( // Renvoie un Token
            { userId: results[0].idUsers },
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