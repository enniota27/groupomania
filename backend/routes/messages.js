const express = require('express');
const router = express.Router();

const articlesCtrl = require('../controllers/messages');
const auth = require('../middleware/auth');

router.get('/:id', auth, articlesCtrl.getAllMessage); // Affichage de toutes les articles
router.post('/', auth, articlesCtrl.createMessage); // Enregistre un message
router.delete('/:id', auth, articlesCtrl.deleteMessage); // Supprime un message

module.exports = router;