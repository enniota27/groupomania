const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);
router.get('/profil/:id', auth, userCtrl.profil);
router.delete('/profil/:id', auth, userCtrl.delete);
router.put('/profil/:id', auth, userCtrl.update);

module.exports = router;