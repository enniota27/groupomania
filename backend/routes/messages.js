const express = require('express');
const router = express.Router();

const articlesCtrl = require('../controllers/messages');
const auth = require('../middleware/auth');

router.get('/:id', articlesCtrl.getAllMessage); // Affichage de toutes les articles
router.post('/', articlesCtrl.createMessage); // Enregistre un message
router.delete('/:id', articlesCtrl.deleteMessage); // Supprime un message

module.exports = router;