const express = require('express');
const router = express.Router();

const articlesCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const { update } = require('../controllers/user');

router.get('/', auth, articlesCtrl.getAllArticles); // Affichage de toutes les articles
router.get('/:id', auth, articlesCtrl.getOneArticle); // Affichage un article
router.post('/', auth, multer, articlesCtrl.createArticle); // Enregistre un article
router.delete('/:id', auth, multer, articlesCtrl.deleteArticle); // Supprime un article
router.put('/:id', auth, multer, articlesCtrl.updateArticle); // Modifie un article

module.exports = router;
