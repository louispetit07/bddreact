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
app.get('/gen', (req, res) => {
     connection.query('SELECT * FROM lyceegt', (error, results) => {
         if (error) {
           res.status(500).send('Erreur lors de la récupération des données de la base de données');
         } else {
           res.json(results);
         }
       });
   // res.send("gros fdp");
});

// Démarrer le serveur sur le port 5000
app.listen(5000, () => {
  console.log('Serveur démarré sur le port 5000');
});


  
