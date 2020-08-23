const express = require('express');
const router = express.Router();

const articlesCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, articlesCtrl.getAllArticles); // Affichage de toutes les articles
router.get('/:id', auth, articlesCtrl.getOneArticle); // Affichage un article
router.post('/', auth, multer, articlesCtrl.createArticle); // Enregistre un article
router.delete('/:id', auth, articlesCtrl.deleteArticle); // Supprime un article

module.exports = router;
