// Article.js
import React, { useEffect, useState } from 'react';

function Article() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupère les articles au chargement du composant
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/article/get');
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des articles");
        }
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Liste des articles</h1>
      {loading ? (
        <p>Chargement des articles...</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <h2>{article.name}</h2>
              <p><strong>Catégorie :</strong> {article.category}</p>
              <p><strong>Marque :</strong> {article.brand}</p>
              <p><strong>Prix :</strong> {article.price} €</p>
              <p><strong>Description :</strong> {article.content}</p>
              <p><strong>Stock :</strong> {article.stock}</p>
              <p><strong>En ligne :</strong> {article.online ? 'Oui' : 'Non'}</p>
              <div>
                <strong>Images :</strong>
                <ul>
                  <li><img src={article.picture[0]?.img} alt="Image principale" width="100" /></li>
                  {article.picture[0]?.img1 && <li><img src={article.picture[0]?.img1} alt="Image secondaire 1" width="100" /></li>}
                  {article.picture[0]?.img2 && <li><img src={article.picture[0]?.img2} alt="Image secondaire 2" width="100" /></li>}
                  {article.picture[0]?.img3 && <li><img src={article.picture[0]?.img3} alt="Image secondaire 3" width="100" /></li>}
                  {article.picture[0]?.img4 && <li><img src={article.picture[0]?.img4} alt="Image secondaire 4" width="100" /></li>}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Article;

