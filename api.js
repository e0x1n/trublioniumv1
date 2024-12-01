const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname)));

// Endpoint pour la racine "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint pour charger les données JSON
app.get('/data', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Erreur lors de la lecture des données');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Endpoint pour sauvegarder les données JSON
app.post('/data', (req, res) => {
  fs.writeFile('data.json', JSON.stringify(req.body, null, 2), 'utf8', (err) => {
    if (err) {
      res.status(500).send('Erreur lors de la sauvegarde des données');
    } else {
      res.send('Données sauvegardées avec succès');
    }
  });
});

// Endpoint pour lire l'objectif depuis obj.txt
app.get('/obj', (req, res) => {
    fs.readFile('obj.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Erreur lors de la lecture de obj.txt :', err);
        res.status(500).send('Erreur serveur');
      } else {
        res.send(data.trim()); // Renvoie le contenu brut de obj.txt
      }
    });
  });  

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
