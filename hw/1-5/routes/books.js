const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/booksController');
const security = require('../middlewares/security');

// Apply security middleware to this controller's routes only
router.use(security);

// Routes עבור ישות 'books'
// כל route מפנה לפונקציה מתאימה בקונטרולר.
// דוגמאות שימוש:
// - GET /books -> מחזיר את כל הספרים
// - POST /books -> יוצר ספר חדש (דרושים: title, authorId)
// - GET /books/:id -> מחזיר ספר ספציפי (404 אם לא קיים)
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
