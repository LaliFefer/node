const { books, genId } = require('../data/store');

// Controller מינימלי ל־books: ולידציה בסיסית, 400/404, שימוש ב־next ל־500
const validate = (b, partial = false) => {
    if (!b || typeof b !== 'object') return 'Invalid body';
    if (!partial && (!b.title || !b.authorId)) return 'Missing title or authorId';
    const allowed = ['title', 'authorId', 'year'];
    if (Object.keys(b).some(k => !allowed.includes(k))) return 'Unexpected field';
    if ('year' in b && typeof b.year !== 'number') return 'year must be number';
    return null;
};

exports.getAll = (req, res, next) => {
    try { res.json(books) } catch (e) { next(e) }
};
exports.getById = (req, res, next) => {
    try {
        const r = books.find(x => x.id === req.params.id);
        if (!r) return res.status(404).json({ error: 'Book not found' });
        res.json(r)
    } catch (e) { next(e) }
};
exports.create = (req, res, next) => {
    try {
        const err = validate(req.body, false);
        if (err) return res.status(400).json({ error: err });
        const id = genId(); const it = { id, title: req.body.title, authorId: req.body.authorId, year: req.body.year };
        books.push(it); res.status(201).json(it)
    } catch (e) { next(e) }
};
exports.update = (req, res, next) => {
    try {
        const i = books.findIndex(x => x.id === req.params.id);
        if (i === -1) return res.status(404).json({ error: 'Book not found' });
        const err = validate(req.body, true);
        if (err) return res.status(400).json({ error: err }); books[i] = { ...books[i], ...req.body, id: books[i].id };
        res.json(books[i])
    } catch (e) { next(e) }
};
exports.remove = (req, res, next) => {
    try {
        const i = books.findIndex(x => x.id === req.params.id); if (i === -1) return res.status(404).json({ error: 'Book not found' });
        Fres.json(books.splice(i, 1)[0])
    } catch (e) { next(e) }
};
