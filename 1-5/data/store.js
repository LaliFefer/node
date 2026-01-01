
const books = [
	{ id: '1', title: 'The First Book', authorId: '1', year: 2001 },
	{ id: '2', title: 'Another Book', authorId: '2', year: 2005 }
];

const authors = [
	{ id: '1', name: 'Alice Shapiro', country: 'Israel' },
	{ id: '2', name: 'David Cohen', country: 'USA' }
];

function genId() {
	return String(Date.now() + Math.floor(Math.random() * 1000));
}

module.exports = { books, authors, genId };
