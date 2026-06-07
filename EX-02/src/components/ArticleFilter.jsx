import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedJournalistId, setSelectedJournalistId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/journalists')
      .then(res => setJournalists(res.data));

    axios.get('http://localhost:5000/categories')
      .then(res => setCategories(res.data));

    axios.get('http://localhost:5000/articles')
      .then(res => setArticles(res.data));
  }, []);

  const applyFilters = async () => {
    let url = 'http://localhost:5000/articles';

    if (selectedJournalistId && selectedCategoryId) {
      url += `?journalistId=${selectedJournalistId}&categoryId=${selectedCategoryId}`;
    } else if (selectedJournalistId) {
      url = `http://localhost:5000/journalists/${selectedJournalistId}/articles`;
    } else if (selectedCategoryId) {
      url = `http://localhost:5000/categories/${selectedCategoryId}/articles`;
    }

    const res = await axios.get(url);
    setArticles(res.data);
  };

  const resetFilters = async () => {
    setSelectedJournalistId('');
    setSelectedCategoryId('');

    const res = await axios.get('http://localhost:5000/articles');
    setArticles(res.data);
  };

  return (
    <div>
      <h2>Filter Articles</h2>

      <select
        value={selectedJournalistId}
        onChange={(e) => setSelectedJournalistId(e.target.value)}
      >
        <option value="">All Journalists</option>
        {journalists.map(j => (
          <option key={j.id} value={j.id}>{j.name}</option>
        ))}
      </select>

      <select
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <button onClick={applyFilters}>Apply Filters</button>
      <button onClick={resetFilters}>Reset</button>

      <ul>
        {articles.map(a => (
          <li key={a.id}>
            {a.title} (J:{a.journalistId}, C:{a.categoryId})
          </li>
        ))}
      </ul>
    </div>
  );
}