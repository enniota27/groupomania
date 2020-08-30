const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/login', userCtrl.login); // Connecter un utilisateur déjà existant
router.post('/signup', userCtrl.signup); // Enregiste un nouveau utilisateur
router.get('/profil/:id', auth, userCtrl.profil); // Renvoi les données liées au compte
router.delete('/profil/:id', auth, userCtrl.delete); // Supprime le compte de l'utilisateur
router.put('/profil/:id', auth, userCtrl.update); // Modifie le compte

module.exports = router;