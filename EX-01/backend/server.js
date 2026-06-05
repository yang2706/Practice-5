import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let articles = [
  {
    id: 1,
    title: "First News",
    content: "first article",
    journalistId: 1,
    categoryId: 1,
  },
];

app.get('/articles', (req, res) => {
  res.json(articles);
});

app.get('/articles/:id', (req, res) => {
  const article = articles.find(a => a.id == req.params.id);
  res.json(article);
});

app.post('/articles', (req, res) => {
  const newArticle = {
    id: articles.length + 1,
    ...req.body,
  };

  articles.push(newArticle);
  res.json(newArticle);
});

app.put('/articles/:id', (req, res) => {
  const index = articles.findIndex(a => a.id == req.params.id);

  if (index !== -1) {
    articles[index] = { id: Number(req.params.id), ...req.body };
    res.json(articles[index]);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

app.delete('/articles/:id', (req, res) => {
  articles = articles.filter(a => a.id != req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});