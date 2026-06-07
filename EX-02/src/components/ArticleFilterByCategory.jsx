import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(res => setCategories(res.data));

    axios.get('http://localhost:5000/articles')
      .then(res => setArticles(res.data));
  }, []);

  const applyFilters = async () => {
    if (!selectedCategoryId) {
      const res = await axios.get('http://localhost:5000/articles');
      setArticles(res.data);
      return;
    }

    const res = await axios.get(
      `http://localhost:5000/categories/${selectedCategoryId}/articles`
    );
    setArticles(res.data);
  };

  const resetFilters = async () => {
    setSelectedCategoryId('');
    const res = await axios.get('http://localhost:5000/articles');
    setArticles(res.data);
  };

  return (
    <div>
      <h2>Filter by Category</h2>

      <select
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <button onClick={applyFilters}>Apply</button>
      <button onClick={resetFilters}>Reset</button>

      <ul>
        {articles.map(a => (
          <li key={a.id}>{a.title}</li>
        ))}
      </ul>
    </div>
  );
}