var db = require('../app.js');

exports.getAllArticles = (req, res, next) => {
    let sql = 'SELECT * FROM articles';
    let query = db.query(sql, (err, results) => {
        if(err) {
            throw err
        };
        res.status(200).json(results);
    });
 };