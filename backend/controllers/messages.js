var app = require('../app.js');
const jwt = require('jsonwebtoken');

function decodedUserId (headersAuth) {
    const token = headersAuth.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    return decodedToken.userId;
}

// Récupère tous les messages en fonction de id d'un article
exports.getAllMessage = (req, res, next) => {
    let id = decodedUserId(req.headers.authorization);
    var message = [];
    let auth = [];
    let sql = `SELECT idmessages FROM messages WHERE messages.idarticles = ? ORDER BY idMessages DESC`;
    let query = app.db.query(sql, req.params.id, (err, results1) => {
        if(err) {
            res.status(400).json({err});
        };
        for (let i = 0; i < results1.length; i++) {
            let sql = `SELECT idmessages, message, idarticles, idUser, LastName, FirstName, dateHeure FROM messages INNER JOIN users ON messages.idUser = users.idUsers WHERE messages.idmessages = ?`;
            let query = app.db.query(sql, results1[i].idmessages, (err, results) => {
                message.push(results[0]);
                auth.push(id == results[0].idUser || id == 30);
                if (i == results1.length-1) {
                    res.status(200).json({message: message, auth: auth});
                }
            });
        };
        
    });
};

// Enregistre un message
exports.createMessage = (req, res, next) => {
    let date = new Date();
    const messageObject = req.body;
    let post = {
        ...messageObject,
        idUser: decodedUserId(req.headers.authorization),
        dateHeure: `${date.getFullYear()}-${parseInt(date.getMonth())+1}-${date.getDate()} ${parseInt(date.getHours())+2}:${date.getMinutes()}:${date.getSeconds()}`
    };
    let sql = `INSERT INTO messages SET ?`;
    let query = app.db.query(sql, post, (err, results) => {
        if(err) {
            res.status(400).json({err});
        } else{
            res.status(200).json(results);
        }
    });
};

// Supprimer un message
exports.deleteMessage = (req, res, next) => {
    let id = decodedUserId(req.headers.authorization);
    let sql1 = `SELECT idUser FROM messages WHERE idmessages = ?`;
    let query = app.db.query(sql1, req.params.id, (err1, results1) => {
        if(err1) {
            res.status(400).send(err1);
        } else {
            if (id == results1[0].idUser || id == 30) {
                let sql = `DELETE FROM messages WHERE idmessages = ?`;
                let query = app.db.query(sql, req.params.id, (err, results) => {
                    if(err) {
                        res.status(400).send(err);
                    } else {
                        res.status(200).send('Message supprimer');
                    }
                });
            } else {
                res.status(401).send('Suppression non autorisée');
            }
        };
    });
};