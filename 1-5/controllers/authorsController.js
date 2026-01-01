const { authors, genId } = require('../data/store');

// Controller מינימלי ל־authors: ולידציה בסיסית, 400/404, next ל־500
const validate = (a, partial = false) => {
    if (!a || typeof a !== 'object') return 'Invalid body';
    if (!partial && !a.name) return 'Missing name';
    if (Object.keys(a).some(k => !['name', 'country'].includes(k))) return 'Unexpected field';
    return null;
};

exports.getAll = (req, res, next) => {
    try { res.json(authors) } catch (e) { next(e) }
};
exports.getById = (req, res, next) => {
    try {
        const r = authors.find(x => x.id === req.params.id);
        if (!r) return res.status(404).json({ error: 'Author not found' });
        res.json(r)
    } catch (e) { next(e) }
};
exports.create = (req, res, next) => {
    try {
        const err = validate(req.body, false);
        if (err) return res.status(400).json({ error: err });
        const id = genId(); const it = { id, name: req.body.name, country: req.body.country };
        authors.push(it); res.status(201).json(it)
    } catch (e) { next(e) }
};
exports.update = (req, res, next) => {
    try {
        const i = authors.findIndex(x => x.id === req.params.id);
        if (i === -1) return res.status(404).json({ error: 'Author not found' });
        const err = validate(req.body, true);
        if (err) return res.status(400).json({ error: err }); authors[i] = { ...authors[i], ...req.body, id: authors[i].id };
        res.json(authors[i])
    } catch (e) { next(e) }
};
exports.remove = (req, res, next) => {
    try {
        const i = authors.findIndex(x => x.id === req.params.id);
        if (i === -1) return res.status(404).json({ error: 'Author not found' });
        res.json(authors.splice(i, 1)[0])
    } catch (e) { next(e) }
};
// בקצרה — מה ש־catch (e) { next(e) } עושה ומה המשמעות שלה בקוד Express:

// מה קורה טכנית:

// בתוך ה־try יש קוד שעשוי לזרוק שגיאה (throw) או לזרוק חריגה סינכרונית.
// אם נזרקת שגיאה היא נתפסת ב־catch כ־e.
// הקריאה next(e) מעבירה את האובייקט e ל־middleware של Express שמתאים לטיפול בשגיאות — כלומר למידלוואר בעל הסיגנון (err, req, res, next).
// למה משתמשים בזה:

// כך מרוכז כל הטיפול בשגיאות במקום אחד (global error handler) — לא צריך בכל פונקציה לעשות res.status(500)....
// מאפשר לוג (או כל לוגיקה נוספת) במקום אחד, ואז להחליט מה להחזיר ללקוח (במקרה שלנו — לוג ל־console והחזרת 500 + "קרתה שגיאה").
// שומר על עקביות בתגובות לשגיאות ומונע חשיפת פרטי שגיאה שישאירו את המערכת פחות בטוחה.
// לגבי Promise / async:

// בקוד סינכרוני try/catch + next(e) מספיק.
// בפונקציות async צריך גם לתפוס שגיאות (או להשתמש ב־wrapper שמקבל async (req,res,next)=>{...} ומעביר אוטומטית rejected promise ל־next), אחרת Express לא תמיד יתפוס את החריגה.
// דוגמה קצרה (flow):

// בקונטרולר: throw new Error('DB failed') → נתפס ב־catch → next(e) → global error handler (err, req, res, next) → עושה console.log(err) ומחזיר res.status(500).json({error:'קרתה שגיאה'}).
// בקוד שלנו:

// אנחנו קוראים next(e) בתוך כל catch, וה־index.js כולל global error handler שמדפיס את השגיאה ל־console ומחזיר לקוח 500 + הודעה בעברית. לכן כל שגיאה פנימית תעבור דרך אותו מסלול מרכזי.
