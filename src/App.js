// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleDetails from './components/ArticleDetails'; // Assurez-vous que le chemin vers ce fichier est correct
import Articles from './components/Article'; // Assurez-vous que le chemin vers ce fichier est correct
import AddArticle from './components/AddArticle';
import UpdateArticle from './components/UpdateArticle';


function App() {
  return (
    <Router>
      <Routes>
        {/* Route pour afficher tous les articles */}
        <Route path="/" element={<Articles />} />

        {/* Route pour afficher un article spécifique par son ID */}
        <Route path="/article/:idArticle" element={<ArticleDetails />} />
        <Route path="/add-article" element={<AddArticle />} /> {/* Route pour ajouter un article */}
        <Route path="/update-article/:idArticle" element={<UpdateArticle />} />
      </Routes>
    </Router>
  );
}

export default App;
