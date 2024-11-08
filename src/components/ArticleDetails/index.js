import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ArticleDetails() {
  const { idArticle } = useParams(); 
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/article/get/${idArticle}`);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement de l'article");
        }
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error(error);
        setMessage('Erreur lors du chargement de l\'article.');
      }
    };

    fetchArticle();
  }, [idArticle]);

  const deleteArticle = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/article/delete/${idArticle}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'article');
      }

      setMessage('Article supprimé avec succès !');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage('Erreur lors de la suppression de l\'article.');
    }
  };

  return (
    <div>
      <h1>Détails de l'article</h1>
      {message && <p>{message}</p>}
      {article ? (
        <div>
          <h2>{article.name}</h2>
          <p>Catégorie : {article.category}</p>
          <p>Marque : {article.brand}</p>
          <p>Prix : {article.price} €</p>
          <p>Description : {article.content}</p>
          <p>Stock : {article.stock}</p>
          <p>En ligne : {article.online ? 'Oui' : 'Non'}</p>
          <button onClick={deleteArticle}>Supprimer l'article</button>
        </div>
      ) : (
        <p>Chargement des détails de l'article...</p>
      )}
    </div>
  );
}

export default ArticleDetails;
