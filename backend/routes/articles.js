const express = require('express');
const router = express.Router();

const articlesCtrl = require('../controllers/articles');

router.get('/api/articles', articlesCtrl.getAllArticles); // Affichage de toutes les sauces

module.exports = router;