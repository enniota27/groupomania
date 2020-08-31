## Groupomania

Le projet a été généré avec : 
 - Nuxt.js pour le frontend
 - Node.js pour le backend
 - MySQL pour la gestion de la base de donnée

## Installation de la base de donnée

Importation de la base de donnée depuis le fichier bdd.slq qui se trouve à la racine du dossier.

## Fichier de configuation

A la racine du dossier backend, modifiez le nom du fichier de .env.example en .env puis renseigner les variables.

## Développement frontend

Exécuter `npm install`, puis `npm run dev` qui démarre un serveur développement. Rendez-vous sur `http://localhost:3000/`. L'application va se recharger automatiquement si vous modifiez un fichier source.

## Développement backend

Exécuter `npm install`, puis `npm start` qui démarre `nodemon server` pour surveiller les modifications de nos fichiers et qui redémerra le serveur dès sa sauvegarde. Exécution de l'API sur `http://localhost:8080/`.