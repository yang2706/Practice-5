import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const res = await axios.get('http://localhost:5000/articles');
      setArticles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteArticle = async (id) => {
    // Delete an article by ID
    try {
      await axios.delete(`http://localhost:5000/articles/${id}`);
      fetchArticles();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>📄 View Articles</Link>
        <Link to="/add"> ➕ Add Article</Link>
      </nav>

      <h2>Articles</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />

            <button onClick={() => deleteArticle(article.id)}>Delete</button>

            <button onClick={() => {
              navigate(`/articles/update/${article.id}`);
              // Navigate to update article form with article ID /articles/update/${article.id}
            }}>Update</button>

            <button onClick={() => {
              navigate(`/articles/${article.id}`);
              // Navigate to view article details with article ID /articles/${article.id}
            }}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}