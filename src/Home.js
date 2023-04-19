import React, { useEffect, useState } from 'react';
import './styles.css';

function Home() {

  const [items, setItems] = useState([]);
  // Hook useState pour stocker la liste des filtres d'image
  const [filters, setFilters] = useState(['none', 'grayscale', 'sepia', 'hue-rotate(45deg)']);
  // Hook useState pour stocker l'index du filtre courant
  const [currentFilterIndex, setCurrentFilterIndex] = useState(0);
  // Hook useState pour stocker la taille de l'image
  const [imageSize, setImageSize] = useState(30);

  return (
    <div>
      <h1>Page d'accueil</h1>
      <a href="http://localhost:3000/pro">Lien vers la table lycee pro</a><br></br>
      <a href="http://localhost:3000/gen">Lien vers la table lycee generale</a><br></br>
      <a href="http://localhost:3000/ecole">Lien vers la table ecole</a><br></br>
      <a href="http://localhost:3000/quoicoubeh">Lien vers les graph</a><br></br>
      <img
          className="Appp-logo"
          src={require('./enzo.jpg')}
          alt="Mon image"
          style={{ filter: filters[currentFilterIndex], width: imageSize + '%' }}
        />
    </div>
  );
}

export default Home;