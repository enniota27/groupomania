var app = require('../app.js');
const jwt = require('jsonwebtoken');
const { json } = require('express');
const { createPool } = require('mysql');

function decodedUserId (headersAuth) {
    const token = headersAuth.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    return decodedToken.userId;
}

// Récupère tous les messages en fonction de id d'un article
exports.getAllMessage = (req, res, next) => {
    var message = [];
    let auth = [];
    let sql = `SELECT idmessages FROM messages WHERE messages.idarticles = ${req.params.id} ORDER BY idMessages DESC`;
    let query = app.db.query(sql, (err, results1) => {
        if(err) {
            throw err
        };
        for (let i = 0; i < results1.length; i++) {
            //console.log(results[i].idmessages);
            let sql = `SELECT * FROM messages INNER JOIN users ON messages.idUser = users.idUsers WHERE messages.idmessages = ${results1[i].idmessages}`;
            let query = app.db.query(sql, (err, results) => {
                message.push(results[0]);
                //console.log(results[0]);
                auth.push(decodedUserId(req.headers.authorization) === results[0].idUsers);
                //console.log(auth);
                //console.log(results1.length);
                //console.log(i);
                if (i == results1.length-1) {
                    //console.log(message);
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