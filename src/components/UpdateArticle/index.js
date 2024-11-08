// UpdateArticle.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UpdateArticle() {
  const { idArticle } = useParams(); // Récupère l'ID de l'article depuis l'URL
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    content: '',
    stock: '',
    online: false,
    picture: [{ img: '', img1: '', img2: '', img3: '', img4: '' }]
  });
  const [message, setMessage] = useState('');

  // Récupère les informations actuelles de l'article
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/article/get/${idArticle}`);
        if (!response.ok) {
          throw new Error('Erreur lors du chargement de l\'article');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticle();
  }, [idArticle]);

  // Gère les changements de champ de formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Gère les changements pour les images dans le tableau picture
  const handlePictureChange = (e, imgField) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      picture: [{ ...prevData.picture[0], [imgField]: value }]
    }));
  };

  // Soumet le formulaire pour mettre à jour l'article
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/article/update/${idArticle}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'article');
      }

      setMessage('Article mis à jour avec succès !');
    } catch (error) {
      console.error(error);
      setMessage('Erreur lors de la mise à jour de l\'article.');
    }
  };

  return (
    <div>
      <h1>Mettre à jour l'article</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nom de l'article"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Catégorie"
          required
        />
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Marque"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Prix"
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          required
        />
        <label>
          En ligne :
          <input
            type="checkbox"
            name="online"
            checked={formData.online}
            onChange={handleChange}
          />
        </label>

        <h3>Images</h3>
        <input
          type="text"
          placeholder="Image principale"
          value={formData.picture[0].img}
          onChange={(e) => handlePictureChange(e, 'img')}
          required
        />
        <input
          type="text"
          placeholder="Image secondaire 1"
          value={formData.picture[0].img1}
          onChange={(e) => handlePictureChange(e, 'img1')}
        />
        <input
          type="text"
          placeholder="Image secondaire 2"
          value={formData.picture[0].img2}
          onChange={(e) => handlePictureChange(e, 'img2')}
        />
        <input
          type="text"
          placeholder="Image secondaire 3"
          value={formData.picture[0].img3}
          onChange={(e) => handlePictureChange(e, 'img3')}
        />
        <input
          type="text"
          placeholder="Image secondaire 4"
          value={formData.picture[0].img4}
          onChange={(e) => handlePictureChange(e, 'img4')}
        />

        <button type="submit">Mettre à jour l'article</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateArticle;
