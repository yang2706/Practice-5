import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [selectedJournalistId, setSelectedJournalistId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/journalists')
      .then(res => setJournalists(res.data));

    axios.get('http://localhost:5000/articles')
      .then(res => setArticles(res.data));
  }, []);

  const applyFilters = async () => {
    if (!selectedJournalistId) {
      const res = await axios.get('http://localhost:5000/articles');
      setArticles(res.data);
      return;
    }

    const res = await axios.get(
      `http://localhost:5000/journalists/${selectedJournalistId}/articles`
    );
    setArticles(res.data);
  };

  const resetFilters = async () => {
    setSelectedJournalistId('');
    const res = await axios.get('http://localhost:5000/articles');
    setArticles(res.data);
  };

  return (
    <div>
      <h2>Filter by Journalist</h2>

      <select
        value={selectedJournalistId}
        onChange={(e) => setSelectedJournalistId(e.target.value)}
      >
        <option value="">All Journalists</option>
        {journalists.map(j => (
          <option key={j.id} value={j.id}>{j.name}</option>
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