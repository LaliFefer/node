const express = require('express');
const app = express();

app.use(express.json());


let books = [
	{ id: '1', title: 'The First Book', authorId: '1', year: 2001 },
	{ id: '2', title: 'Another Book', authorId: '2', year: 2005 }
];

let authors = [
	{ id: '1', name: 'Alice Shapiro', country: 'Israel' },
	{ id: '2', name: 'David Cohen', country: 'USA' }
];

function genId() {
	return String(Date.now() + Math.floor(Math.random() * 1000));
}

app.get('/books', (req, res) => {
	res.json(books);
});

app.get('/books/:id', (req, res) => {
	const book = books.find(b => b.id === req.params.id);
	if (!book) return res.status(404).json({ error: 'Book not found' });
	res.json(book);
});

app.post('/books', (req, res) => {
	const { title, authorId, year } = req.body;
	if (!title || !authorId) return res.status(400).json({ error: 'Missing title or authorId' });
	const id = genId();
	const book = { id, title, authorId, year };
	books.push(book);
	res.status(201).json(book);
});

app.put('/books/:id', (req, res) => {
	const idx = books.findIndex(b => b.id === req.params.id);
	if (idx === -1) return res.status(404).json({ error: 'Book not found' });
	// Update fields from body, but keep the same id
	const updated = { ...books[idx], ...req.body, id: books[idx].id };
	books[idx] = updated;
	res.json(updated);
});

app.delete('/books/:id', (req, res) => {
	const idx = books.findIndex(b => b.id === req.params.id);
	if (idx === -1) return res.status(404).json({ error: 'Book not found' });
	const removed = books.splice(idx, 1)[0];
	res.json(removed);
});

app.get('/authors', (req, res) => {
	res.json(authors);
});

app.get('/authors/:id', (req, res) => {
	const author = authors.find(a => a.id === req.params.id);
	if (!author) return res.status(404).json({ error: 'Author not found' });
	res.json(author);
});

app.post('/authors', (req, res) => {
	const { name, country } = req.body;
	if (!name) return res.status(400).json({ error: 'Missing name' });
	const id = genId();
	const author = { id, name, country };
	authors.push(author);
	res.status(201).json(author);
});

app.put('/authors/:id', (req, res) => {
	const idx = authors.findIndex(a => a.id === req.params.id);
	if (idx === -1) return res.status(404).json({ error: 'Author not found' });
	const updated = { ...authors[idx], ...req.body, id: authors[idx].id };
	authors[idx] = updated;
	res.json(updated);
});

app.delete('/authors/:id', (req, res) => {
	const idx = authors.findIndex(a => a.id === req.params.id);
	if (idx === -1) return res.status(404).json({ error: 'Author not found' });
	const removed = authors.splice(idx, 1)[0];
	res.json(removed);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

