const express = require('express');
const mysql = require('mysql');

const app = express();
const cors = require('cors');
app.use(cors());

// Créer une connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: '172.18.0.2',
  user: 'root',
  password: 'enzocaca',
  database: 'fontaine'
});

// Connexion à la base de données MySQL
connection.connect();

// Définir une route pour récupérer les données de la base de données
app.get('/bdd', (req, res) => {
    const query = `
      SELECT * FROM ecole
      UNION
      SELECT * FROM lyceegt
      UNION
      SELECT * FROM lyceepro
    `;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des données');
      } else {
        res.status(200).json(results);
      }
    });
  });

// Démarrer le serveur sur le port 2000
app.listen(1500, () => {
  console.log('Serveur démarré sur le port 1500');
});