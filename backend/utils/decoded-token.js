// Permet de decoder le token renvoyer par le frontend pour connaitre User Id de l'utilisateur

const jwt = require('jsonwebtoken');

function decodedUserId (headersAuth) {
    const token = headersAuth.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    return decodedToken.userId;
}

exports.decodedUserId = decodedUserId;