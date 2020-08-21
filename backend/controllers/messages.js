var app = require('../app.js');

// Récupère tous les messages en fonction de id d'un article
exports.getAllMessage = (req, res, next) => {
    let sql = `SELECT * FROM messages INNER JOIN users ON messages.idUser = users.idUsers WHERE messages.idarticles = ${req.params.id} ORDER BY idMessages DESC`;
    let query = app.db.query(sql, (err, results) => {
        if(err) {
            throw err
        };
        res.status(200).json(results);
    });
};

// Enregistre un message
exports.createMessage = (req, res, next) => {
    let date = new Date();
    const messageObject = req.body;
    let post = {
        ...messageObject,
        idUser: 1,
        dateHeure: `${date.getFullYear()}-${parseInt(date.getMonth())+1}-${date.getDate()} ${parseInt(date.getHours())+2}:${date.getMinutes()}:${date.getSeconds()}`
    };
    let sql = `INSERT INTO messages SET ?`;
    let query = app.db.query(sql, post, (err, results) => {
        if(err) {
            throw err
        };
        res.status(200).json(results);
    });
};

// Supprimer un message
exports.deleteMessage = (req, res, next) => {
    let sql = `DELETE FROM messages WHERE idmessages = ${req.params.id}`;
    let query = app.db.query(sql, (err, results) => {
        if(err) {
            throw err
        };
        res.send('Message supprimer');
    });
};