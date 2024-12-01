const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Servir les fichiers statiques dans un dossier public

// Endpoint pour lire les données JSON
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
  fs.writeFile('data.json', JSON.stringify(req.body, null, 2), 'utf8', err => {
    if (err) {
      res.status(500).send('Erreur lors de la sauvegarde des données');
    } else {
      res.send('Données sauvegardées avec succès');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
