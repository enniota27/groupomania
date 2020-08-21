var app = require('../app.js');

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
        res.status(200).json(results);
    });
};

// Enregistre un article
exports.createArticle = (req, res, next) => {
    let date = new Date();
    const articleObject = req.body;
    let post = {
        ...articleObject,
        //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, // http://localhost8080/images/nomdufichier
        idUsers: 1,
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
    let sql = `DELETE FROM articles WHERE idarticles = ${req.params.id}`;
    let query = app.db.query(sql, (err, results) => {
        if(err) {
            throw err
        };
        res.send('Article supprimer');
    });
};