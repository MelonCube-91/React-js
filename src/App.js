// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleDetails from './components/ArticleDetails'; 
import Articles from './components/Article'; 
import AddArticle from './components/AddArticle';
import UpdateArticle from './components/UpdateArticle';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/article/:idArticle" element={<ArticleDetails />} />
        <Route path="/add-article" element={<AddArticle />} /> 
        <Route path="/update-article/:idArticle" element={<UpdateArticle />} />
      </Routes>
    </Router>
  );
}

export default App;
