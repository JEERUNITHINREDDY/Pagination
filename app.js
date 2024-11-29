const express = require('express');
const app = express();
const port = 3001;

const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

app.set('view engine', 'ejs');
app.use(express.static('public')); 
app.get('/table', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 10;

  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const paginatedData = data.slice(start, end);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  res.render('table', {
    data: paginatedData,
    currentPage: page,
    totalPages: totalPages
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/table`);
});
