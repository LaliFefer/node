const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authorsController');

// Routes עבור ישות 'authors'
// הסברים:
// - GET /authors -> מחזיר את כל הסופרים
// - POST /authors -> יוצר סופר חדש (נדרש: name)
// - GET /authors/:id -> מחזיר סופר ספציפי (404 אם לא קיים)
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
