const express = require('express');
const app = express();
app.use(express.json());

// לשירות קבצים סטטיים (index.html + styles.css)
// הוספת public כספריית סטטיק מאפשרת פתיחה מהדפדפן בכתובת http://localhost:3000/
app.use(express.static('public'));

const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');

app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);

// טיפול שגיאות גלובלי: רושם ל־console ומחזיר 500 והודעה ידידותית
// חשוב: ה־global error handler מגן על חשיפת פרטי שגיאה ללקוח.
app.use((err, req, res, next) => {
	console.log('Global error handler:', err);
	res.status(500).json({ error: 'קרתה שגיאה' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
	console.log('פתחו בדפדפן את: http://localhost:' + PORT + '/books');
});

// הוראות פתיחה בדפדפן:
// 1. לפתוח ממשק שורת הפקודה (PowerShell) בתיקיית הפרויקט
// 2. להריץ: node index.js
// 3. בדפדפן לבקר בכתובת: http://localhost:3000/books או http://localhost:3000/authors
// דוגמאות POST ניתן לשלוח עם Postman או curl:
// curl -X POST http://localhost:3000/books -H "Content-Type: application/json" -d "{\"title\":\"New\",\"authorId\":\"1\"}"

