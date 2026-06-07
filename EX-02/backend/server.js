const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let journalists = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" }
];

let categories = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Sports" }
];

let articles = [
  { id: 1, title: "AI is growing fast", journalistId: 1, categoryId: 1 },
  { id: 2, title: "Football World Cup", journalistId: 2, categoryId: 2 },
  { id: 3, title: "New Tech Trends", journalistId: 1, categoryId: 1 }
];

app.get('/journalists', (req, res) => {
  res.json(journalists);
});

app.get('/categories', (req, res) => {
  res.json(categories);
});

app.get('/articles', (req, res) => {
  const { journalistId, categoryId } = req.query;

  let result = articles;

  if (journalistId) {
    result = result.filter(a => a.journalistId == journalistId);
  }

  if (categoryId) {
    result = result.filter(a => a.categoryId == categoryId);
  }

  res.json(result);
});

app.get('/journalists/:id/articles', (req, res) => {
  const id = req.params.id;

  const result = articles.filter(a => a.journalistId == id);
  res.json(result);
});

app.get('/categories/:id/articles', (req, res) => {
  const id = req.params.id;

  const result = articles.filter(a => a.categoryId == id);
  res.json(result);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});